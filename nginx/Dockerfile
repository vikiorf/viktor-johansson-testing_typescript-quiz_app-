FROM node:alpine as build-stage
WORKDIR /frontend
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
COPY ./frontend ./
RUN npm i
RUN npm run build

FROM nginx
COPY --from=build-stage /frontend/build /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf