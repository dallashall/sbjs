FROM node:8-alpine
WORKDIR /usr/local/etc/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5000
CMD [ "npm", "start" ]