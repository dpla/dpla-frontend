import {Request, Response, Express} from "express";

const DPLA = "https://dp.la";

export const localRedirects = (server: Express) => {

    server.get("/local", (req: Request, res: Response) => {
        res.redirect(301, DPLA);
    });

    server.get("/local/markdown", (req: Request, res: Response) => {
        res.redirect(301, DPLA);
    });

};
