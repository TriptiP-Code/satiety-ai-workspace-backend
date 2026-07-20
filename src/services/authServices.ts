import { supabase } from "../config/supabase";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  // Create user in Supabase Auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      name,
    },
  });

  if (error) {
    throw error;
  }

  const user = data.user;

  // Create profile
  const { error: profileError } = await supabase
  .from("user_profiles")
  .insert({
    id: user.id,
    name,
    email,
  });

  if (profileError) {
    throw profileError;
  }

  // Create default workspace
  const { error: workspaceError } = await supabase
    .from("workspaces")
    .insert({
      user_id: user.id,
      name: "General",
      is_system: true,
    });

  if (workspaceError) {
    throw workspaceError;
  }

  return user;
}

export async function loginUser(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw error;
  }

  return {
    session: data.session,
    user: data.user,
  };
}