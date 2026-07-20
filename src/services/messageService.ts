import {
  getConversationMessages,
  createMessage,
  deleteConversationMessages,
} from "../repositories/messageRepository";

export async function getMessages(
  conversationId: string
) {
  return getConversationMessages(conversationId);
}

export async function addMessage(
  conversationId: string,
  role: string,
  content: string
) {
  return createMessage(
    conversationId,
    role,
    content
  );
}

export async function clearMessages(
  conversationId: string
) {
  return deleteConversationMessages(
    conversationId
  );
}