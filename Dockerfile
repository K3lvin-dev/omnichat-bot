# ----- Stage 1: Builder -----
FROM node:20 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run lint
RUN npm test
RUN npm run build

# ----- Stage 2: Production -----
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist
EXPOSE 3000

# Final command to start the server
CMD [ "npm", "start" ]