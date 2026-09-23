# 20 — Generics in Arrays and Arrow Functions

## Why Am I Learning This?

In the previous lesson, I learned the basic idea of **Generics**.

The main idea was:

```text
Generic
   ↓
Type Placeholder
   ↓
Type is decided when I use it
   ↓
TypeScript remembers that type
```

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Generics are not limited to normal functions. I can also use them with:

* Arrays
* Arrow functions
* Arrays of objects
* Reusable utility functions
* Functions that work with different types

This is important because I will use reusable, type-safe functions frequently when working with TypeScript backend code.

---

## What I Am Going To Study

In this lesson, I will understand:

* `T[]` and `Array<T>`
* Generic functions that accept arrays
* Generic arrow functions
* Generic arrow functions with arrays
* Generic type inference
* Multiple generic parameters
* Arrays of objects with Generics
* Generics vs `any`
* Handling empty arrays with `noUncheckedIndexedAccess`
* How these concepts connect to backend development

---

# 1. Generics With Arrays

I already know how to create a typed array:

```ts
const names: string[] = ["Vivek", "Rahul", "Aman"];
```

There is another way to write the same type:

```ts
const names: Array<string> = ["Vivek", "Rahul", "Aman"];
```

Both mean the same thing.

```text
string[]
   ↓
Array<string>
   ↓
Array containing strings
```

The same applies to other types:

```ts
const numbers: number[] = [10, 20, 30];

const numbers2: Array<number> = [10, 20, 30];
```

Both tell TypeScript:

```text
This array contains numbers.
```

---

# 2. Understanding `Array<T>`

The syntax is:

```ts
Array<T>
```

Here, `T` represents the type stored inside the array.

```ts
const numbers: Array<number> = [10, 20, 30];

const names: Array<string> = ["Vivek", "Rahul"];

const loggedIn: Array<boolean> = [true, false, true];
```

Think of it like this:

```text
Array<number>   → array of numbers
Array<string>   → array of strings
Array<boolean>  → array of booleans
```

The important part is:

```text
<T>
 ↓
Type placeholder
```

The actual type replaces `T`.

---

# 3. `T[]` vs `Array<T>`

These two forms represent the same idea:

```ts
number[]
```

and:

```ts
Array<number>
```

Both mean:

```text
Array of numbers
```

Similarly:

```ts
User[]
```

and:

```ts
Array<User>
```

Both mean:

```text
Array containing User objects
```

The difference is mainly syntax.

```text
T[]
   ↓
Short array syntax

Array<T>
   ↓
Generic array syntax
```

I should be comfortable reading both because both can appear in real TypeScript projects.

---

# 4. Generic Function With an Array

Suppose I want a function that returns the first value from an array.

Without Generics, I might need separate functions:

```ts
function getFirstString(items: string[]): string {
    // ...
}

function getFirstNumber(items: number[]): number {
    // ...
}
```

But the logic is exactly the same.

Only the type changes.

Generics allow me to write one reusable function:

```ts
function getFirst<T>(items: T[]): T {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
}
```

Now I can use it with different types:

```ts
const name = getFirst(["Vivek", "Rahul"]);

const age = getFirst([20, 21, 22]);

const loggedIn = getFirst([true, false]);
```

TypeScript automatically determines `T`.

```text
["Vivek", "Rahul"]
        ↓
     T = string
        ↓
    T[] = string[]
        ↓
 return type = string
```

For numbers:

```text
[20, 21, 22]
      ↓
   T = number
      ↓
  T[] = number[]
      ↓
return type = number
```

The same function works for different types while preserving the correct type.

---

# 5. Why Do I Check for an Empty Array?

My TypeScript configuration contains:

```json
"noUncheckedIndexedAccess": true
```

Because of this, TypeScript does not assume that:

```ts
items[0]
```

definitely exists.

It can consider the result as:

```text
T | undefined
```

because this is possible:

```ts
getFirst([]);
```

But my function promises:

```ts
function getFirst<T>(items: T[]): T
```

So I need to handle the empty-array case:

```ts
if (items.length === 0) {
    throw new Error("Array is empty");
}
```

After this check, TypeScript knows that an element exists.

```text
T | undefined
      ↓
Check array is not empty
      ↓
      T
      ↓
   return T
```

This is a good example of TypeScript forcing me to handle a real runtime edge case.

---

# 6. Why Generics Are Better Than `any`

I could write:

```ts
function getFirst(items: any[]): any {
    return items[0];
}
```

This is flexible, but I lose useful type information.

With `any`:

```text
any[]
  ↓
Anything is allowed
  ↓
Type information can be lost
```

With Generics:

```text
T[]
  ↓
Different types are allowed
  ↓
Actual type is remembered
  ↓
Type safety is preserved
```

For example:

```ts
function getFirst<T>(items: T[]): T {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
}

const name = getFirst(["Vivek", "Rahul"]);
const age = getFirst([20, 21, 22]);
```

TypeScript knows:

```text
name → string
age  → number
```

So Generics give me flexibility without throwing away type information.

---

# 7. Generic Arrow Functions

Generics also work with arrow functions.

A normal generic function:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Can be written as an arrow function:

```ts
const getValue = <T>(value: T): T => {
    return value;
};
```

I can use it with different types:

```ts
const name = getValue("Vivek");
const age = getValue(20);
const isLoggedIn = getValue(true);
```

TypeScript determines `T` from the argument.

```text
getValue("Vivek")
       ↓
    T = string

getValue(20)
       ↓
    T = number

getValue(true)
       ↓
    T = boolean
```

Only the function syntax changed. The Generic concept is the same.

---

# 8. Anatomy of a Generic Arrow Function

Consider:

```ts
const getValue = <T>(value: T): T => {
    return value;
};
```

Break it down:

```text
<T>
 ↓
Introduces a generic type parameter

value: T
 ↓
Parameter uses that type

: T
 ↓
Function returns the same type
```

The relationship is:

```text
Input
  ↓
  T
  ↓
Output
```

This relationship is what makes the function reusable and type-safe.

---

# 9. Generic Arrow Function With Arrays

Now I can combine:

* Generics
* Arrow functions
* Arrays

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

I can use the same function with different arrays:

```ts
const name = getFirst(["Vivek", "Rahul"]);

const age = getFirst([20, 21, 22]);

const loggedIn = getFirst([true, false]);
```

The type changes automatically:

```text
string[] → T = string → returns string

number[] → T = number → returns number

boolean[] → T = boolean → returns boolean
```

The function logic stays the same.

---

# 10. Explicitly Providing the Generic Type

TypeScript can usually infer `T` automatically.

For example:

```ts
const name = getFirst(["Vivek", "Rahul"]);
```

TypeScript understands:

```text
T = string
```

But I can also explicitly provide the type:

```ts
const name = getFirst<string>(["Vivek", "Rahul"]);

const age = getFirst<number>([20, 21, 22]);
```

Both forms are valid:

```ts
getFirst<string>(["Vivek", "Rahul"]);
```

and:

```ts
getFirst(["Vivek", "Rahul"]);
```

When the type is obvious, I usually let TypeScript infer it.

---

# 11. Multiple Generic Types

A function can have more than one generic type parameter.

```ts
const pair = <T, U>(first: T, second: U) => {
    return {
        first,
        second
    };
};
```

Now I can pass different types:

```ts
const result = pair("Vivek", 20);
```

TypeScript determines:

```text
first argument
     ↓
  "Vivek"
     ↓
  T = string

second argument
     ↓
     20
     ↓
  U = number
```

Therefore:

```ts
result.first  // string
result.second // number
```

`T` and `U` simply represent two different type placeholders.

---

# 12. Generic Functions With Different Arrays

I can create reusable functions that work with different arrays.

```ts
const printItems = <T>(items: T[]): void => {
    for (const item of items) {
        console.log(item);
    }
};
```

Now:

```ts
printItems(["Vivek", "Rahul"]);

printItems([10, 20, 30]);

printItems([true, false]);
```

The function logic does not change.

Only `T` changes:

```text
string[]  → T = string
number[]  → T = number
boolean[] → T = boolean
```

---

# 13. Type Inference With Generics

Most of the time, I do not need to manually tell TypeScript what `T` is.

Consider:

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};

const number = getFirst([10, 20, 30]);
```

TypeScript looks at:

```ts
[10, 20, 30]
```

and determines:

```text
T = number
```

Therefore:

```text
T[]
 ↓
number[]
 ↓
return type = number
```

This is **type inference**.

Generics and type inference work together to determine and preserve the correct type.

---

# 14. Generics + Type Inference

The complete flow is:

```text
Function call
      ↓
Value is passed
      ↓
TypeScript looks at the value
      ↓
TypeScript determines T
      ↓
T is used inside the function
      ↓
Return type is preserved
```

For example:

```ts
const firstName = getFirst(["Vivek", "Rahul"]);
```

Type flow:

```text
["Vivek", "Rahul"]
        ↓
     T = string
        ↓
    T[] = string[]
        ↓
 return type = string
        ↓
 firstName = string
```

The important idea is:

> Generics do not just allow different types. They allow TypeScript to remember which type is being used.

---

# 15. Generics With Arrays of Objects

Generics also work with arrays containing objects.

Suppose I have a `User` type:

```ts
type User = {
    name: string;
    age: number;
};
```

I can create an array:

```ts
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
```

Or:

```ts
const users: Array<User> = [
    {
        name: "Vivek",
        age: 20
    },
    {
        name: "Rahul",
        age: 21
    }
];
```

Both represent the same type:

```text
User[]
   ↓
Array<User>
   ↓
Array containing User objects
```

---

# 16. Generic Function With an Array of Objects

Now I can combine everything:

```ts
type User = {
    name: string;
    age: number;
};

const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
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
```

TypeScript understands:

```text
users
  ↓
User[]
  ↓
T = User
  ↓
getFirst() returns User
```

Therefore:

```ts
firstUser.name
firstUser.age
```

remain type-safe.

---

# 17. Why This Matters for Reusable Code

In real applications, I may work with many types:

```text
Users
Products
Orders
Payments
Posts
Comments
```

I might need the same operation for all of them.

Instead of writing separate functions, I can create one Generic function:

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

Then:

```text
User[]     → T = User
Product[]  → T = Product
Order[]    → T = Order
```

The function does not need to know the exact type beforehand.

It simply preserves the type I give it.

---

# 18. Common Mistakes

## Mistake 1 — Thinking `T` Is a Specific Type

`T` is not automatically `string`, `number`, or anything else.

It is a placeholder.

```ts
function getValue<T>(value: T): T {
    return value;
}
```

When I call:

```ts
getValue("Vivek");
```

then:

```text
T = string
```

When I call:

```ts
getValue(20);
```

then:

```text
T = number
```

So `T` depends on the current function call.

---

## Mistake 2 — Using `any` Immediately

When writing reusable code, I should ask:

```text
Can Generics preserve the type information here?
```

Instead of immediately using:

```ts
any
```

Generics are often more appropriate when there is a relationship between the input type and output type.

---

## Mistake 3 — Thinking `T[]` and `Array<T>` Are Different

They represent the same concept:

```text
T[]
   ↓
Array of T
```

and:

```text
Array<T>
   ↓
Array of T
```

Only the syntax is different.

---

## Mistake 4 — Overusing Explicit Generic Types

I can write:

```ts
getFirst<string>(["Vivek", "Rahul"]);
```

But if TypeScript already knows the type, this is enough:

```ts
getFirst(["Vivek", "Rahul"]);
```

I should understand both forms, but I do not need to manually specify the type when inference is clear.

---

## Mistake 5 — Ignoring Empty Arrays

With:

```json
"noUncheckedIndexedAccess": true
```

this can be a problem:

```ts
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

because:

```text
items[0]
   ↓
T | undefined
```

So I handle the empty case:

```ts
function getFirst<T>(items: T[]): T {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
}
```

---

# 19. Backend Connection

This becomes especially useful when I start building Node.js and Express backends.

Backend applications constantly work with collections of data:

```text
Database
   ↓
Users
Products
Orders
Payments
Posts
Comments
```

These can be represented as:

```ts
User[]
Product[]
Order[]
```

or:

```ts
Array<User>
Array<Product>
Array<Order>
```

Generic functions can then work with these different types while preserving the correct result type.

The basic idea is:

```text
Different data
      ↓
Generic function
      ↓
Typed result
      ↓
Type-safe backend code
```

I do not need advanced Generic patterns yet.

For now, the important thing is understanding how Generics make reusable code stay type-safe.

---

# 20. Where I Will See This in Real Projects

As I move toward Node.js and Express backend development, I can expect Generics around things such as:

* API responses
* Database results
* Reusable utility functions
* Repository functions
* Service functions
* Collections of objects
* Reusable data structures

The general pattern is:

```text
Data
 ↓
Generic Type
 ↓
Reusable Function / Structure
 ↓
Typed Result
```

This is why understanding Generics now will make later TypeScript backend code easier to read.

---

# 21. Execution Flow

For this function:

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

The execution and type flow is:

```text
Function call
      ↓
Array is passed
      ↓
TypeScript determines T
      ↓
T[] represents the array
      ↓
Function checks the array
      ↓
Function returns T
      ↓
Returned value keeps its type
```

Example:

```ts
const age = getFirst([20, 21, 22]);
```

Type flow:

```text
[20, 21, 22]
      ↓
   T = number
      ↓
  T[] = number[]
      ↓
Function returns T
      ↓
 age = number
```

---

# 22. My Mental Model

I want to remember Generics like this:

```text
                 Generic
                    ↓
             Type Placeholder
                    ↓
          ┌─────────┴─────────┐
          ↓                   ↓
       Function              Array
          ↓                   ↓
        T → T                T[]
          ↓                   ↓
     Type-safe           Type-safe
     reusable code       reusable code
```

For arrow functions:

```text
<T>
 ↓
Generic Type
 ↓
Arrow Function
 ↓
Reusable Function
 ↓
Type-safe Code
```

For generic arrays:

```text
T[]
 ↓
Array of some type T
 ↓
Type decided when used
 ↓
Actual type is preserved
```

---

# 23. What I Need To Remember

### `T[]`

Represents an array containing values of type `T`.

```ts
function print<T>(items: T[]) {
    // ...
}
```

### `Array<T>`

Another way to represent an array of `T`.

```ts
const names: Array<string> = ["Vivek", "Rahul"];
```

### Generic Arrow Function

```ts
const getValue = <T>(value: T): T => {
    return value;
};
```

### Generic Arrow Function With an Array

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

### Multiple Generic Types

```ts
const pair = <T, U>(first: T, second: U) => {
    return {
        first,
        second
    };
};
```

The main idea:

```text
Generics
   ↓
Reusable Code
   ↓
Different Types Can Be Used
   ↓
Actual Type Is Remembered
   ↓
Type Safety Is Preserved
```

---

# Self-Test

Before moving to the next lesson, I should be able to answer these without looking at my notes:

1. What is the difference between `T[]` and `Array<T>`?
2. What does `T` represent in a Generic function?
3. How do I create a Generic function that accepts an array?
4. How do I write a Generic arrow function?
5. How does TypeScript determine the value of `T`?
6. Why is a Generic better than `any` when I want to preserve type information?
7. Can a Generic function have multiple type parameters?
8. Can I use Generics with an array of objects?
9. When would I explicitly provide the Generic type?
10. Why does `items[0]` need special handling with `noUncheckedIndexedAccess`?
11. How could Generic arrays help me in backend development?

If I can write this without looking:

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

and explain why `T` changes for different calls, then I understand the main idea of this lesson.

---

# Key Takeaway

In the previous lesson, I learned **what Generics are**.

In this lesson, I learned how to use them with **arrays and arrow functions**.

```text
Generics
   ↓
Generic Functions
   ↓
Generic Arrays
   ↓
Generic Arrow Functions
   ↓
Type Inference
   ↓
Reusable + Type-Safe Code
```

The important syntax is:

```ts
Array<T>
```

and:

```ts
const functionName = <T>(value: T): T => {
    return value;
};
```

For arrays:

```ts
const getFirst = <T>(items: T[]): T => {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0];
};
```

The main idea I want to remember is:

> **Generics allow my arrays and functions to work with different types while preserving the actual type information.**

That gives me reusable code without giving up TypeScript's type safety.
