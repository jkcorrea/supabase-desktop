#![allow(dead_code)]

pub const ANON_KEY: &'static str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
pub const SERVICE_ROLE_KEY: &'static str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
pub const JWT_SECRET: &'static str = "super-secret-jwt-token-with-at-least-32-characters-long";
pub const ACCESS_TOKEN_KEY: &'static str = "access-token";

pub const SUPABASE_ACCESS_TOKEN_PATH: &'static str = ".supabase/access-token";

pub const CONFIG_PATH: &'static str = "supabase/config.toml";
pub const PROJECT_REF_PATH: &'static str = "supabase/.temp/project-ref";
pub const REMOTE_DB_PATH: &'static str = "supabase/.temp/remote-db-url";
pub const CURR_BRANCH_PATH: &'static str = "supabase/.branches/_current_branch";
pub const MIGRATIONS_DIR: &'static str = "supabase/migrations";
pub const FUNCTIONS_DIR: &'static str = "supabase/functions";
pub const DB_TESTS_DIR: &'static str = "supabase/tests";
pub const SEED_DATA_PATH: &'static str = "supabase/seed.sql";

pub const APP_STORE: &'static str = ".sbdesktop.dat";
