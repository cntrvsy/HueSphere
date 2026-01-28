use crate::migrator::Migrator;
use sea_orm::{DatabaseConnection, SqlxSqliteConnector};
use sea_orm_migration::MigratorTrait;
use sqlx::sqlite::{SqliteConnectOptions, SqliteJournalMode, SqlitePoolOptions};
use std::fs;
use std::str::FromStr;
use tauri::{path::BaseDirectory, AppHandle, Manager};

pub async fn init(app: &AppHandle) -> Result<DatabaseConnection, Box<dyn std::error::Error>> {
    // 1. Resolve Database Path
    // specific to Android/Desktop storage locs
    let app_data_dir = app.path().resolve("database", BaseDirectory::AppData)?;

    if !app_data_dir.exists() {
        fs::create_dir_all(&app_data_dir)?;
    }

    let db_path = app_data_dir.join("huesphere.db");
    let db_url = format!("sqlite://{}", db_path.to_string_lossy());

    // 3. Configure SQLx Options
    let options = SqliteConnectOptions::from_str(&db_url)?
        .journal_mode(SqliteJournalMode::Wal)
        .create_if_missing(true);

    // 4. Create Pool & SeaORM Connection
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await?;

    let db = SqlxSqliteConnector::from_sqlx_sqlite_pool(pool);

    // 5. Run Migrations
    Migrator::up(&db, None).await?;

    Ok(db)
}
