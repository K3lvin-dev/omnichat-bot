# ----- Estágio 1: Builder -----
FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm run build

# ----- Estágio 2: Production -----
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000

# Comando final para iniciar o servidor
CMD [ "node", "dist/app.js" ]