FROM node:9.10.0-alpine
COPY . ~/th
WORKDIR ~/th
ENV NODE_ENV=development
RUN npm i
ENTRYPOINT npm run dev
EXPOSE 3000/tcp
