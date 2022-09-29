# build env
FROM node:alpine as build-env
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY src ./src
COPY tsconfig.json ./

RUN npm run build-prod

# runtime env
FROM node:alpine

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./

RUN npm i --production

COPY --from=build-env /app/dist ./

CMD ["npm", "run", "docker-serve"]
