import { Router } from "express";

import {
  getAllMessages,
  createNewMessage,
  deleteMessages,
} from "../controllers/messageController";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate);

router.get(
  "/:conversationId",
  getAllMessages
);

router.post(
  "/",
  createNewMessage
);

router.delete(
  "/:conversationId",
  deleteMessages
);

export default router;