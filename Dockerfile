FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli@19
RUN npm ci
COPY . .
RUN npm run build

COPY . .
RUN ng build --configuration=production

FROM nginx:alpine
ADD ./config/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/riu-hero-challenge /var/www/app


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]