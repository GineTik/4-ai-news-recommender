FROM node:20-alpine

WORKDIR /app

ARG DATABASE_URL
ARG OPEN_ROUTER_API_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV OPEN_ROUTER_API_KEY=$OPEN_ROUTER_API_KEY

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate --schema=./src/shared/prisma/schema.prisma

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
