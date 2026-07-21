import { Request, Response } from "express";

import {
  getMessages,
  addMessage,
  clearMessages,
} from "../services/messageService";

export async function getAllMessages(
  req: Request,
  res: Response
) {
  try {
    const conversationId = Array.isArray(req.params.conversationId)
      ? req.params.conversationId[0]
      : req.params.conversationId;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        error: "Conversation id required",
      });
    }

    const messages = await getMessages(conversationId);

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to fetch messages",
    });
  }
}

export async function createNewMessage(
  req: Request,
  res: Response
) {
  try {
    const {
      conversationId,
      role,
      content,
    } = req.body;

    const message = await addMessage(
      conversationId,
      role,
      content
    );

    res.json(message);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to create message",
    });
  }
}

export async function deleteMessages(
  req: Request,
  res: Response
) {
  try {
    const conversationId = Array.isArray(req.params.conversationId)
      ? req.params.conversationId[0]
      : req.params.conversationId;

    if (!conversationId) {
      return res.status(400).json({
        success: false,
        error: "Conversation id required",
      });
    }

    await clearMessages(conversationId);

    res.json({
      success: true,
      message: "Messages deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to delete messages",
    });
  }
}