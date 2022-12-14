# Common build stage
FROM node:18-alpine as common-build-stage
RUN mkdir -p app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
ENV NODE_ENV production
CMD ["npm", "run", "deploy:prod"]
