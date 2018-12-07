FROM node:10.14-alpine

ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

RUN npm install
RUN npm run build

#ENV HOST 0.0.0.0

EXPOSE 3000

#CMD [ "npm", "start" ]
