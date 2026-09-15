// Type Assertions and Special Types


// any
// any basically tells TypeScript to stop checking this value.

let anyValue: any = "Hello";

anyValue = 100;
anyValue = true;

console.log(anyValue);


// unknown
// unknown means I don't know the type yet.
// Unlike any, TypeScript will not let me use it directly.

let value: unknown = "Hello";

// value.toUpperCase(); // Error

// I need to check the type first.
if (typeof value === "string") {
    console.log(value.toUpperCase());
}


// Type Narrowing
// The typeof check gives TypeScript evidence about the actual type.

let data: unknown = 100;

if (typeof data === "number") {
    console.log(data.toFixed(2));
}


// Type Assertion
// I already know that this value is a string,
// so I can tell TypeScript to treat it as a string.

let userInput: unknown = "Vivek";

let username = userInput as string;

console.log(username.toUpperCase());
console.log(username.length);


// Type Assertion does not convert the value.
// "100" is still a string at runtime.

let stringValue: unknown = "100";

let numberValue = stringValue as number;

console.log(numberValue);


// Actual type conversion is different.
// Number() actually converts the string into a number.

let convertedValue = Number(stringValue);

console.log(convertedValue);


// Type Assertion vs Type Narrowing

let input: unknown = "TypeScript";

// Assertion → I tell TypeScript the type.
let text = input as string;

console.log(text.toUpperCase());


// Narrowing → I check the value first.
if (typeof input === "string") {
    console.log(input.toUpperCase());
}


// void
// void is commonly used when a function finishes
// without returning a useful value.

function greet(): void {
    console.log("Hello Vivek");
}

greet();


// never
// never means the function never reaches a normal return.

function throwError(message: string): never {
    throw new Error(message);
}

// throwError("Something went wrong");


// Another example of never.
// This function never stops running normally.

function infiniteLoop(): never {
    while (true) {
        // keeps running
    }
}

// infiniteLoop();