import { Router, Request, Response, NextFunction } from "express";
import { sessionRoute } from "../../middlewares/authenticateSession";
import { validateID } from "../../utils/sanitiser";
import { retrieveUser } from "../../utils/db/user";

export const getUserRoute = Router();

getUserRoute
	.get(
		"/@me",
		sessionRoute,
		async (req: Request, res: Response, next: NextFunction) => {
			const { user_uuid } = res.locals.sessionObject;
			const user = await retrieveUser(user_uuid);
			if (!user) return res.sendStatus(500);
			return res.send(user);
		}
	)
	.get("/:term", async (req: Request, res: Response, next: NextFunction) => {
		const term = req.params.term;
		const user = retrieveUser(term);
		if (!user) return res.sendStatus(404);
		return res.send(user);
	});
