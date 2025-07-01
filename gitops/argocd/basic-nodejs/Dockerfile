FROM node:23-bookworm-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

FROM node:23-bookworm-slim

WORKDIR /app

COPY --from=build /app .

EXPOSE 3000

CMD ["node", "index.js"]