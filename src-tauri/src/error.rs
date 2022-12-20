use std::{ffi::OsString, str::Utf8Error};

use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct AppError {
  message: String,
  category: String,
}

impl From<&str> for AppError {
  fn from(error: &str) -> Self {
    AppError {
      message: error.to_string(),
      category: "string".to_string(),
    }
  }
}

impl From<toml::de::Error> for AppError {
  fn from(error: toml::de::Error) -> Self {
    AppError {
      message: error.to_string(),
      category: "toml".to_string(),
    }
  }
}

impl From<tauri::http::InvalidUri> for AppError {
  fn from(error: tauri::http::InvalidUri) -> Self {
    AppError {
      message: error.to_string(),
      category: "invalidUri".to_string(),
    }
  }
}

impl From<std::io::Error> for AppError {
  fn from(error: std::io::Error) -> Self {
    AppError {
      message: error.to_string(),
      category: "io".to_string(),
    }
  }
}

impl From<OsString> for AppError {
  fn from(error: OsString) -> Self {
    AppError {
      message: error.to_string_lossy().to_string(),
      category: "osString".to_string(),
    }
  }
}

impl From<base64::DecodeError> for AppError {
  fn from(error: base64::DecodeError) -> Self {
    AppError {
      message: error.to_string(),
      category: "base64".to_string(),
    }
  }
}

impl From<Utf8Error> for AppError {
  fn from(error: Utf8Error) -> Self {
    AppError {
      message: error.to_string(),
      category: "utf8".to_string(),
    }
  }
}
