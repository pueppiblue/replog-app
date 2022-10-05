# hint: use https://www.fromlatest.io/ for smaller image sizes

FROM composer:1 as composer
FROM php:7.4-apache

ARG APP_ENVIRONMENT=prod
ARG HOST_UID=1000
ARG HOST_GID=1000
ARG CONTAINER_USER=docker
ARG CONTAINER_GROUP=docker

ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}
ENV HOST_UID=${HOST_UID}
ENV HOST_GID=${HOST_UID}
ENV CONTAINER_GROUP=${CONTAINER_GROUP}
ENV CONTAINER_USER=${CONTAINER_USER}
ENV PANTHER_NO_SANDBOX 1

COPY --from=composer /usr/bin/composer /usr/bin/composer

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

RUN apt-get update && apt-get install --no-install-recommends -y \
        curl \
        gnupg \
        apt-transport-https \
        && rm -rf /var/lib/apt/lists/*

# set correct timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 16.2.0
ENV NVM_VERSION 0.38.0
RUN mkdir $NVM_DIR

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$NVM_VERSION/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install --no-install-recommends -y \
        wget \
        cron \
        netcat \
        yarn \
        libicu-dev \
        libzip-dev \
        libjpeg-dev \
        libpng-dev \
        libssl-dev \
        git-core \
        gosu \
        acl \
        unzip \
        default-mysql-client \
        && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure opcache --enable-opcache && \
        docker-php-ext-install opcache && \
        docker-php-ext-install -j$(nproc) pdo_mysql && \
        pecl install apcu && \
        docker-php-ext-enable apcu && \
        docker-php-ext-configure intl && \
        docker-php-ext-install bcmath && \
        docker-php-ext-install exif && \
        docker-php-ext-install intl

# configure php and xdebug
COPY .docker/web/etc/php/ /usr/local/etc/php/
RUN docker-php-ext-install zip
RUN pecl install xdebug && docker-php-ext-enable xdebug
RUN sed -i -e 's/zend_extension/;zend_extension/g' /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini;

COPY .docker/web/etc/apache2/sites-available/000-default.conf /etc/apache2/sites-enabled/
RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod ssl
RUN a2enmod remoteip

RUN openssl genrsa -passout pass:x -out /etc/ssl/private/cert.pass.key 2048
RUN openssl rsa -passin pass:x -in /etc/ssl/private/cert.pass.key -out /etc/ssl/private/cert.key
RUN openssl req -new -key /etc/ssl/private/cert.key -out /etc/ssl/private/cert.csr -batch
RUN openssl x509 -req -days 365 -in /etc/ssl/private/cert.csr -signkey /etc/ssl/private/cert.key -out /etc/ssl/private/cert.crt

# https://getcomposer.org/doc/03-cli.md#composer-allow-superuser

RUN groupadd --gid ${HOST_GID} ${CONTAINER_GROUP} && \
    useradd --uid ${HOST_UID} --gid ${HOST_GID} -ms /bin/bash ${CONTAINER_USER} && \
    usermod -a -G www-data ${CONTAINER_USER} && \
    chown ${CONTAINER_USER}:${CONTAINER_GROUP} /usr/bin/composer

# contains dev-mode packages
#RUN gosu ${CONTAINER_USER} composer global config --no-interaction allow-plugins.pyrech/composer-changelogs true && \
#    gosu ${CONTAINER_USER} composer global require "pyrech/composer-changelogs:^1.6" --prefer-dist --no-progress --classmap-authoritative

COPY .docker /

# USE DOCKER CACHE FOR VENDORS:
# 1st: copy composer-files & run composer install
# 2nd: copy project sources => changing of project sources does'n break cache for previous step
COPY composer.json composer.lock /var/www/html/
#COPY composer.json composer.lock package.json yarn.lock symfony.lock /var/www/html/
RUN if [ "${APP_ENVIRONMENT}" != "dev" ]; then \
        chown -R ${CONTAINER_USER}:${CONTAINER_GROUP} /var/www/html; \
        cd /var/www/html; \
        gosu ${CONTAINER_USER} composer install --optimize-autoloader --no-interaction; \
#        gosu ${CONTAINER_USER} yarn install; \
    fi

COPY . /var/www/html
RUN cd /var/www/html && \
    if [ "${APP_ENVIRONMENT}" != "dev" ]; then \
        chown -R ${CONTAINER_USER}:${CONTAINER_GROUP} /var/www/html; \
#        bin/set_acl.sh ${CONTAINER_USER}; \
#        gosu ${CONTAINER_USER} yarn encore production; \
#        gosu ${CONTAINER_USER} php bin/console cache:clear --env="${APP_ENVIRONMENT}" --no-debug; \
    fi

COPY ./.docker/start-project.sh /start-project.sh

EXPOSE 443

WORKDIR /var/www/html

RUN ls -la

RUN chmod 777 /start-project.sh
ENTRYPOINT /start-project.sh
