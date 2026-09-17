// Functions in TypeScript


// Function Parameters and Return Type
// I can tell TypeScript what type of values
// my function accepts and what it returns.

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(10, 20));


// TypeScript can also infer the return type.

function greet(name: string) {
    return `Hello ${name}`;
}

console.log(greet("Vivek"));


// Optional Parameter
// ? means I don't have to provide this value.

function showUser(name: string, age?: number): void {
    if (age !== undefined) {
        console.log(name, age);
    } else {
        console.log(name);
    }
}

showUser("Vivek");
showUser("Vivek", 20);


// Default Parameter
// If I don't provide the value, the default is used.

function welcome(name: string, age: number = 20): void {
    console.log(`Welcome ${name}, age: ${age}`);
}

welcome("Vivek");
welcome("Vivek", 21);


// Arrow Function

const multiply = (a: number, b: number): number => {
    return a * b;
};

console.log(multiply(5, 4));


// Function Type
// I can describe the complete shape of a function.

let calculate: (a: number, b: number) => number;

calculate = (a, b) => {
    return a + b;
};

console.log(calculate(10, 15));


// Rest Parameter
// All the arguments are collected into an array.

function addAll(...numbers: number[]): number {
    let total = 0;

    for (let number of numbers) {
        total += number;
    }

    return total;
}

console.log(addAll(10, 20, 30));
console.log(addAll(10, 20, 30, 40));


// Function with Object
// A function can also receive a typed object.

function printUser(user: { id: number; name: string }): void {
    console.log(user.id);
    console.log(user.name);
}

printUser({
    id: 101,
    name: "Vivek"
});


// My mental model:
//
// Parameters     → what the function receives
// Return type    → what the function gives back
// Optional (?)   → value may not be provided
// Default (=)    → use this value if nothing is provided
// Function type  → describes the complete function
// Rest (...)     → multiple values become an array
// void           → function does not return a useful value