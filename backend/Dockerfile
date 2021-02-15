# Build Image
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY *.sln ./
COPY BoundfoxStudios.Smudgy.Host/*.csproj ./BoundfoxStudios.Smudgy.Host/
COPY BoundfoxStudios.Smudgy.Hubs/*.csproj ./BoundfoxStudios.Smudgy.Hubs/

RUN dotnet restore

COPY BoundfoxStudios.Smudgy.Host/. ./BoundfoxStudios.Smudgy.Host/
COPY BoundfoxStudios.Smudgy.Hubs/. ./BoundfoxStudios.Smudgy.Hubs/

WORKDIR /app/BoundfoxStudios.Smudgy.Host
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/BoundfoxStudios.Smudgy.Host/out .
ENTRYPOINT ["dotnet", "BoundfoxStudios.Smudgy.Host.dll"]
