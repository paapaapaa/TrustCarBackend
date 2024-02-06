FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]