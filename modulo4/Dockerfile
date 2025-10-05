# Etapa 1: Construcción
FROM node:20-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios para instalación
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar el proyecto NestJS
RUN npm run build

# Etapa 2: Producción (más liviana)
FROM node:20-alpine

WORKDIR /app

# Copiar solo los archivos necesarios desde la etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instalar solo dependencias de producción
RUN npm install --only=production

# Exponer el puerto de la API
EXPOSE 3000

# Definir variables de entorno (opcional)
# Puedes usar tu .env desde docker-compose

# Comando de inicio
CMD ["node", "dist/main"]
