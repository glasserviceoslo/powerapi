FROM node:16-alpine

WORKDIR /data/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]
