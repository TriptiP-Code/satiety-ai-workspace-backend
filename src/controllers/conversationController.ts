import { Request, Response } from "express";

import {
  getConversations,
  addConversation,
  updateConversation,
  removeConversation,
} from "../services/conversationService";

export async function getAllConversations(
  req: Request,
  res: Response
) {
  try {
    const workspaceId = String(
      req.query.workspaceId
    );

    const conversations =
      await getConversations(workspaceId);

    res.json(conversations);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to fetch conversations",
    });
  }
}

export async function createNewConversation(
  req: Request,
  res: Response
) {
  try {
    const { workspaceId, title } =
      req.body;

    const conversation =
      await addConversation(
        workspaceId,
        title
      );

    res.json(conversation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Unable to create conversation",
    });
  }
}

export async function editConversation(
  req: Request,
  res: Response
) {
  try {
    const id = String(req.params.id);

    const { title } = req.body;

    const conversation =
      await updateConversation(
        id,
        title
      );

    res.json(conversation);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        "Unable to rename conversation",
    });
  }
}

export async function removeConversationById(
  req: Request,
  res: Response
) {
  try {
    const id = String(req.params.id);

    await removeConversation(id);

    res.json({
      success: true,
      message:
        "Conversation deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error:
        "Unable to delete conversation",
    });
  }
}