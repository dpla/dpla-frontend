import xmlFormat from "xml-formatter";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.status(405).send("Method not allowed.");
    return;
  }

  const { id } = req.query;

  if (typeof id !== "string" || !DPLA_ITEM_ID_REGEX.test(id)) {
    res.status(404).send("Not found.");
    return;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const url = new URL(`${process.env.API_URL}/items/${id}`);
    url.searchParams.set("api_key", process.env.API_KEY);
    const fetchRes = await fetch(url, { signal: controller.signal });

    if (!fetchRes.ok) {
      fetchRes.body?.cancel?.().catch(() => {});
      if (fetchRes.status === 404) {
        res.status(404).send("Not found.");
      } else {
        res.status(fetchRes.status).send("Upstream error.");
      }
      return;
    }

    const data = await fetchRes.json();
    const stringValue = data?.docs?.[0]?.originalRecord?.stringValue;

    if (!stringValue) {
      res.status(404).send("Not found.");
      return;
    }

    const trimmed = stringValue.trim();

    if (!trimmed) {
      res.status(404).send("Not found.");
      return;
    }

    let contentType, formatted;
    if (trimmed.startsWith("<")) {
      contentType = "text/xml; charset=utf-8";
      formatted = xmlFormat(trimmed, {
        indentation: "  ",
        collapseContent: true,
        lineSeparator: "\n",
      });
    } else {
      contentType = "application/json; charset=utf-8";
      formatted = JSON.stringify(JSON.parse(trimmed), null, 2);
    }
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.status(200).send(formatted);
  } catch (err) {
    if (err?.name === "AbortError") {
      res.status(504).send("Upstream timeout.");
      return;
    }
    console.error("Error fetching raw item record.", { id, name: err?.name, message: err?.message });
    res.status(502).send("Upstream error.");
  } finally {
    clearTimeout(timeout);
  }
}
