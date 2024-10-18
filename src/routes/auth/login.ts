import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import argon2 from "argon2";
import redis, { createSession } from "../../utils/cache";
import { retrieveKey, retrieveUser } from "../../utils/database";
import { hash } from "crypto";
export const loginRoute = Router();

loginRoute.post("/", async (req: Request, res: Response) => {
	const { username, password } = req.body;
	if (
		username.length < 3 ||
		password.length < 8 ||
		validateID(username) != "username"
	)
		return res.sendStatus(400);
	const user = retrieveUser(username);
	if (!user) return res.sendStatus(404);
	const key = await retrieveKey(username);
	if (!key) return res.sendStatus(500);
	if (await argon2.verify(key.secret, password)) return res.send();
});
