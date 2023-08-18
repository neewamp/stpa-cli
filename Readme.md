# Purpose 
Define a command line interface using pasta dsl's grammar for stpa.

## Prerequisites
- Node.js
- The npm package manager

## Changes made
- The Grammar, (stpa.langium)(./src/language/stpa.langium) has had cross references, `[Node]`, removed since there must be some langium linker magic I don't understand that the pasta dsl plugin does.
- There is an `parseAndValidate` function accessible through the command line argument with the same name.  Defined in [main.ts](./src/language/stpa.langium)
  - See [makefile](./makefile) for an example of using this to parse the [ferry.stpa](examples/ferry.stpa) example.
