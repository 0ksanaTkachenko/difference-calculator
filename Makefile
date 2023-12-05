install:
		npm ci && sudo npm link

gendiff:
		node bin/gendiff.js
