import { Router, Request, Response, NextFunction } from "express";

export const sessionRoute = Router();

sessionRoute.use(
	"/",
	async (req: Request, res: Response, next: NextFunction) => {
		const header = req.headers.authorization;
		if (!header) return res.sendStatus(401);
		const token = header.split(" ")[1];
		if (!token) return res.sendStatus(401);
		res.locals.token = token;
		next();
	}
);
