import { supabase, isSupabaseConfigured } from './supabaseClient.js'

const TABLE = 'comments'

export { isSupabaseConfigured }

// Run once in your Supabase project's SQL editor to create the table:
//
// create table comments (
//   id bigint generated always as identity primary key,
//   name text not null,
//   message text not null,
//   photo_url text,
//   created_at timestamptz not null default now()
// );

export async function fetchComments() {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function postComment({ name, message, photoUrl }) {
  if (!isSupabaseConfigured) return null

  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ name, message, photo_url: photoUrl }])
    .select()

  if (error) throw error
  return data?.[0]
}
