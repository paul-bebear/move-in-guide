/* Site configuration — the maintainer fills this in once.
   The shared "Catalog" tab needs a free Supabase project (see README.md, ~5 minutes).
   These are PUBLIC values (the anon key is designed to ship in frontend code);
   write access is controlled by row-level security policies in supabase/schema.sql. */

window.MIG_CONFIG = {
  supabaseUrl: "",      // e.g. "https://abcdefgh.supabase.co"
  supabaseAnonKey: "",  // Project Settings → API → anon public key
};
