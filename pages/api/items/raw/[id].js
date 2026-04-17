import xmlFormat from "xml-formatter";
import { DPLA_ITEM_ID_REGEX } from "constants/items";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id || !DPLA_ITEM_ID_REGEX.test(id)) {
    res.status(404).json({});
    return;
  }

  try {
    const url = new URL(`${process.env.API_URL}/items/${id}`);
    url.searchParams.set("api_key", process.env.API_KEY);
    const fetchRes = await fetch(url);

    if (!fetchRes.ok) {
      res.status(404).send("Not found.");
      return;
    }

    const data = await fetchRes.json();
    const stringValue = data?.docs?.[0]?.originalRecord?.stringValue;

    if (!stringValue) {
      res.status(404).send("Not found.");
      return;
    }

    const trimmed = stringValue.trim();

    if (trimmed.startsWith("<")) {
      const formatted = xmlFormat(trimmed, {
        indentation: "  ",
        collapseContent: true,
        lineSeparator: "\n",
      });
      res.setHeader("Content-Type", "text/xml; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.status(200).send(formatted);
    } else {
      const formatted = JSON.stringify(JSON.parse(trimmed), null, 2);
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.status(200).send(formatted);
    }
  } catch (err) {
    console.log("Error fetching raw item record.", err);
    res.status(404).json({});
  }
}
