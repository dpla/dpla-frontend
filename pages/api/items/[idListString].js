import axios from "axios";

const dplaIdRegex = /^[0-9a-f]{32}$/;

export default async function handler(req, res) {

    const { idListString } = req.query
    const idList = idListString ? idListString.split(",") : []
    const validIds = idList.filter(id => !!id && dplaIdRegex.test(id));

    if (validIds.length === 0) {
        console.log("Zero valid ids");
        res
            .type("text/plain")
            .status(404)
            .end("Not found.");
        return
    }

    try {
        const url =
            `${process.env.API_URL}/items/` +
            `${validIds.join(",")}` +
            `?api_key=${process.env.API_KEY}`;

        const axiosRes = await axios.get(url, {responseType: 'stream'});

        if (axiosRes.status === 200) {
            res
                .type(axiosRes.headers['content-type'])
                .status(200);
            await axiosRes.data.pipe(res);

        } else {
            res
                .type("text/plain")
                .status(404)
                .end("Not found.");
        }

    } catch (err) {
        console.log("Error proxying request to DPLA API.", err);
        res
            .type("text/plain")
            .status(404)
            .end("Not found.");
    }
}