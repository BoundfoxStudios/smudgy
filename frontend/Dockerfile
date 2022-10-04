# Build Env
FROM node:alpine AS build-env
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY projects ./projects
COPY config ./config
COPY angular.json ./
COPY tsconfig.json ./
COPY tailwind.config.js ./

RUN npm run build:prod

# Prod Env
FROM nginx:alpine
WORKDIR /app

COPY --from=build-env /app/dist/smudgy /usr/share/nginx/html
COPY --from=build-env /app/config/nginx.conf /etc/nginx/conf.d/default.template

CMD sh -c "envsubst \"`env | awk -F = '{printf \" \\\\$%s\", $1}'`\" < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
