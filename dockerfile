FROM node:18-bullseye

WORKDIR /app
RUN apt-get update && apt-get install -y python3 build-essential

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]