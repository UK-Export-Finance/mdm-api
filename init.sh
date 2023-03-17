#!/usr/bin/env bash
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

echo "Intialising OpenRC..."
openrc
mkdir -p /run/openrc/
touch /run/openrc/softlevel

echo "Intialising API..."
CMD [ "node", "dist/main.js" ]