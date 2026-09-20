/* Interface vs Type Alias */


/*
    1. Type Alias

    A type alias can describe the structure of an object.
*/

type User = {
    name: string;
    age: number;
};

const user1: User = {
    name: "Vivek",
    age: 20
};

console.log(user1);


/*
    2. Interface

    An interface can also describe the structure of an object.
*/

interface Student {
    name: string;
    age: number;
}

const student: Student = {
    name: "Rahul",
    age: 21
};

console.log(student);


/*
    3. Type Alias with Union

    Type aliases can also be used for union types.
*/

type Status = "success" | "error" | "loading";

let status: Status = "success";

status = "loading";

console.log(status);


/*
    4. Type Alias with Intersection

    I can combine two types using &.
*/

type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Developer = Person & Employee;

const developer: Developer = {
    name: "Vivek",
    employeeId: 101
};

console.log(developer);


/*
    5. Interface extends

    An interface can extend another interface.
*/

interface BasicUser {
    name: string;
}

interface Admin extends BasicUser {
    permissions: string[];
}

const admin: Admin = {
    name: "Vivek",
    permissions: ["read", "write"]
};

console.log(admin);


/*
    6. Type Alias for a Function

    A type alias can also describe a function.
*/

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => {
    return a + b;
};

console.log(add(10, 20));


/*
    7. Declaration Merging

    Interfaces with the same name are merged together.
*/

interface UserInfo {
    name: string;
}

interface UserInfo {
    age: number;
}

const userInfo: UserInfo = {
    name: "Vivek",
    age: 20
};

console.log(userInfo);


/*
    My mental model:

    type
        ↓
    General-purpose type definition
        ↓
    Object, Union, Intersection, Function, etc.

    interface
        ↓
    Mainly used for object structure
        ↓
    Can extend other interfaces
        ↓
    Supports declaration merging

    &       → Combine types
    extends → Extend an interface
*/