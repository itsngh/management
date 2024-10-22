import { Router, Request, Response, NextFunction } from "express";

const updateClass = Router();

updateClass.put(
	"/:uuid",
	async (req: Request, res: Response, next: NextFunction) => {
		const class_uuid = req.params.uuid;
		const { className, classDescription } = req.body;
		return res.send(class_uuid);
	}
);
