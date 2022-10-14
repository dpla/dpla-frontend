import {Request, Response, Express} from "express";

const DPLA_PRO = "https://pro.dp.la";

export const proRedirects = (server: Express) => {

    server.get("/pro/wp/hubs", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA_PRO}/hubs`);
    });

    server.get("/pro", (req: Request, res: Response) => {
        res.redirect(301, DPLA_PRO);
    });

    server.get("/pro/wp/", (req: Request, res: Response) => {
        res.redirect(301, `${DPLA_PRO}`);
    });

};
