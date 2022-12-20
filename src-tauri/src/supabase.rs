use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SupabaseProjectConfigApi {
  pub port: u16,
}

#[derive(Deserialize)]
pub struct SupabaseProjectConfig {
  pub project_id: String,
  pub api: SupabaseProjectConfigApi,
}

#[derive(Serialize)]
pub struct ProjectMeta {
  pub id: String,
  pub path: String,
  pub name: String,
  pub port: u16,
}
