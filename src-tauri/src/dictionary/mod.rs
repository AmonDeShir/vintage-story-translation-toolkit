mod load_file;

#[tauri::command]
pub async fn dictionary_load_file() -> Vec<load_file::Entity> {
  load_file::load_dictionary_file().await
}