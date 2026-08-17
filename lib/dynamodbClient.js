// Minimal, dependency-free DynamoDB client: signs requests with AWS SigV4 using Node's
// built-in crypto and calls the DynamoDB JSON API with global fetch. Avoids pulling in
// the AWS SDK. Credentials come from the ECS task role (container credentials endpoint),
// or from static env vars in local dev. See docs/transcribe/transcription-storage.md.

import crypto from "node:crypto";

// Region is fixed to us-east-1 for v1 (the transcribe-transcripts table lives there).
// HOST/ENDPOINT are written as literals — not built from a template — so the check-csp
// scanner can resolve the endpoint and verify it against the connect-src directive in
// next.config.js (where dynamodb.us-east-1.amazonaws.com is listed).
const REGION = "us-east-1";
const SERVICE = "dynamodb";
const HOST = "dynamodb.us-east-1.amazonaws.com";
const ENDPOINT = "https://dynamodb.us-east-1.amazonaws.com/";
const API_VERSION = "DynamoDB_20120810";
const FETCH_TIMEOUT_MS = 5000;

function hmac(key, data) {
  return crypto.createHmac("sha256", key).update(data, "utf8").digest();
}

function sha256hex(data) {
  return crypto.createHash("sha256").update(data, "utf8").digest("hex");
}

// The AWS SigV4 signing-key derivation (exported for unit testing against AWS's
// published test vector).
export function deriveSigningKey(secretKey, dateStamp, region, service) {
  const kDate = hmac(`AWS4${secretKey}`, dateStamp);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  return hmac(kService, "aws4_request");
}

async function fetchWithTimeout(input, init) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

let cachedCreds = null; // { accessKeyId, secretAccessKey, sessionToken, expiresAt }

async function getCredentials() {
  const now = Date.now();
  if (cachedCreds && cachedCreds.expiresAt - 60_000 > now) return cachedCreds;

  // Static env credentials (e.g. local dev) win if present.
  if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    cachedCreds = {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      sessionToken: process.env.AWS_SESSION_TOKEN,
      expiresAt: now + 3_600_000,
    };
    return cachedCreds;
  }

  // ECS task role via the container credentials endpoint (Fargate sets the relative URI).
  const relative = process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI;
  const full = process.env.AWS_CONTAINER_CREDENTIALS_FULL_URI;
  const url = relative ? `http://169.254.170.2${relative}` : full;
  if (!url) throw new Error("No AWS credentials source available");
  const authToken = process.env.AWS_CONTAINER_AUTHORIZATION_TOKEN;
  const res = await fetchWithTimeout(
    url,
    authToken ? { headers: { Authorization: authToken } } : undefined,
  );
  if (!res.ok) {
    res.body?.cancel?.().catch(() => {});
    throw new Error(`Container credentials fetch failed: ${res.status}`);
  }
  const c = await res.json();
  // Validate before caching — a malformed response must not poison the cache.
  if (!c || !c.AccessKeyId || !c.SecretAccessKey) {
    throw new Error("Container credentials response missing AccessKeyId/SecretAccessKey");
  }
  cachedCreds = {
    accessKeyId: c.AccessKeyId,
    secretAccessKey: c.SecretAccessKey,
    sessionToken: c.Token,
    expiresAt: c.Expiration ? Date.parse(c.Expiration) : now + 300_000,
  };
  return cachedCreds;
}

// POST a signed DynamoDB request (e.g. operation "Query", "PutItem") and return the
// parsed JSON response. Throws on a non-2xx response.
export async function dynamoRequest(operation, payload) {
  const creds = await getCredentials();
  const body = JSON.stringify(payload);
  const target = `${API_VERSION}.${operation}`;

  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, ""); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8);

  const headerMap = {
    "content-type": "application/x-amz-json-1.0",
    host: HOST,
    "x-amz-date": amzDate,
    "x-amz-target": target,
  };
  if (creds.sessionToken) headerMap["x-amz-security-token"] = creds.sessionToken;

  const names = Object.keys(headerMap).sort();
  const canonicalHeaders = names.map((n) => `${n}:${headerMap[n]}\n`).join("");
  const signedHeaders = names.join(";");

  const canonicalRequest = [
    "POST",
    "/",
    "",
    canonicalHeaders,
    signedHeaders,
    sha256hex(body),
  ].join("\n");

  const scope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    scope,
    sha256hex(canonicalRequest),
  ].join("\n");

  const signature = crypto
    .createHmac("sha256", deriveSigningKey(creds.secretAccessKey, dateStamp, REGION, SERVICE))
    .update(stringToSign, "utf8")
    .digest("hex");

  const headers = {
    "Content-Type": "application/x-amz-json-1.0",
    "X-Amz-Date": amzDate,
    "X-Amz-Target": target,
    Authorization:
      `AWS4-HMAC-SHA256 Credential=${creds.accessKeyId}/${scope}, ` +
      `SignedHeaders=${signedHeaders}, Signature=${signature}`,
  };
  if (creds.sessionToken) headers["X-Amz-Security-Token"] = creds.sessionToken;

  const res = await fetchWithTimeout(ENDPOINT, { method: "POST", headers, body });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`DynamoDB ${operation} failed: ${res.status} ${text.slice(0, 300)}`);
  }
  return text ? JSON.parse(text) : {};
}
