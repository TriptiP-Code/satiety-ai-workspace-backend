import { supabase } from "../config/supabase";

export async function getConversationMessages(
  conversationId: string
) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function createMessage(
  conversationId: string,
  role: string,
  content: string
) {
  const { data, error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conversationId,
      role,
      content,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteConversationMessages(
  conversationId: string
) {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("conversation_id", conversationId);

  if (error) throw error;
}