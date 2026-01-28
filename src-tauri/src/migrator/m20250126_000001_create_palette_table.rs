use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Palette::Table)
                    .if_not_exists()
                    .col(
                        ColumnDef::new(Palette::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Palette::Name).string().not_null())
                    .col(ColumnDef::new(Palette::ColorSpace).string().not_null())
                    .col(ColumnDef::new(Palette::Data).json().not_null())
                    .col(
                        ColumnDef::new(Palette::CreatedAt)
                            .timestamp()
                            .default(Expr::current_timestamp()),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Palette::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum Palette {
    Table,
    Id,
    Name,
    ColorSpace,
    Data,
    CreatedAt,
}
