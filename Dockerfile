FROM node:12

WORKDIR /usr/src/app/web

COPY . .

RUN npm install

RUN npm run build

RUN chmod +x ./docker-command.sh

CMD ["/usr/src/app/web/docker-command.sh"]