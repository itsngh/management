import { Request, Response, NextFunction, Router } from "express";

const addClassMember = Router();

addClassMember.post(
	"/:uuid",
	async (req: Request, res: Response, next: NextFunction) => {
		const uuid = req.params.uuid;
		const { members } = req.body;
		for (const member in members) {
            const addedMember = await 
		}
	}
);
