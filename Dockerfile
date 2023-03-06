FROM node:19-alpine

WORKDIR /app

COPY ./package* ./
RUN npm install

COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "dev" ]