# Makefile

install:
		npm ci

gendiff:
		node bin/gendiff.js -h

make lint: 
	npx eslint .