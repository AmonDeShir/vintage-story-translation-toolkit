use std::{collections::HashMap, path::PathBuf};
use tauri::api::dialog::blocking::{FileDialogBuilder};

use crate::json::json_loader;


#[derive(Clone)]
struct Files {
  source: String,
  translation: String
} 

#[derive(Clone, serde::Serialize)]
pub struct Entity {
  key: String,
  source: String,
  translation: String
}


pub async fn load_dictionary_file() -> Vec<Entity> {
  let files = match load_files().await {
    Option::Some(data) => data,
    _ => return Vec::new()
  };

  let source: HashMap<String, String> = json_loader(&files.source);
  let translation: HashMap<String, String> = json_loader(&files.translation);

  return match_data(source, translation);
}


async fn load_files() -> Option<Files> {
  let source = match read_file("Select source file").await {
    Option::Some(data) => data,
    _ => return Option::None
  };
  
  let translation = match read_file("Select translation file").await {
    Option::Some(data) => data,
    _ => return Option::None
  };

  return Option::Some(Files { source, translation });
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

fn match_data(source: HashMap<String, String>, translation: HashMap<String, String>) -> Vec<Entity> {
  let mut result = Vec::new();

  for key in source.keys() {
    if !translation.contains_key(key) {
      continue;
    }

    result.push(Entity {
      key: key.clone(),
      source: source.get(key).unwrap().clone(),
      translation: translation.get(key).unwrap().clone(),
    });
  }

  return result;
}