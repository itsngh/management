import { PrismaClient, User, Key, Class } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};
declare global {
	var prisma: PrismaClient;
}
global.prisma = globalThis.prisma ?? prismaClientSingleton();
export default global.prisma;
