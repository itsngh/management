import { Router, Request, Response, NextFunction } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { retrieveUser } from "../../utils/database";

export const getClass = Router();

getClass.get(
	"/@me",
	sessionRoute,
	(req: Request, res: Response, next: NextFunction) => {
		const { user_uuid } = res.locals.sessionObject;
	}
);
