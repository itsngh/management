import { Router, Request, Response, NextFunction } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { retrieveUser } from "../../utils/db/user";

export const updateUserRoute = Router();

updateUserRoute.put(
	"/@me",
	sessionRoute,
	(req: Request, res: Response, next: NextFunction) => {
		const { name } = req.body;
		const { user_uuid } = res.locals.sessionObject;
		const user = retrieveUser(user_uuid);
	}
);
