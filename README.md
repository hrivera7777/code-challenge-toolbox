# code-challenge

# Instructions

## Using Docker

### Build server image

```sh
cd server && docker build -t server.
```

### Run server image

```sh
docker run -p 3000:3000 server
```

### Build web-app image

```sh
cd web-app && docker build -t webapp.
```

### Run server image

```sh
docker run -p 80:80 web-app
```

## using docker-compose

```sh
docker-compose up or docker compose up
```

## Using node

## Prerequisites

- **_NodeJS_** version: = 14.x (prod recommended / dev recommended)

#### Development

```sh
npm install
npm run watch
```

#### Production

```sh
npm install
npm start
```

### for further information please refer to [Toolbox test](https://tbxnet.applytojob.com/questionnaire/5fb6954bc1c6f/prospect_20240414210453_IDKLCGTCQ32DFDJU/projob_20240414210453_LETEYEZHTCON9NAG)
