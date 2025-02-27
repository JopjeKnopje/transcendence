FROM node:22

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install && npm install -g nodemon \
	&& npm install better-sqlite3 \
	&& npm install @fastify/formbody

EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

CMD ["npm", "start", "dev"]
