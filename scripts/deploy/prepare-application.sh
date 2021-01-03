#/bin/bash

cd /home/ec2-user/spot-share
composer install
cp /home/ec2-user/deploy/spot-share/.env ./
chmod -R 777 storage