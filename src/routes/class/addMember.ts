import { Request, Response, NextFunction, Router } from "express";

export const addClassMemberRoute = Router();

addClassMemberRoute.post(
	"/:uuid",
	async (req: Request, res: Response, next: NextFunction) => {
		const uuid = req.params.uuid;
		const { members } = req.body;
		for (const member in members) {
		}
	}
);
