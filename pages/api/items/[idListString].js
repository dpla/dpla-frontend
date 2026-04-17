import { pipeline } from "stream/promises";
import { Readable } from "stream";
import {DPLA_ITEM_ID_REGEX} from "constants/items";


export default async function handler(req, res) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    const { idListString, single } = req.query
    const idList = idListString ? idListString.split(",") : []
    const validIds = idList.filter(id => !!id && DPLA_ITEM_ID_REGEX.test(id));

    if (validIds.length === 0) {
        console.log("Zero valid ids");
        res.status(404).json({ error: "Not found." });
        return
    }

    try {
        const baseUrl = new URL(`${process.env.API_URL}/items/`);
        baseUrl.searchParams.set('api_key', process.env.API_KEY);
        baseUrl.pathname += validIds.join(",");
        const fetchRes = await fetch(baseUrl);
        if (fetchRes.ok) {
            if (single === "1") {
                const data = await fetchRes.json();
                const doc = data?.docs?.[0];
                if (!doc) {
                    res.status(404).json({ error: "Not found." });
                    return;
                }
                res.setHeader("Cache-Control", "public, max-age=86400");
                res.status(200).json(doc);
            } else {
                const contentType = fetchRes.headers.get("Content-Type") || "application/json; charset=utf-8";
                res.setHeader("Cache-Control", "public, max-age=86400");
                res.setHeader("Content-Type", contentType);
                res.status(200);
                await pipeline(Readable.fromWeb(fetchRes.body), res);
            }
        } else {
            fetchRes.body?.cancel?.().catch(() => {});
            res.status(404).json({ error: "Not found." });
        }

    } catch (err) {
        console.log("Error proxying request to DPLA API.", err);
        res.status(502).json({ error: "Upstream service error." });
    }
}