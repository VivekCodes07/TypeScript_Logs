// A type annotation is when I explicitly tell TypeScript
// what type a variable should have.

let username: string = "Vivek";
let age: number = 20;
let isStudent: boolean = true;

console.log(username);
console.log(age);
console.log(isStudent);

// TypeScript will catch this error:
//
// age = "twenty";