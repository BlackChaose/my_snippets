# Makefile
install:
	npm install @babel/core @babel/cli @babel/node @babel/preset-env
build: 
	npm run build
publish:
	npm publish --dry-run
lint:
	npx eslint .

devsrv:
	php -S localhost:5000
bundle:
	browserify -e ./dist/index.js > ./dist/bundle.js

instbrow:
	npm install -g browserify
asm:
	npx eslint .
	npm run build
	browserify -e ./dist/index.js > ./dist/bundle.js

update:
	./update_snippets.sh