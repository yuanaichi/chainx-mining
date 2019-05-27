#!/bin/sh

yarn build && git checkout dist && cp -rf dist/* . && rm -rf dist && echo "dist copied.\n" && git add . && git commit -m "dist" && git push origin dist && git checkout master

echo  "build ok!"

