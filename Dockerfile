FROM ubuntu:latest

MAINTAINER Princip <principle.main@gmail.com>

ENV WORKING_DIR /th

WORKDIR $WORKING_DIR

ADD ./distr $WORKING_DIR

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN chmod 755 $WORKING_DIR
RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl wget build-essential -y
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN apt-get install -y nodejs
RUN cd $WORKING_DIR
RUN npm i

EXPOSE 3000
CMD [ "npm", "run", "dev" ]
