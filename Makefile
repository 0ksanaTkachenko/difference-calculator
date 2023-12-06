install:
		npm ci && sudo npm link

gendiff:
		node bin/gendiff.js

# Run scan eslint on all folders in a directory
lint:
		npx eslint .

# eslint error correction
lint-fix:
		npx eslint --fix .

test:
		NODE_OPTIONS=--experimental-vm-modules npx jest