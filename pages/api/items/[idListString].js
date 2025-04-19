import {Readable} from "stream";

const dplaIdRegex = /^[0-9a-f]{32}$/;

export default async function handler(req, res) {

    const { idListString } = req.query
    const idList = idListString ? idListString.split(",") : []
    const validIds = idList.filter(id => !!id && dplaIdRegex.test(id));

    if (validIds.length === 0) {
        console.log("Zero valid ids");
        res
            .type("application/json")
            .status(404)
            .body("{}")
            .end();
        return
    }

    try {
        const baseUrl = new URL(`${process.env.API_URL}/items/`);
        baseUrl.searchParams.set('api_key', process.env.API_KEY);
        baseUrl.pathname += validIds.join(",");
        const fetchRes = await fetch(baseUrl);
        if (fetchRes.ok) {
            const contentType = fetchRes.headers.get("Content-Type") || "application/json";
            res
                .type(contentType)
                .status(200);
            await Readable.fromWeb(fetchRes.body).pipe(res);

        } else {
            res
                .type("text/plain")
                .status(404)
                .end("Not found.");
        }

    } catch (err) {
        console.log("Error proxying request to DPLA API.", err);
        res
            .type("application/json")
            .status(404)
            .body("{}")
            .end();
    }
}