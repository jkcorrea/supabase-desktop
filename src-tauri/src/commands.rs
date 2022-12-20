use crate::constants;
use crate::error::AppError;
use crate::supabase::*;
use crate::utils;

pub type CommandResult<T> = Result<T, AppError>;

#[tauri::command]
pub fn open_project(dir: &str) -> CommandResult<ProjectMeta> {
  let path = std::path::Path::new(&dir).join(&constants::CONFIG_PATH);
  if !path.exists() {
    return Err("Cannot find supabase/config.toml in the current directory. Have you set up the project with supabase init?".into());
  }

  let contents = utils::read_file(&path.to_str().unwrap())?;
  // Parse contents as toml
  let config: SupabaseProjectConfig = toml::from_str(&contents)?;

  // Return the project metadata
  Ok(ProjectMeta {
    // ID is just the base64 encoded dir path
    id: base64::encode(dir),
    path: dir.to_string(),
    name: config.project_id,
    port: config.api.port,
  })
}

#[tauri::command]
pub fn get_local_project_by_id(id: &str) -> CommandResult<ProjectMeta> {
  let dir = base64::decode(id)?;
  let dir = std::str::from_utf8(&dir)?;
  open_project(dir)
}

#[tauri::command]
pub fn get_access_token() -> CommandResult<String> {
  // Try to load from env
  match std::env::var("SUPABASE_ACCESS_TOKEN") {
    Ok(token) => {
      // TODO validate it matches AccessTokenPattern regex
      return Ok(token);
    }
    Err(_) => {}
  }

  // TODO Try to load from native credentials store
  // let entry = Entry::new("")
  // if let token =

  // Fallback to reading from home directory
  let home = std::env::var("HOME").unwrap();
  // Join paths
  let path = std::path::Path::new(&home).join(&constants::SUPABASE_ACCESS_TOKEN_PATH);
  if !path.exists() {
    return Err("Could not locate Supabase access token. Have you set up the Supabase CLI?".into());
  }

  let contents = utils::read_file(&path.to_str().unwrap())?;
  Ok(contents.trim().to_string())
}
