#! /bin/bash

rm -rf public
rm -rf resources
rm -rf .hugo_build.lock

git add -A
git commit -m "$1"
git push