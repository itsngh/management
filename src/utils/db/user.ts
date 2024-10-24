import { User, Key, Class } from "@prisma/client";
import { validateID } from "../sanitiser";
import { hash } from "argon2";

export async function createUser(
	username: string,
	name: string,
	password: string
): Promise<User | null> {
	const user = await prisma.user.create({
		data: {
			username: username,
			name: name,
			Key: {
				create: {
					secret: await hash(password),
				},
			},
		},
	});
	return user ? user : null;
}

export async function retrieveUser(term: string): Promise<User | null> {
	let user = null;
	switch (validateID(term)) {
		case "username":
			user = prisma.user.findUnique({ where: { username: term } });
			break;
		case "uuid":
			user = prisma.user.findUnique({ where: { uuid: term } });
			break;
	}
	return user;
}

export async function retrieveKey(term: string): Promise<Key | null> {
	let key = null;
	switch (validateID(term)) {
		case "username":
			key = await prisma.user.findUnique({
				where: { username: term },
				select: { Key: true },
			});
			break;
		case "uuid":
			key = await prisma.user.findUnique({
				where: { uuid: term },
				select: { Key: true },
			});
			break;
	}
	if (!key) return null;
	return key.Key;
}

export async function updateUser(
	term: string,
	data: {
		name?: string;
	}
): Promise<any> {
	const user = await retrieveUser(term);
	if (!user) return false;
	let updatedUser = null;
	switch (validateID(term)) {
		case "username":
			updatedUser = prisma.user.update({
				where: { username: term },
				data: {
					name: user.name || user.name,
				},
			});
			break;
		case "uuid":
			updatedUser = prisma.user.update({
				where: { uuid: term },
				data: {
					name: user.name || user.name,
				},
			});
			break;
	}
	return updatedUser;
}
