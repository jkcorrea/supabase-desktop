#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_store::PluginBuilder as StorePluginBuilder;

mod commands;
mod constants;
mod error;
mod supabase;
mod utils;

fn main() {
  tauri::Builder::default()
    .plugin(StorePluginBuilder::default().build())
    .invoke_handler(tauri::generate_handler![
      commands::open_project,
      commands::get_local_project_by_id,
      commands::get_access_token,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
