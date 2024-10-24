import { Class } from "@prisma/client";
import { validateID } from "../sanitiser";

export async function retrieveClass(term: string): Promise<Class | null> {
	let classroom = null;
	switch (validateID(term)) {
		case "username":
			classroom = await prisma.user.findUnique({
				where: {
					username: term,
				},
				select: {
					Class: true,
				},
			});
			break;
		case "uuid":
			classroom = await prisma.user.findUnique({
				where: {
					uuid: term,
				},
				select: {
					Class: true,
				},
			});
			break;
	}
	return classroom ? classroom.Class : null;
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
	return classroom ? classroom.Class : null;
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
}

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
