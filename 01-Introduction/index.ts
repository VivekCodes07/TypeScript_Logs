// Lesson 1: Introduction to TypeScript

// TypeScript lets me define types
let age: number = 20;
let studentName: string = "Vivek";
let isStudent: boolean = true;

console.log(age, studentName, isStudent);


// TypeScript can also infer the type
let marks = 85; // number


// TypeScript checks function parameters
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(10, 20));

// add("10", "20"); // TypeScript error


/*
My understanding of this lesson:

TypeScript is basically JavaScript with a powerful static
type system and additional developer features.

I write:

    const age: number = 20;

TypeScript checks that "age" is being used as a number.

After TypeScript processes my code, the type annotation
does not need to exist in the final JavaScript:

    const age = 20;

So the basic flow I need to remember is:

TypeScript Code
       ↓
TypeScript Parser
       ↓
Type Checking
       ↓
Diagnostics / Errors
       ↓
JavaScript Output
       ↓
JavaScript Runtime


The important point:

TypeScript helps me catch many mistakes before runtime,
but JavaScript is ultimately what executes.
*/