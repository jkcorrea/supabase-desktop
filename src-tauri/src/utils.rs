use std::{fs::File, io::Read};

pub(crate) fn read_file(path: &str) -> Result<String, std::io::Error> {
  let mut file = File::open(&path)?;
  let mut contents = String::new();
  file.read_to_string(&mut contents)?;
  Ok(contents)
}
