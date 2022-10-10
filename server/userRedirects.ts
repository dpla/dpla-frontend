import {Request, Response, Express} from "express";

const DPLA = "https://dp.la";

export const newsRedirects = (server: Express) => {

    server.get("/news", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/news`);
    });

    server.get("/news/:slug", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/news/${req.params.slug}`);
    });
};

export const topicBrowseRedirects = (server: Express) => {

    server.get("/browse-by-topic/:topic/:subtopic",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/browse-by-topic/${req.params.topic}/${req.params.subtopic}`);
        });

    server.get("/browse-by-topic/:topic", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/browse-by-topic/${req.params.topic}`);
    });

    server.get("/browse-by-topic", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/browse-by-topic`);
    });
};

export const pssRedirects = (server: Express) => {

    server.get("/primary-source-sets", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/primary-source-sets`);
    });

    server.get("/primary-source-sets/:set",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/primary-source-sets/${req.params.set}`);
        }
    );

    server.get("/primary-source-sets/:set/teaching-guide", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/primary-source-sets/${req.params.set}/teaching-guide`);
    });

    server.get("/primary-source-sets/:set/teaching-guide-print",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/primary-source-sets/${req.params.set}/teaching-guide-print`);
        }
    );

    server.get("/primary-source-sets/:set/additional-resources",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/primary-source-sets/${req.params.set}/additional-resources`);
        }
    );

    server.get("/primary-source-sets/:set/sources/:source",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/primary-source-sets/${req.params.set}/sources/${req.params.source}`);
        }
    );
};

export const exhibitionsRedirects = (server: Express) => {

    server.get(["/exhibitions", "/exhibitions"], (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/exhibitions`);
    });

    server.get("/exhibitions/:exhibition", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/exhibitions/${req.params.exhibition}`);
    });

    server.get("/exhibitions/:exhibition/:section/:subsection",
        (req: Request, res: Response) => {
            res.redirect(
                301,
                `${DPLA}/exhibitions/${req.params.exhibition}/${req.params.section}/${req.params.subsection}`
            );
        }
    );

    server.get("/exhibitions/:exhibition/:section",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/exhibitions/${req.params.exhibition}/${req.params.section}`);
        }
    );
};

export const guidesRedirects = (server: Express) => {

    server.get("/guides/:guide", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/guides/${req.params.guide}`);
    });

    server.get("/guides", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA}/guides/`);
    });
};

export const aboutRedirects = (server: Express) => {

    server.get(
        "/about/:section",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/about/${req.params.section}`);
        }
    );

    server.get(
        "/about/:section/:subsection",
        (req: Request, res: Response) => {
            res.redirect(301, `${DPLA}/about/${req.params.section}/${req.params.subsection}`);
        }
    );
};