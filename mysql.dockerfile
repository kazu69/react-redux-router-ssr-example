FROM mysql:5.6

ENV MYSQL_ROOT_USER root
ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE develop_db

EXPOSE 3306

ADD mysql/init.d /docker-entrypoint-initdb.d
