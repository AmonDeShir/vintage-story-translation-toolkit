use std::{collections::HashMap, path::PathBuf};
use tauri::api::dialog::blocking::{FileDialogBuilder};

use crate::json::json_loader;

#[derive(Clone, serde::Serialize)]
pub struct Entity {
  key: String,
  source: String,
}


pub async fn load_words_file() -> Vec<Entity> {
  let file = match read_file("Select file to translate").await {
    Option::Some(data) => data,
    _ => return Vec::new()
  };
  
  let json: HashMap<String, String> = json_loader(&file);

  return convert_json(json);
}

async fn read_file(msg: &str) -> Option<String> {
  let path = match open_dialog(msg).await {
    Option::Some(data) => data,
    _ => return Option::None
  };

  let data = tokio::fs::read_to_string(path).await;

  match data {
    Result::Ok(str) => Option::Some(str),
    Result::Err(_) => Option::None
  }
}

async fn open_dialog(msg: &str) -> Option<PathBuf> {
  let file = FileDialogBuilder::new()
    .set_title(msg)
    .add_filter("json", &["json"])
    .pick_file();

  return file;
}


fn convert_json(json: HashMap<String, String>) -> Vec<Entity> {
  let mut result = Vec::new();

  for key in json.keys() {
    result.push(Entity {
      key: key.clone(),
      source: json.get(key).unwrap().clone(),
    });
  }

  return result;
}