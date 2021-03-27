const fs = require('fs').promises;
const fetch = require('node-fetch');
const config = require('../cypress.json');

const PSS_BASE_URL = 'https://dp.la/pssapi';

const extractSourceSetSlug = (url) => /\/primary-source-sets\/sets\/([-\w]*)/.exec(url)[1];

const loadJson = async (url) => {
    const response = await fetch(url);
    return await response.json();
}

const loadTopics = async () => {

}

const loadSets = async () => {
    const setsJson = await loadJson(`${PSS_BASE_URL}/sets.json`)

    for (const set of setsJson['itemListElement']) {
        const slug = extractSourceSetSlug(set['@id']);
        set.set_data =
            await loadJson(`${PSS_BASE_URL}/sets/${slug}.json`);
    }
}

const loadExhibits = async () => {
    const baseUrl = config.baseUrl;
    const exhibitsJson = await loadJson(`${baseUrl}/api/exhibitions`);

    for (const exhibit of exhibitsJson) {
        exhibit.page_data =
            await loadJson(`${baseUrl}/api/exhibition_pages?exhibit=${exhibit.id}`)
    }

    return exhibitsJson;
}

const writeFile = async (path, data) =>
    await fs.writeFile(path, JSON.stringify(data), {})

const main = async () => {
    console.log("Loading sets.");
    const sets = await loadSets();
    await writeFile('cypress/fixtures/sets.json', sets);

    console.log("Loading exhibitions.");
    const exhibits = await loadExhibits();
    await writeFile('cypress/fixtures/exhibitions.json', exhibits);
}

if (require.main === module) {

    process.on("uncaughtException", err => {
        console.error("Uncaught Exception: ", err.stack);
        process.exit(1);
    });

    console.log("Generating fixtures.");
    main().then( () => console.log("Finished.") );
}
