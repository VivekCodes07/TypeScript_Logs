/*
Lesson 24 — Generic Utility Patterns

I already learned keyof, generic constraints and T[K].

Now I am using those concepts to build
small reusable utility functions.
*/


// --------------------------------------------------
// 1. Get a property
// --------------------------------------------------

type User = {
    name: string;
    age: number;
    email: string;
};

const user: User = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};


/*
T = object type
K = key

K extends keyof T makes sure the key
actually belongs to the object.

T[K] gives me the type of that property.
*/

function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}

console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));


// --------------------------------------------------
// 2. Update a property
// --------------------------------------------------

/*
Here T[K] is also used for the value.

The value must match the type of the
property selected by the key.

age → number
name → string
*/

function updateProperty<T, K extends keyof T>(
    object: T,
    key: K,
    value: T[K]
): void {
    object[key] = value;
}

updateProperty(user, "name", "Rahul");
updateProperty(user, "age", 21);

console.log(user);


// --------------------------------------------------
// 3. Get two properties
// --------------------------------------------------

/*
Now I am using two key types.

K1 = first key
K2 = second key

Both keys must belong to T.
*/

function getTwoProperties<
    T,
    K1 extends keyof T,
    K2 extends keyof T
>(
    object: T,
    key1: K1,
    key2: K2
): {
    first: T[K1];
    second: T[K2];
} {
    return {
        first: object[key1],
        second: object[key2]
    };
}

const result = getTwoProperties(
    user,
    "name",
    "age"
);

console.log(result.first);
console.log(result.second);


// --------------------------------------------------
// 4. Get one property from an array of objects
// --------------------------------------------------

/*
Now I am combining the generic array pattern
with keyof and T[K].

T = object type
K = valid key of T

T[K][] = array containing the type
of the selected property.
*/

function getValues<T, K extends keyof T>(
    items: T[],
    key: K
): T[K][] {
    const values: T[K][] = [];

    for (const item of items) {
        values.push(item[key]);
    }

    return values;
}

const users: User[] = [
    {
        name: "Vivek",
        age: 20,
        email: "vivek@gmail.com"
    },
    {
        name: "Rahul",
        age: 21,
        email: "rahul@gmail.com"
    }
];

const names = getValues(users, "name");
const ages = getValues(users, "age");

console.log(names);
console.log(ages);


// --------------------------------------------------
// 5. Same utility with another object type
// --------------------------------------------------

/*
The function is generic, so it is not limited
to User.

T simply becomes the type of the object
I pass to it.
*/

type Product = {
    title: string;
    price: number;
};

const products: Product[] = [
    {
        title: "Laptop",
        price: 60000
    },
    {
        title: "Keyboard",
        price: 2000
    }
];

const titles = getValues(products, "title");
const prices = getValues(products, "price");

console.log(titles);
console.log(prices);


// --------------------------------------------------
// Final pattern
// --------------------------------------------------

/*
The main pattern I am practicing is:

T
↓
object type

K extends keyof T
↓
valid key

T[K]
↓
type of that property

I can now use this pattern for different
objects without using any.
*/

console.log("Lesson 24 completed");
