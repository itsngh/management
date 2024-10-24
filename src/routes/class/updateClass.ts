import { Router, Request, Response, NextFunction } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";

export const updateClassRoute = Router();

updateClassRoute.put(
	"/:uuid",
	sessionRoute,
	async (req: Request, res: Response, next: NextFunction) => {
		const class_uuid = req.params.uuid;
		const { className, classDescription } = req.body;
		return res.send(class_uuid);
	}
);
