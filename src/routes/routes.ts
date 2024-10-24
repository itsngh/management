import { Router } from "express";
const routes = Router();
export default routes;

/**
 * USER ROUTES
 */
import { getUserRoute } from "./user/getUser";
import { updateUserRoute } from "./user/updateUser";

/**
 * AUTH ROUTES
 */
import { loginRoute } from "./auth/login";
import { logoutRoute } from "./auth/logout";
import { registerRoute } from "./auth/register";

/**
 * CLASS ROUTES
 */
import { addClassMemberRoute } from "./class/addMember";
import { getClassRoute } from "./class/getClass";
import { updateClassRoute } from "./class/updateClass";
