// Generics with Arrays and Arrow Functions


// T[] and Array<T> both represent an array of a specific type

const names: string[] = ["Vivek", "Rahul", "Aman"];

const numbers: Array<number> = [10, 20, 30];

console.log(names);
console.log(numbers);


// Generic function with an array
// T will be decided when I call the function

function getFirst<T>(items: T[]): T {

    // Because noUncheckedIndexedAccess is enabled,
    // I need to handle the empty array case

    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    /*
    items[0] can be T | undefined because
    noUncheckedIndexedAccess is enabled.

    The ! tells TypeScript:
    "I have already checked that the array is not empty,
    so trust me that items[0] is not undefined."

    The ! is called the Non-null Assertion Operator.

    It only affects TypeScript's type checking.
    It does not perform any runtime check.
    */

    return items[0]!;
}

const firstName = getFirst(["Vivek", "Abhishek"]);
const firstNumber = getFirst([10, 20, 30]);
const firstBoolean = getFirst([true, false]);

console.log(firstName);
console.log(firstNumber);
console.log(firstBoolean);


// Generic arrow function
// Same Generic concept, just using arrow function syntax

const getValue = <T>(value: T): T => {
    return value;
};

const username = getValue("Vivek");
const age = getValue(20);
const isLoggedIn = getValue(true);

console.log(username);
console.log(age);
console.log(isLoggedIn);


// Generic arrow function with an array

const getFirstValue = <T>(items: T[]): T => {

    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    /*
    I already checked that the array is not empty.

    So I know that items[0] will not be undefined.

    The ! tells TypeScript to trust this assumption
    and treat items[0] as T instead of T | undefined.
    */

    return items[0]!;
};

const name = getFirstValue(["Vivek", "Abhishek"]);
const number = getFirstValue([10, 20, 30]);

console.log(name);
console.log(number);


// I can also provide the Generic type explicitly
// But TypeScript can usually infer it automatically

const explicitName = getFirstValue<string>(["Vivek", "Rahul"]);

console.log(explicitName);


// Multiple Generic types
// T and U can represent different types

const pair = <T, U>(first: T, second: U) => {
    return {
        first,
        second
    };
};

const result = pair("Vivek", 20);

console.log(result.first);
console.log(result.second);


// Generics also work with arrays of objects

type User = {
    name: string;
    age: number;
};

const users: User[] = [
    {
        name: "Vivek",
        age: 20
    },
    {
        name: "Rahul",
        age: 21
    }
];

const firstUser = getFirst(users);

console.log(firstUser.name);
console.log(firstUser.age);


// The main idea:
// T can represent different types,
// but TypeScript still remembers the actual type.