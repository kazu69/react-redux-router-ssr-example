FROM kazu69/node:6.3.0

ENV NODE_ENV development
ENV DB_HOST 'mysql'
ENV MYSQL_USER "root"
ENV MYSQL_PASSWORD "password"
ENV MYSQL_DATABASE "develop_db"
EXPOSE 3000

RUN mkdir /var/www/
WORKDIR /var/www/

ADD . .

RUN npm i

CMD [ "npm", "start" ]
