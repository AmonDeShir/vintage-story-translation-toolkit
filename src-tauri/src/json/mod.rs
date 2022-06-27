use std::{collections::HashMap };

pub fn json_loader(data: &str) -> HashMap<String, String> {
  let mut result = HashMap::new();
  let lines = data.split("\n");

  for line in lines {
    let mut line = line.trim().to_string();

    if is_an_empty_line(&line) {
      continue;
    }

    if !has_start_quote_mark(&line) {
      continue;
    }

    line = remove_first_chart(line);

    if has_end_comma(&line) {
      line = remove_last_chart(line);
    }

    if !has_end_quote_mark(&line) {
      continue;
    }

    line = remove_last_chart(line);

    let (key, value) = match split_to_key_and_value(&line) {
      Some(value) => value,
      _ => continue,
    };

    result.insert(key, value);
  }

  return result;
}

fn is_an_empty_line(line: &str) -> bool {
  return line.len() == 0;
}

fn has_start_quote_mark(line: &str) -> bool {
  match line.chars().next() {
    Some(chart) => is_a_quote_mark(&chart),
    _ => false
  }
}

fn has_end_quote_mark(line: &str) -> bool {
  match line.chars().last() {
    Some(chart) => is_a_quote_mark(&chart),
    _ => false
  }
}

fn is_a_quote_mark(character: &char) -> bool {
  return character == &'\"';
}

fn has_end_comma(line: &str) -> bool {
  match line.chars().last() {
    Some(chart) => is_a_comma_mark(&chart),
    _ => false
  }
}

fn is_a_comma_mark(character: &char) -> bool {
  return character == &',';
}

fn remove_first_chart(line: String) -> String {
  return skip(line.clone(), 0).clone();
}

fn remove_last_chart(line: String) -> String {
  return skip(line.clone(), line.chars().count()-1).clone();
}

fn skip(data: String, index: usize) -> String {
  let mut result = String::new();
  let mut i = 0;

  for char in data.chars()  {

    if i == index {
      i += 1;
      continue;
    }

    result += &char.to_string();
    i += 1;
  }

  return result;
}

fn split_to_key_and_value(line: &str) -> Option<(String, String)> {
  let split: Vec<&str> = line.split("\": \"").collect();

  if split.len() != 2 {
    return Option::None;
  }

  return Option::Some((split[0].to_string(), split[1].to_string()));
}
