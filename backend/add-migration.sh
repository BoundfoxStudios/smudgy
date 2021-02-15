#!/usr/bin/env bash

MIGRATION_NAME=$1

dotnet ef migrations add "$MIGRATION_NAME" \
  --startup-project ./BoundfoxStudios.Smudgy.Host/BoundfoxStudios.Smudgy.Host.csproj \
  --project ./BoundfoxStudios.Smudgy.Data/BoundfoxStudios.Smudgy.Data.csproj \

