import {promises as fs} from "fs";
import path from 'path';
export const loadExhibitions = async () => {
    return await loadExhibitFile("exhibitions.json")
}

// this function assumes the exhibit exists. proceed with caution!
export const loadExhibition = async (slug) => {
    return (slug === "exhibitions")
        ? null
        : await loadExhibitFile(`${slug}.json`);
}

const loadExhibitFile = async (filename) => {
    const root = process.cwd();
    const filePath = path.join(root, "exhibitions-data", filename);
    const exhibitionsText = await fs.readFile(filePath, "utf-8");
    return await JSON.parse(exhibitionsText);
}
