import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import { verify } from "argon2";
import { retrieveKey, retrieveUser } from "../../utils/db/user";
export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (validateID(username) != "username" || !password)
		return res.sendStatus(400);
	const key = await retrieveKey(username);
	if (!key) return res.sendStatus(404);
	if (!(await verify(key.secret, password))) return res.sendStatus(401);
	return res.sendStatus(200);
});
