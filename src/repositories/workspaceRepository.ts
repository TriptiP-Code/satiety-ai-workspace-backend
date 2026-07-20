import { supabase } from "../config/supabase";

export async function getUserWorkspaces(userId: string) {
  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}

export async function createWorkspace(
  userId: string,
  name: string
) {
  const { data, error } = await supabase
    .from("workspaces")
    .insert({
      user_id: userId,
      name,
      is_system: false,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function renameWorkspace(
  id: string,
  name: string
) {
  const { data, error } = await supabase
    .from("workspaces")
    .update({
      name,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteWorkspace(id: string) {
  const { error } = await supabase
    .from("workspaces")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}