#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/sdk:3.1  AS base
WORKDIR /app
# EXPOSE 80
# EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["NurseCallMonitor/NurseCallMonitor.csproj", "NurseCallMonitor/"]
# COPY ["Listener/Listener.csproj", "Listener/"]
RUN dotnet restore "NurseCallMonitor/NurseCallMonitor.csproj"
COPY . .
WORKDIR "/src/NurseCallMonitor"
RUN dotnet build "NurseCallMonitor.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "NurseCallMonitor.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "NurseCallMonitor.dll"]
