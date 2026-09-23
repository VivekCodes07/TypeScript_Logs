// Generic function
// I use <T> because I want this function to work with different types
// while still remembering the actual type I passed in.
function getValue<T>(value: T): T {
    return value;
}

const name = getValue("Vivek");
const age = getValue(20);
const isLoggedIn = getValue(true);

console.log(name);
console.log(age);
console.log(isLoggedIn);


// I can also explicitly tell TypeScript what type T should be.
const username = getValue<string>("Vivek");
const userAge = getValue<number>(20);

console.log(username);
console.log(userAge);


// Generics also work with objects.
// T becomes the complete object type passed to the function.
function getData<T>(data: T): T {
    return data;
}

const user = getData({
    id: 101,
    name: "Vivek",
    age: 20
});

console.log(user.id);
console.log(user.name);
console.log(user.age);


// Here T represents the type of values inside the array.
// I check for an empty array because items[0] can be undefined.
function getFirst<T>(items: T[]): T {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0]!;
}

const firstNumber = getFirst([10, 20, 30]);
const firstName = getFirst(["Vivek", "Rahul", "Aman"]);

console.log(firstNumber);
console.log(firstName);


// I can use more than one generic type when I need
// to work with different types in the same function.
function pair<T, U>(first: T, second: U) {
    return {
        first,
        second
    };
}

const result = pair("Vivek", 20);

console.log(result.first);
console.log(result.second);


// Generics are also useful for reusable structures.
// The same interface can work with different types of data.
interface ApiResponse<T> {
    success: boolean;
    data: T;
}

const userResponse: ApiResponse<string> = {
    success: true,
    data: "Vivek"
};

const ageResponse: ApiResponse<number> = {
    success: true,
    data: 20
};

console.log(userResponse.data);
console.log(ageResponse.data);