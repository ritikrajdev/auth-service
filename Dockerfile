FROM alpine
RUN apk add nodejs npm
WORKDIR /app

COPY . .
RUN npm install

ENV REDIS_URL='redis://docker.for.mac.localhost:6379'
ENV SECRET_KEY='some-secret-key'
ENV HOST='docker.for.mac.localhost'

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "dev" ]