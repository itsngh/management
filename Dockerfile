FROM node:20-alpine3.19
WORKDIR /app
COPY . .
RUN npm i -g pnpm@latest
RUN pnpm install
RUN npx prisma generate
RUN npx tsc
EXPOSE 3000:3000
RUN node /app/build/server.js