# Build Image
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

COPY *.sln ./
COPY BoundfoxStudios.Smudgy.Host/*.csproj ./BoundfoxStudios.Smudgy.Host/
COPY BoundfoxStudios.Smudgy.Hubs/*.csproj ./BoundfoxStudios.Smudgy.Hubs/
COPY BoundfoxStudios.Smudgy.Contracts/*.csproj ./BoundfoxStudios.Smudgy.Contracts/
COPY BoundfoxStudios.Smudgy.Data/*.csproj ./BoundfoxStudios.Smudgy.Data/
COPY BoundfoxStudios.Smudgy.Services/*.csproj ./BoundfoxStudios.Smudgy.Services/

RUN dotnet restore

COPY BoundfoxStudios.Smudgy.Host/. ./BoundfoxStudios.Smudgy.Host/
COPY BoundfoxStudios.Smudgy.Hubs/. ./BoundfoxStudios.Smudgy.Hubs/
COPY BoundfoxStudios.Smudgy.Contracts/. ./BoundfoxStudios.Smudgy.Contracts/
COPY BoundfoxStudios.Smudgy.Data/. ./BoundfoxStudios.Smudgy.Data/
COPY BoundfoxStudios.Smudgy.Services/. ./BoundfoxStudios.Smudgy.Services/

WORKDIR /app/BoundfoxStudios.Smudgy.Host
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-env /app/BoundfoxStudios.Smudgy.Host/out .
ENTRYPOINT ["dotnet", "BoundfoxStudios.Smudgy.Host.dll"]
