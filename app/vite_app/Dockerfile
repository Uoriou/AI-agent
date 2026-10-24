#Dockerfile including NGINX for React Production build
FROM node:20-alpine AS build
WORKDIR /app
COPY vite_app/package*.json ./
RUN npm install --legacy-peer-deps
COPY vite_app/ .
RUN npm run build

FROM nginx:alpine
#copy into docker container file system path
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
