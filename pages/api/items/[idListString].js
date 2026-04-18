import { pipeline } from "stream/promises";
import { Readable } from "stream";
import {DPLA_ITEM_ID_REGEX} from "constants/items";

function getErrorMessage(err) {
    if (err instanceof Error) return err.message;
    if (typeof err === "string") return err;
    return "Unknown error";
}

export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { idListString, single } = req.query;
    if (typeof idListString !== "string") {
        res.status(404).json({ error: "Not found." });
        return;
    }
    const isSingle = single === "1";
    const validIds = idListString.split(",").filter(id => !!id && DPLA_ITEM_ID_REGEX.test(id));

    if (validIds.length === 0) {
        res.status(404).json({ error: "Not found." });
        return;
    }

    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;
    if (!apiUrl || !apiKey) {
        console.error("API configuration missing: API_URL or API_KEY not set");
        res.status(500).json({ error: "Server configuration error." });
        return;
    }

    try {
        const baseUrl = new URL(apiUrl);
        baseUrl.pathname = `/items/${validIds.join(",")}`;
        baseUrl.searchParams.set("api_key", apiKey);
        const fetchRes = await fetch(baseUrl);
        if (fetchRes.ok) {
            if (isSingle) {
                const data = await fetchRes.json();
                const doc = data?.docs?.[0];
                if (!doc) {
                    res.status(404).json({ error: "Not found." });
                    return;
                }
                res.setHeader("Content-Type", "application/json; charset=utf-8");
                res.setHeader("Cache-Control", "public, max-age=86400");
                res.status(200).send(JSON.stringify(doc, null, 2));
            } else {
                const contentType = fetchRes.headers.get("Content-Type") || "application/json; charset=utf-8";
                res.setHeader("Cache-Control", "public, max-age=86400");
                res.setHeader("Content-Type", contentType);
                res.status(200);
                try {
                    await pipeline(Readable.fromWeb(fetchRes.body), res);
                } catch (err) {
                    console.error("Error streaming upstream response.", { message: getErrorMessage(err) });
                    if (!res.headersSent) {
                        res.removeHeader("Cache-Control");
                        res.status(502).json({ error: "Upstream service error." });
                    }
                }
            }
        } else {
            fetchRes.body?.cancel?.().catch(() => {});
            if (fetchRes.status === 404) {
                res.status(404).json({ error: "Not found." });
            } else {
                res.status(fetchRes.status).json({ error: "Upstream service error." });
            }
        }

    } catch (err) {
        console.error("Error proxying request to DPLA API.", { message: getErrorMessage(err) });
        if (!res.headersSent) {
            res.status(502).json({ error: "Upstream service error." });
        }
    }
}