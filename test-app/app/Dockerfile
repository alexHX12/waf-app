FROM php:7.2-apache
RUN apt-get update -y && apt-get upgrade -y
RUN a2enmod rewrite
RUN docker-php-ext-install pdo pdo_mysql mysqli

COPY ./blog /var/www/html