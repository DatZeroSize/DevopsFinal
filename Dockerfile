# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY *.sln .
COPY DevopsFinal/*.csproj ./DevopsFinal/
COPY DevopsFinal.Tests/*.csproj ./DevopsFinal.Tests/
RUN dotnet restore

COPY DevopsFinal/. ./DevopsFinal/
COPY DevopsFinal.Tests/. ./DevopsFinal.Tests/

WORKDIR /src/DevopsFinal
RUN dotnet publish -c Release -o /app/publish

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

ENTRYPOINT ["dotnet", "DevopsFinal.dll"]
