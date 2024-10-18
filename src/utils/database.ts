import { PrismaClient, User, Key, Class } from "@prisma/client";
// import environmentVariables from "./environment";
import { validateID } from "./sanitiser";
import { isNullishCoalesce } from "typescript";
import log from "./logger";

const prismaClientSingleton = () => {
	return new PrismaClient();
};
declare global {
	var prisma: PrismaClient;
}
global.prisma = globalThis.prisma ?? prismaClientSingleton();
export default global.prisma;

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
			key = prisma.user.findUnique({
				where: { username: term },
				select: { Key: true },
			});
			break;
		case "uuid":
			key = prisma.user.findUnique({
				where: { uuid: term },
				select: { Key: true },
			});
			break;
	}
	return key;
}
export async function retrieveClass(term: string): Promise<any> {
	let classroom = null;
	switch (validateID(term)) {
		case "username":
			classroom = await prisma.user.findUnique({
				where: {
					username: term,
				},
				select: {
					Group: true,
				},
			});
			break;
		case "uuid":
			classroom = await prisma.user.findUnique({
				where: {
					uuid: term,
				},
				select: {
					Group: true,
				},
			});
			break;
	}
	log(`${typeof classroom}, ${classroom}`, 5);
	return classroom;
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
					name: data.name || user.name,
				},
			});
			break;
		case "uuid":
			updatedUser = prisma.user.update({
				where: { uuid: term },
				data: {
					name: data.name || user.name,
				},
			});
			break;
	}
	return updatedUser;
}
