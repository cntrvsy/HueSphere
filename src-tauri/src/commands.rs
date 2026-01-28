use crate::entities::{palette, prelude::*};
use sea_orm::*;
use tauri::State;

// Define a struct for the input payload to avoid having 'id' or 'created_at' in the request
#[derive(serde::Deserialize)]
pub struct CreatePaletteDto {
    pub name: String,
    pub color_space: String,
    pub data: serde_json::Value,
}

#[tauri::command]
pub async fn create_palette(
    state: State<'_, DatabaseConnection>,
    payload: CreatePaletteDto,
) -> Result<palette::Model, String> {
    let new_palette = palette::ActiveModel {
        name: Set(payload.name),
        color_space: Set(payload.color_space),
        data: Set(payload.data),
        ..Default::default() // id is AutoIncrement, created_at is default current_timestamp
    };

    let result = Palette::insert(new_palette)
        .exec_with_returning(&*state)
        .await
        .map_err(|e| e.to_string())?;

    Ok(result)
}

#[tauri::command]
pub async fn get_all_palettes(
    state: State<'_, DatabaseConnection>,
) -> Result<Vec<palette::Model>, String> {
    let palettes = Palette::find()
        .order_by_desc(palette::Column::CreatedAt)
        .all(&*state)
        .await
        .map_err(|e| e.to_string())?;

    Ok(palettes)
}
