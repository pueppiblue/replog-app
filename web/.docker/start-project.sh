#!/usr/bin/env bash

##############################################################
# wait for es services to be available
##############################################################

# enable/disable xdebug:
# - only enable in dev environment
# - only enable if PHP_XDEBUG_ENABLED is set to 1
if [ "${APP_ENVIRONMENT}" != "dev" ] || [ "$PHP_XDEBUG_ENABLED" != "1" ]; then
    sed -i -e 's/zend_extension/;zend_extension/g' /usr/local/etc/php/conf.d/xdebug.ini
else
    PHP_XDEBUG_REMOTE_HOST=$(hostname --ip-address | awk -F '.' '{printf "%d.%d.%d.1",$1,$2,$3}')

    sed -i -e "s/xdebug\.client_host.*/xdebug.client_host=$PHP_XDEBUG_REMOTE_HOST/g" /usr/local/etc/php/conf.d/xdebug.ini
    sed -i -e 's/;zend_extension/zend_extension/g'                                   /usr/local/etc/php/conf.d/xdebug.ini
fi

MYSQL_UP=$(nc -z -v -w30 mysql 3306 2>/dev/null; echo $?);
while [ $MYSQL_UP -ne 0 ]
do
    echo "Waiting for MySQL connection "
    sleep 5
    MYSQL_UP=$(nc -z -v -w30 mysql 3306 2>/dev/null; echo $?);
done

bin/set_owner.sh
bin/set_acl.sh ${CONTAINER_USER}

if [ "${APP_ENVIRONMENT}" = "dev" ]; then
    gosu ${CONTAINER_USER} composer install
    gosu ${CONTAINER_USER} php bin/console assets:install --env=${APP_ENVIRONMENT}

    setfacl -R -m u:www-data:rwx -m u:$HOST_UID:rwx -m m:rwx var
    setfacl -dR -m u:www-data:rwx -m u:$HOST_UID:rwx -m m:rwx var
elif [ "${APP_ENVIRONMENT}" = "prod" ]; then
    gosu ${CONTAINER_USER} php bin/console doctrine:migrations:sync-metadata-storage --env=${APP_ENVIRONMENT} --no-debug --no-interaction
    gosu ${CONTAINER_USER} php bin/console doctrine:database:create --if-not-exists --no-interaction --env=${APP_ENVIRONMENT}
    gosu ${CONTAINER_USER} php bin/console doctrine:migrations:migrate --no-interaction --env=${APP_ENVIRONMENT}
    gosu ${CONTAINER_USER} php bin/console assets:install --env=${APP_ENVIRONMENT}
fi

#gosu ${CONTAINER_USER} crontab /var/www/html/.docker/cronjobs.${APP_ENVIRONMENT}
#printenv | sed 's/^\(.*\)$/export \1/g' | grep -E "^export DB_|^export APP_|^export JWT_|^export MAILER_|^export VIRTUAL_HOST" > /var/www/html/bin/env.sh
#/etc/init.d/cron restart

#if [ "${APP_ENVIRONMENT}" != "dev" ]; then
    #setfacl -R -m u:www-data:rwx -m m:rwx var public/uploads
    #setfacl -dR -m u:www-data:rwx -m m:rwx var public/uploads
#fi

##############################################################
# execute the default command
##############################################################
apache2-foreground
