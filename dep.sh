#!/bin/bash

mysql -e "CREATE DATABASE tododb;"
mysql -e "CREATE USER 'ensolvuser'@localhost IDENTIFIED BY 'enslovpass';"
mysql -e "GRANT ALL PRIVILEGES ON tododb.* TO 'ensolvuser'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"
mysql  --user=ensolvuser --password=ensolvpass tododb < tododbDump.sql
JAVA_HOME=$(dirname $(dirname `readlink -f $(which java)`))
mvn clean install spring-boot:repackage
mvn spring-boot:run &
cd todo-front/ && npm run build
serve -s build



