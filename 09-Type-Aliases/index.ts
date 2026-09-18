// Type Aliases


// 1. Type Alias for an Object
// I can create a reusable type for an object.

type User = {
    id: number;
    name: string;
    email: string;
};


// Now I can reuse the User type for multiple objects.

const user1: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};

const user2: User = {
    id: 102,
    name: "Rahul",
    email: "rahul@example.com"
};

console.log(user1);
console.log(user2);


// 2. Type Alias for a Primitive Type
// I can also give a meaningful name to a simple type.

type UserId = number;

let userId: UserId = 101;

console.log(userId);


// 3. Type Alias for an Array

type UserIds = number[];

const userIds: UserIds = [101, 102, 103];

console.log(userIds);


// 4. Type Alias for a Union Type
// I can give a name to a union type and reuse it.

type StringOrNumber = string | number;

let value: StringOrNumber = "Vivek";

value = 100;

console.log(value);


// 5. Optional Property
// phone is optional, so I don't have to provide it.

type Student = {
    name: string;
    age: number;
    phone?: string;
};

const student: Student = {
    name: "Vivek",
    age: 20
};

console.log(student);


// 6. Readonly Property
// id can be read, but I cannot reassign it.

type Account = {
    readonly id: number;
    name: string;
};

const account: Account = {
    id: 101,
    name: "Vivek"
};

account.name = "Rahul";

// account.id = 102; // Error because id is readonly

console.log(account);


// 7. Nested Type Aliases
// I can use one Type Alias inside another.

type Address = {
    city: string;
    pincode: number;
};

type Customer = {
    id: number;
    name: string;
    address: Address;
};

const customer: Customer = {
    id: 101,
    name: "Vivek",
    address: {
        city: "Mohali",
        pincode: 140301
    }
};

console.log(customer.address.city);


// 8. Type Alias for a Function
// I can describe the structure of a function using a Type Alias.

type Add = (a: number, b: number) => number;

const add: Add = (a, b) => {
    return a + b;
};

console.log(add(10, 20));


// My mental model:
//
// Type Alias → Give a reusable name to a type
//
// User         → reusable object type
// UserId       → reusable number type
// UserIds      → reusable array type
// StringOrNumber → reusable union type
// Add          → reusable function type