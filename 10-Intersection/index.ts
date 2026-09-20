// Intersection Types


/*
    1. Basic Intersection

    An intersection combines two types.
    The final object must satisfy both types.
*/

type User = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type EmployeeUser = User & Employee;

const employeeUser: EmployeeUser = {
    name: "Vivek",
    employeeId: 101
};

console.log(employeeUser);


/*
    2. Adding More Properties

    I can combine existing types and
    add new properties to the result.
*/

type Address = {
    city: string;
};

type Person = User & Address & {
    age: number;
};

const person: Person = {
    name: "Vivek",
    city: "Mohali",
    age: 20
};

console.log(person);


/*
    3. Intersection with Function Types

    An intersection can also combine
    different function types.
*/

type Log = (message: string) => void;

type Add = (a: number, b: number) => number;

type Functions = Log & Add;


/*
    4. Conflicting Properties

    If two types have the same property
    with incompatible types, the intersection
    cannot have a useful value for that property.
*/

type A = {
    value: string;
};

type B = {
    value: number;
};

// type C = A & B;


/*
    My mental model:

    & 
    ↓
    AND

    A & B
    ↓
    Must satisfy A
    AND
    Must satisfy B

    Intersection
    ↓
    Combines multiple type requirements
*/