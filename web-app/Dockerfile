ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine as build-stage
# Use production node environment by default.


WORKDIR /usr/src/app

COPY package*.json ./
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --omit=dev


# Copy the rest of the source files into the image.
COPY . .

RUN npm run build

FROM nginx:1.25.5 as production-stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
