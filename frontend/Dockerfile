# Build Stage
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Serve Stage
FROM nginx:alpine
COPY --from=build /app/dist/ /usr/share/nginx/html

# Opcional: configura Nginx si necesitas redirigir rutas de Angular
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
