use self::save_file::{InputWord};

mod load_file;
mod save_file;

#[tauri::command]
pub async fn words_load_file() -> Vec<load_file::Entity> {
  load_file::load_words_file().await
}

#[tauri::command]
pub async fn words_generate_translation_file(words: Vec<InputWord>) {
  println!("start");
  save_file::save_words_file(words).await
}