/* 
Type inference means TypeScript automatically determines the type from the value I assign.
*/
let username = "Vivek";
let age = 20;
let isStudent = true;

// TypeScript understands:
//
// username → string
// age → number
// isStudent → boolean

console.log(username);
console.log(age);
console.log(isStudent);

// This would produce a type error:
//
// age = "twenty";