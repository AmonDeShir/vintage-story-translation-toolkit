#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod dictionary;
mod words;
mod json;

fn main() {
  let context = tauri::generate_context!();
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      dictionary::dictionary_load_file, 
      words::words_load_file,
      words::words_generate_translation_file
    ])
    .run(context)
    .expect("error while running tauri application");
}
