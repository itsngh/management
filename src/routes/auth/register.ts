import { Router, Request, Response } from "express";
import { validateID } from "../../utils/sanitiser";
import { retrieveUser } from "../../utils/database";
import argon2 from "argon2";
import { createSession } from "../../utils/cache";
import log from "../../utils/logger";

export const registerRoute = Router();

registerRoute.post("/", async (req: Request, res: Response) => {
	const { username, secret } = req.body;
});
