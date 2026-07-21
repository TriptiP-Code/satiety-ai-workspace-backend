import { supabaseAdmin } from "../config/supabase";

export async function getWorkspaceConversations(
  workspaceId: string
) {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("*")
    .eq("workspace_id", workspaceId)
    .order("updated_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function createConversation(
  workspaceId: string,
  title: string
) {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .insert({
      workspace_id: workspaceId,
      title,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function renameConversation(
  id: string,
  title: string
) {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .update({
      title,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteConversation(id: string) {
  const { error } = await supabaseAdmin
    .from("conversations")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}