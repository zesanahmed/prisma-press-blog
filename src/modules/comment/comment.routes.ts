import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";
import { commentController } from "./comment.controller";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN, Role.AUTHOR, Role.USER),
  commentController.createComment,
);

router.get("/author/:authorId", commentController.getCommentByAuthorId);
router.get("/:commentId", commentController.getCommentByCommentId);

router.patch("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);
router.patch("/:commentId/moderate", commentController.moderateComment);

export const commentRoutes = router;
