import { Router } from "express";
import { UsersController } from "../modules/users/users.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { checkOwner } from "../middleware/checkOwner.middleware";

const router = Router();
const usersController = new UsersController();

router.get("/:id", usersController.getUser);

router.put(
    "/:id",
    authMiddleware,
    checkOwner("user", "id"),
    usersController.updateUser
);

export default router;
