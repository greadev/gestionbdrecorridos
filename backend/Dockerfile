FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Si usas variables de entorno, configúralas como quieras (o usa .env)
EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
