const path = require("path");

const fs = require('fs').promises;
const axios = require('axios').default;

const API_URL = process.env.API_URL || 'https://api.dp.la/v2';
const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://dpla.wpengine.com';
const API_ENDPOINT_ALL_TOPICS = `${WORDPRESS_URL}/wp-json/dpla/v2/categories`;
const API_ENDPOINT_SUBTOPICS_FOR_TOPIC = `${WORDPRESS_URL}/wp-json/dpla/v2/subcategories`;


const loadExhibitionList = async () => {
    return await loadExhibitFile("exhibitions.json")
}

const loadExhibition = async (slug) => {
    return (slug === "exhibitions")
        ? null
        : await loadExhibitFile(`${slug}.json`);
}

const sortFun = (a, b) => a.order - b.order;

const exhibitHomePage = exhibition => {
    const sortedExhibitPages = exhibition.pages
        .filter(exhibition => !exhibition.parent)
        .sort(sortFun);
    return sortedExhibitPages.find(
        exhibit =>
            exhibit.slug === "home-page"
            || exhibit.slug === "homepage"
    ) || sortedExhibitPages[0];
}

const exhibitParentPages = exhibit => {
    const home = exhibitHomePage(exhibit);
    return exhibit.pages
        .filter(p => p.parent === null)
        .filter(p => p.slug !== home.slug)
        .sort(sortFun);
}

const loadExhibitFile = async (filename) => {
    const root = process.cwd();
    const filePath = path.join(root, "exhibitions-data", filename);;
    const exhibitionsText = await fs.readFile(filePath, "utf-8");
    return await JSON.parse(exhibitionsText);
}

const exhibitPageSubpages = (exhibit, page) => {
    return exhibit.pages.filter(p => {
        return p.parent !== null && p.parent.id === page.id
    }).sort((a, b) => a.order - b.order);
}

const extractSourceSetSlug = (url) => /\/primary-source-sets\/sets\/([-\w]*)/.exec(url)[1];

const loadData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

const loadTopics = async () => {
    let result = [];
    const topicsJson = await loadData(API_ENDPOINT_ALL_TOPICS);
    for (const topic of topicsJson) {
        const slug = topic['slug'];
        const url = `${API_ENDPOINT_SUBTOPICS_FOR_TOPIC}?parent=${topic['term_id']}`;
        const subtopics = await loadData(url);
        const subtopicSlugs = subtopics.map( (subtopic) => subtopic.slug );
        result.push( { slug: slug, subtopics: subtopicSlugs } );
    }
    return result;
}

const loadSets = async () => {
    const setsJson = await loadData(`${API_URL}/pss/sets?api_key=${process.env.API_KEY}`);
    return setsJson['itemListElement'].map( (set) => extractSourceSetSlug(set['@id']))
}

const loadExhibits = async () => {
    let result = [];
    const exhibitionList = await loadExhibitionList();
    for (const entry of exhibitionList['exhibitions']) {
        const exhibition = await loadExhibition(entry.slug)
        const parents = exhibitParentPages(exhibition);
        const pageSlugs = parents.map( (page) => page.slug);
        const subPagePaths = parents.flatMap(parent => {
            return exhibitPageSubpages(exhibition, parent).map(
                subpage => `${parent.slug}/${subpage.slug}`
            )
        });
        result.push({ slug: exhibition.slug, pages: pageSlugs.concat(subPagePaths)} );
    }
    return result;
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

    console.log("Loading topics.");
    const topics = await loadTopics();
    await writeFile('cypress/fixtures/topics.json', topics);
}

if (require.main === module) {

    process.on("uncaughtException", err => {
        console.error("Uncaught Exception: ", err.stack);
        process.exit(1);
    });

    console.log("Generating fixtures.");
    main().then( () => console.log("Finished.") );
}
