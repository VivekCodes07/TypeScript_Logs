/*
Lesson 23 — keyof and Generic Constraints

In this lesson I am learning how I can connect
an object with its valid keys.

I already know Generics from the previous lessons.

Now I want to understand:

keyof
K extends keyof T
T[K]

I am going to learn them step by step instead of
trying to understand the complete syntax at once.
*/


/*
First I will create a simple User type.

The properties name, age and email are the keys
of this User type.
*/

type User = {
    name: string;
    age: number;
    email: string;
};


/*
Now I want TypeScript to give me the keys
of the User type.

This is what keyof does.

keyof User

means:

"Give me the keys of User."

So TypeScript gets:

"name" | "age" | "email"
*/

type UserKeys = keyof User;

const key1: UserKeys = "name";
const key2: UserKeys = "age";
const key3: UserKeys = "email";

console.log(key1);
console.log(key2);
console.log(key3);


/*
This would give me an error because password
is not one of the keys of User.

I can see that UserKeys only allows:

"name"
"age"
"email"
*/

// const key4: UserKeys = "password";


/*
Now I want to use keyof directly inside
a function.

I am saying that the key parameter can only
be a key of User.

So this function accepts:

"name"
"age"
"email"

but not "password".
*/

function printKey(key: keyof User): void {
    console.log(key);
}

printKey("name");
printKey("age");
printKey("email");

// printKey("password");


/*
The problem with the function above is that
it is specifically connected to User.

What if I have another type?

I don't want to create a separate function
for every object type.

This is where I can use Generics.
*/


/*
I already learned that T is a placeholder
for a type.

Here I want T to represent the object type
that I am working with.

When I pass a User object to the function,
TypeScript can automatically figure out:

T = User
*/

const user: User = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};


/*
Now I want my function to accept:

1. An object
2. A key

T will represent the object type.

K will represent the key type.

So:

T = object type
K = key type
*/

function getProperty<T, K>(object: T, key: K) {
    // return object[key];
}


/*
There is a problem with the function above.

K can currently be any type.

I don't want any random key.

I want K to be a key of T.

For that I use:

K extends keyof T

I already know that keyof T means:

"Give me all the keys of T."

So:

K extends keyof T

means:

"K must be one of the keys of T."
*/


/*
Now the function has a relationship between
the object and its key.

T = object type

keyof T = all keys of that object

K = one key

K extends keyof T = K must be a valid key of T
*/

function getPropertySafe<T, K extends keyof T>(object: T, key: K) {
    return object[key];
}

console.log(getPropertySafe(user, "name"));
console.log(getPropertySafe(user, "age"));
console.log(getPropertySafe(user, "email"));


/*
This would give me an error.

Why?

Because TypeScript knows:

T = User

keyof T
    ↓
"name" | "age" | "email"

"password" is not one of those keys.

So K cannot be "password".
*/

// getPropertySafe(user, "password");


/*
This was the part that confused me at first.

When I write:

getPropertySafe(user, "name")

I am NOT manually passing T.

I am only passing:

user
"name"

TypeScript looks at user and figures out:

T = User

Then it looks at "name" and figures out:

K = "name"

So I can think of the call like this:

getPropertySafe(user, "name")

        ↓

T = User
K = "name"
*/


/*
Now I want to understand exactly what
keyof T is doing.

If:

T = User

then:

keyof T

becomes:

"name" | "age" | "email"

So the generic function works with whatever
object type is passed to it.

That is why I don't write:

keyof User

inside the generic function.

I write:

keyof T
*/


/*
Now I want to try the same idea with two keys.

If I want:

getTwoProperties(user, "name", "age")

then I need:

T  = object type
K1 = first key
K2 = second key

Both K1 and K2 should be valid keys of T.
*/

function getTwoProperties<T, K1 extends keyof T, K2 extends keyof T>(object: T, key1: K1, key2: K2) {
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


/*
When I call:

getTwoProperties(user, "name", "age")

TypeScript figures out:

T  = User
K1 = "name"
K2 = "age"

Then it checks:

K1 extends keyof T
K2 extends keyof T

Since both "name" and "age" are keys of User,
the function call is valid.
*/


/*
Now I want to understand one more thing:

T[K]

I can read this as:

"Give me the type of property K inside T."

For example:

T = User
K = "name"

Then:

T[K]

becomes:

User["name"]

which is:

string
*/


/*
If K is "age":

T = User
K = "age"

Then:

T[K]

becomes:

User["age"]

which is:

number

So T[K] gives me the type of the property
that I selected.
*/


/*
Now I can make the return type of my function
more specific.

I already know:

T = object type
K = key
K extends keyof T = K must be a valid key

Now I can use:

T[K]

to say what type the selected property has.
*/

function getPropertyWithType<T, K extends keyof T>(object: T, key: K): T[K] {
    return object[key];
}

const name = getPropertyWithType(user, "name");
const age = getPropertyWithType(user, "age");
const email = getPropertyWithType(user, "email");

console.log(name);
console.log(age);
console.log(email);


/*
TypeScript now understands the return types.

For:

getPropertyWithType(user, "name")

T = User
K = "name"

T[K]
    ↓
User["name"]
    ↓
string


For:

getPropertyWithType(user, "age")

T = User
K = "age"

T[K]
    ↓
User["age"]
    ↓
number
*/


/*
I can also apply the same idea to my
two-key function.

K1 represents the first key.

K2 represents the second key.

So:

T[K1]

means the type of the first selected property.

T[K2]

means the type of the second selected property.
*/

function getTwoPropertiesWithType<
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

const userData = getTwoPropertiesWithType(
    user,
    "name",
    "age"
);

console.log(userData.first);
console.log(userData.second);


/*
For this call:

getTwoPropertiesWithType(user, "name", "age")

TypeScript understands:

T  = User
K1 = "name"
K2 = "age"


Then:

T[K1]

becomes:

User["name"]

which is string.


And:

T[K2]

becomes:

User["age"]

which is number.


So the returned object is understood as:

{
    first: string;
    second: number;
}
*/


/*
Now I want to remember the complete concept
without memorizing the whole syntax.

T
↓
The object type

keyof T
↓
All keys of that object

K
↓
One key

K extends keyof T
↓
K must be a valid key of T

T[K]
↓
The type of the selected property
*/


/*
For example:

getPropertyWithType(user, "name")

The flow is:

user
↓
T = User

"name"
↓
K = "name"

keyof T
↓
"name" | "age" | "email"

K extends keyof T
↓
"name" is valid

T[K]
↓
User["name"]
↓
string
*/


console.log("Lesson 23 completed");
