# 🎬 PruebaApp – .NET + React + SQL Server

Aplicación fullstack con .NET 8 (Web API) en el backend, React en el frontend y SQL Server como base de datos.
La arquitectura está dockerizada con docker-compose para simplificar el despliegue.

## 🚀 Tecnologías usadas

- Backend: .NET 8 Web API (C# + EF Core)

- Frontend: React (con Vite o CRA) + Tailwind CSS

- Base de datos: SQL Server 2022 (Express)

- Autenticación: JWT (JSON Web Token)

- Contenedores: Docker + Docker Compose

```bash
.
├── PruebaApp.Server/        # Backend (API .NET 8)
│   ├── Controllers/         # Controladores REST
│   ├── Models/              # Entidades EF Core
│   ├── Dtos/                # DTOs para requests/responses
│   ├── Data/                # DbContext
│   ├── Services/            # Lógica de negocio
│   └── Dockerfile           # Dockerfile del backend
│
├── frontend/                # Frontend en React
│   ├── src/                 # Código fuente
│   ├── public/              # Archivos estáticos
│   └── Dockerfile           # Dockerfile del frontend
│
├── docker-compose.yml       # Orquestación de servicios
└── README.md
```

# 🐳 Ejecutar con Docker

```bash
     docker compose -p movie_page up -d
```

# Migración de base de datos

```bash
     dotnet ef database update
```