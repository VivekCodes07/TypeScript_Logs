// Arrays, Tuples and Enums


// Typed Array
// I can tell TypeScript what type of values
// my array is supposed to contain.

let names: string[] = ["Vivek", "Rahul", "Aman"];

names.push("Karan");

console.log(names);


// Array<T>
// This is another way of writing a typed array.

let marks: Array<number> = [80, 75, 90];

marks.push(95);

console.log(marks);


// TypeScript can also infer the array type.

let numbers = [10, 20, 30];

console.log(numbers);


// Tuple
// A tuple is useful when each position
// in the array has a specific meaning.

let user: [number, string, boolean] = [101, "Vivek", true];

console.log(user);


// Tuple positions have their own types.

let userId = user[0];
let username = user[1];
let isActive = user[2];

console.log(userId);
console.log(username);
console.log(isActive);


// Tuple Destructuring

let [id, name, active] = user;

console.log(id);
console.log(name);
console.log(active);


// Enum
// I can use an enum when I have a fixed set
// of named choices.

enum Role {
    Admin = "admin",
    User = "user",
    Manager = "manager"
}

let role: Role = Role.Admin;

console.log(role);


// Using enum as a function parameter

function printRole(role: Role): void {
    console.log("User role:", role);
}

printRole(Role.User);


// Array vs Tuple vs Enum

let userIds: number[] = [101, 102, 103];

let userInfo: [number, string] = [101, "Vivek"];

let userRole: Role = Role.Admin;

console.log(userIds);
console.log(userInfo);
console.log(userRole);


// My mental model:
//
// Array  → collection of values
// Tuple  → fixed structure where position matters
// Enum   → fixed set of named choices