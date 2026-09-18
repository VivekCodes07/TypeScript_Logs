// Object Types


// 1. Basic Object Type
// Here I am defining what properties
// the object should have.

let user: {
    name: string;
    age: number;
    isStudent: boolean;
} = {
    name: "Vivek",
    age: 20,
    isStudent: true
};

console.log(user);


// 2. Accessing Object Properties
// TypeScript knows the type of each property.

console.log(user.name);
console.log(user.age);


// 3. Nested Object
// An object can contain another object.

let student: {
    name: string;
    age: number;
    address: {
        city: string;
        pincode: number;
    };
} = {
    name: "Vivek",
    age: 20,
    address: {
        city: "Mohali",
        pincode: 140301
    }
};

console.log(student.address.city);


// 4. Optional Property
// phone is optional, so the object
// does not have to contain it.

let customer: {
    name: string;
    email: string;
    phone?: string;
} = {
    name: "Vivek",
    email: "vivek@example.com"
};

console.log(customer);


// 5. Readonly Property
// readonly means I cannot reassign
// this property after the object is created.

let account: {
    readonly id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};

account.name = "Rahul";

// account.id = 102; // Error because id is readonly

console.log(account);


// 6. Object Type Inference
// TypeScript can automatically understand
// the shape of an object from its values.

let product = {
    name: "Laptop",
    price: 60000
};

console.log(product.name);
console.log(product.price);


// 7. Object Type in Function
// The parameter can also be given
// an object type.

function printUser(user: {
    name: string;
    age: number;
}): void {
    console.log(user.name);
    console.log(user.age);
}

printUser({
    name: "Vivek",
    age: 20
});


// My mental model:
//
// Object Type
//     ↓
// Describes the structure of an object
//
// property: type
//     ↓
// Required property
//
// property?: type
//     ↓
// Optional property
//
// readonly property
//     ↓
// Cannot reassign the property
//
// TypeScript
//     ↓
// Checks the object's structure at compile time