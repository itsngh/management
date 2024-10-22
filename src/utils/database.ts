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
	return classroom;
}

export async function retrieveClassFromUser(
	term: string
): Promise<Class | null> {
	const classroom = await prisma.user.findUnique({
		where: {
			uuid: term,
		},
		select: {
			Class: true,
		},
	});
	if (!classroom) return null;
	return classroom.Class;
}

export async function addClassMember(
	members: Array<{ member_uuid: string }>,
	class_uuid: string
) {
	const classroom = await retrieveClass(class_uuid);
	if (!classroom) return null;
	for (let i = 0; i < members.length; i++) {
		await prisma.user.update({
			where: {
				uuid: members[i].member_uuid,
			},
			data: {
				class_id: class_uuid,
			},
		});
	}
// 	await prisma.class.update({
// 		where: {
// 			uuid: class_uuid,
// 		},
// 		data: {},
// 	});
// }
export async function updateClass(
	className: string,
	classDescription: string,
	class_uuid: string
) {
	const classroom = await retrieveClass(class_uuid);
	if (!classroom) return null;
	const updatedClassroom = await prisma.class.update({
		where: {
			uuid: class_uuid,
		},
		data: {
			className: className || classroom.className,
			classDescription: classDescription || classroom.classDescription,
		},
	});
	if (!updatedClassroom) return null;
	return updatedClassroom;
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
