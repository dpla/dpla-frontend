import axios from "axios";

const fileSizes = {
    original: true,
    fullsize: true,
    thumbnail: true,
    square_thumbnails: true
}

export default async function handler(req, res) {

    const {type, filename} = req.query

    if (!(type in fileSizes)) {
        res
            .type("text/plain")
            .status(404)
            .send("Not found.");
        return;

    }

    try {
        const url = `${process.env.OMEKA_URL}/files/${type}/${filename}`;
        const axiosRes = await axios.get(
            url,
            {responseType: 'stream'}
        )

        const contentType = axiosRes.headers["content-type"];

        if (
            axiosRes.status === 200 &&
            (
                contentType.startsWith("image") ||
                contentType.startsWith("application") ||
                contentType.startsWith("video") ||
                contentType.startsWith("audio")
            )
        ) {
            res
                .type(contentType)
                .status(200);
            await axiosRes.data.pipe(res);

        } else {
            res
                .type("text/plain")
                .status(404)
                .end("Not found.");
        }

    } catch (err) {
        console.log("Error proxying request to Omeka.", err);
        res
            .type("text/plain")
            .status(404)
            .end("Not found.");
    }
}