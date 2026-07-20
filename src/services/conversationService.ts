import {
  getWorkspaceConversations,
  createConversation,
  renameConversation,
  deleteConversation,
} from "../repositories/conversationRepository";

export async function getConversations(
  workspaceId: string
) {
  return getWorkspaceConversations(
    workspaceId
  );
}

export async function addConversation(
  workspaceId: string,
  title: string
) {
  return createConversation(
    workspaceId,
    title
  );
}

export async function updateConversation(
  id: string,
  title: string
) {
  return renameConversation(id, title);
}

export async function removeConversation(
  id: string
) {
  return deleteConversation(id);
}