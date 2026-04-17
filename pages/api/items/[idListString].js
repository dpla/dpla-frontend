import { pipeline } from "stream/promises";
import { Readable } from "stream";
import {DPLA_ITEM_ID_REGEX} from "constants/items";


export default async function handler(req, res) {

    const { idListString } = req.query
    const idList = idListString ? idListString.split(",") : []
    const validIds = idList.filter(id => !!id && DPLA_ITEM_ID_REGEX.test(id));

    if (validIds.length === 0) {
        console.log("Zero valid ids");
        res.status(404).json({});
        return
    }

    try {
        const baseUrl = new URL(`${process.env.API_URL}/items/`);
        baseUrl.searchParams.set('api_key', process.env.API_KEY);
        baseUrl.pathname += validIds.join(",");
        const fetchRes = await fetch(baseUrl);
        if (fetchRes.ok) {
            const contentType = fetchRes.headers.get("Content-Type") || "application/json";
            res.setHeader("Content-Type", contentType);
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.status(200);
            await pipeline(Readable.fromWeb(fetchRes.body), res);

        } else {
            res.status(404).send("Not found.");
        }

    } catch (err) {
        console.log("Error proxying request to DPLA API.", err);
        res.status(404).json({});
    }
}