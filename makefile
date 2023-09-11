all:
	npm run langium:generate
	npm run build

light:
	npm run build

test-cli:
	./bin/cli parseAndValidate examples/netweapon_constraint.stpa
