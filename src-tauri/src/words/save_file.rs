use std::{path::PathBuf, collections::HashMap};

use tauri::api::dialog::blocking::{FileDialogBuilder};


#[derive(Clone, serde::Serialize, serde::Deserialize)]
pub struct InputWord {
  id: String,
  key: String,
  source: String,
  translation: String,
}


pub async fn save_words_file(words: Vec<InputWord>) {
  let words = convert_data(words);

  let data = match serde_json::to_string_pretty(&words) {
    Ok(str) => str,
    _ => return
  };
  
  save_file("Save translated file", &data).await;
}

async fn save_file(msg: &str, data: &str) {
  let path = match open_dialog(msg).await {
    Option::Some(data) => data,
    _ => return
  };

  match tokio::fs::write(path, data).await {
    _ => return
  }
}


async fn open_dialog(msg: &str) -> Option<PathBuf> {
  let file = FileDialogBuilder::new()
    .set_title(msg)
    .add_filter("json", &["json"])
    .save_file();

  return file;
}


fn convert_data(words: Vec<InputWord>) -> HashMap<String, String> {
  let mut result = HashMap::new();
  
  for word in words {
    result.insert(word.key, word.translation);
  }

  return result;
}