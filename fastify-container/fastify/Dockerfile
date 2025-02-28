FROM node:22

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install && npm install -g nodemon && npm install better-sqlite3 && npm install concurrently --save-dev

EXPOSE 3000
EXPOSE 3001 

ENV ADDRESS=0.0.0.0 PORT=3000

CMD ["npm", "start", "dev"]
