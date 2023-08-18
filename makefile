all:
	npm run langium:generate
	npm run build


test-cli:
	./bin/cli parseAndValidate examples/ferry.stpa
