FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY DevopsFinal.sln ./
COPY DevopsFinal.csproj ./ 
COPY DevopsFinal.Tests/DevopsFinal.Tests.csproj ./DevopsFinal.Tests/

COPY Controllers/ ./Controllers/
COPY Data/ ./Data/
COPY DevopsFinal.Tests/ ./DevopsFinal.Tests/
COPY Migrations/ ./Migrations/
COPY Models/ ./Models/
COPY Properties/ ./Properties/
COPY Views/ ./Views/
COPY wwwroot/ ./wwwroot/
COPY Program.cs ./

RUN dotnet restore

RUN dotnet build --configuration Release --no-restore

RUN dotnet publish --configuration Release --no-build --output /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .


ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "DevopsFinal.dll"]
