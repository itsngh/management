import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import log from "../../utils/logger";
import { createUser, retrieveUser } from "../../utils/db/user";

export const registerRoute = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
	const { username, name, secret } = req.body;
	if (await retrieveUser(username)) return res.sendStatus(400); // user already exists
	const user = await createUser(username, name, secret);
	if (!user) return res.sendStatus(500);
	return res.send(user);
});
