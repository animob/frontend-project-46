# Makefile

install:
		npm ci

gendiff:
		node bin/gendiff.js -h

lint: 
	npx eslint .

test: 
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8