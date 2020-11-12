FROM node:12.12.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python
RUN npm install
RUN npm uninstall bcrypt
RUN npm install bcrypt
COPY . /usr/src/app
EXPOSE 8000
CMD [ "npm", "start" ]
