import { Router, Request, Response, NextFunction } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { retrieveClass, retrieveClassFromUser } from "../../utils/db/class";

export const getClassRoute = Router();

getClassRoute
	.get(
		"/@me",
		sessionRoute,
		(req: Request, res: Response, next: NextFunction) => {
			const { user_uuid } = res.locals.sessionObject;
			const classroom = retrieveClassFromUser(user_uuid);
			if (!classroom) return res.sendStatus(404);
			return classroom;
		}
	)
	.get("/:uuid", async (req, res, next) => {
		const class_uuid = req.params.uuid;
		const classroom = await retrieveClass(class_uuid);
		if (!classroom) return res.sendStatus(404);
		return res.send(classroom);
	});
