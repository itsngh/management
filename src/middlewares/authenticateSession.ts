import { Router, Request, Response, NextFunction } from "express";
import { retrieveSession } from "../utils/cache";

export const sessionRoute = Router();

sessionRoute.use(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		const header = req.headers.authorization;
		if (!header) return res.sendStatus(401);
		const token = header.split(" ")[1];
		if (!token) return res.sendStatus(401);
		const sessionObject = await retrieveSession(token);
		res.locals.sessionObject = sessionObject;
		next();
	}
);
