// Lesson 2: Setup and TypeScript Compiler

/*
TypeScript Setup Commands:

1. Create package.json
   npm init -y

2. Install TypeScript
   npm install -D typescript

3. Create tsconfig.json
   npx tsc --init

4. Compile TypeScript
   npx tsc

5. Run the generated JavaScript
   node dist/index.js


My complete flow:

src/index.ts
     ↓
   npx tsc
     ↓
TypeScript Compiler
     ↓
Type Check + Transform
     ↓
dist/index.js
     ↓
node dist/index.js
     ↓
Node.js
     ↓
Program runs


Important:

TypeScript checks and generates.
JavaScript runs.
*/


// I am telling TypeScript that person must be a string
// and that this function will return a string
function greet(person: string): string {
    return `Hello! ${person}`;
}


// TypeScript knows that username is a string
const username: string = "Vivek";

// TypeScript checks that username matches the function parameter
console.log(greet(username));

console.log("John Cena is the GOAT");