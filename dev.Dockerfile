FROM node:16
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY bash-scripts/backend-dev/* /usr/local/bin/

RUN chmod +x /usr/local/bin/*

RUN echo 'alias bin="cd /usr/local/bin"' >> /root/.bashrc

COPY package*.json ./

COPY bash-scripts/backend-dev/aliases ./

RUN echo "if [ -f /aliases ]; then . /aliases; fi" >> ~/.bashrc

RUN npm install

COPY prisma ./prisma

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm run migrate

CMD ["npm", "start"]