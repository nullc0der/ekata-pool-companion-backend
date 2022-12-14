# Common build stage
FROM node:18-alpine as common-build-stage
COPY . ./app
WORKDIR /app
RUN npm install
ENV NODE_ENV production
CMD ["npm", "run", "deploy:prod"]
