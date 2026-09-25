# Lesson 4 — Union Types and Type Narrowing

## What am I learning in this lesson?

In the previous lessons, I learned how to give variables specific types.

```ts
let age: number = 20;
let username: string = "Vivek";
```

But sometimes a value can legitimately have more than one possible type.

For example, an ID might come from an API as either a number or a string.

```ts
let userId: number | string;
```

In this lesson, I am learning how to handle these situations safely.

I will learn:

* Union Types
* The `|` operator
* Union Types with functions
* Type Narrowing
* `typeof`
* Equality checks
* `in`
* `instanceof`
* Literal Unions
* Union Types vs `any`
* Compile-time and runtime behavior

---

# 1. The Problem

Normally, I give a variable one specific type.

```ts
let age: number = 20;
```

TypeScript knows:

```text
age → number
```

So this is allowed:

```ts
age = 25;
```

But this is not:

```ts
age = "25";
```

Because `age` is supposed to be a number.

But what if a value can legitimately be more than one type?

For example:

```ts
let userId: number | string;
```

Now both are valid:

```ts
userId = 101;
userId = "101";
```

This is where **Union Types** are useful.

---

# 2. What is a Union Type?

A Union Type means:

> This value can be one of several specified types.

The syntax is:

```ts
let variable: type1 | type2;
```

For example:

```ts
let userId: number | string;
```

I can read this as:

```text
userId
   ↓
number OR string
```

So:

```ts
userId = 101;       // valid
userId = "101";     // valid
userId = true;      // error
```

The `|` symbol means **OR**.

---

# 3. Understanding the `|` Symbol

Consider:

```ts
let value: string | number;
```

I should read this as:

> `value` can contain a string OR a number.

It does **not** mean that the value contains both types at the same time.

At runtime, the variable contains one actual value.

For example:

```ts
value = "Hello";
```

Now the current value is a string.

Later:

```ts
value = 100;
```

Now the current value is a number.

So:

```text
TypeScript type:

string | number

Actual value at one moment:

string
OR
number
```

---

# 4. Union Types with Functions

Union Types become especially useful with functions.

```ts
function printId(id: string | number) {
    console.log(id);
}
```

Now both calls are valid:

```ts
printId("user101");
printId(101);
```

Inside the function, TypeScript knows:

```text
id → string | number
```

But it cannot assume that `id` is always a string.

For example:

```ts
function printId(id: string | number) {
    console.log(id.toUpperCase());
}
```

This causes an error.

Why?

Because:

```text
string → has toUpperCase()
number → does not have toUpperCase()
```

Since `id` could be a number, TypeScript does not allow me to use a method that only exists on strings.

This is where **Type Narrowing** comes in.

---

# 5. What is Type Narrowing?

Type Narrowing means:

> Using information from the code to reduce a Union Type to a more specific type.

Suppose:

```ts
let value: string | number;
```

Initially:

```text
value
  ↓
string OR number
```

Now I check:

```ts
if (typeof value === "string") {
    // value is string here
}
```

TypeScript can now narrow the type:

```text
string | number
      ↓
typeof value === "string"
      ↓
string
```

This process is called **Type Narrowing**.

The basic idea is:

> Use a condition to remove types that are no longer possible.

---

# 6. Narrowing with `typeof`

`typeof` is one of the most common ways to narrow primitive types.

```ts
function printValue(value: string | number) {

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    } else {
        console.log(value.toFixed(2));
    }

}
```

Before the `if`:

```text
value → string | number
```

Inside the `if`:

```text
value → string
```

Inside the `else`:

```text
value → number
```

So TypeScript now allows:

```ts
value.toUpperCase();
```

inside the string branch and:

```ts
value.toFixed(2);
```

inside the number branch.

The condition gives TypeScript enough information to safely narrow the type.

---

# 7. The Mental Model of Narrowing

This is the most important idea I want to remember.

Suppose:

```ts
function process(value: string | number) {

    if (typeof value === "string") {
        // value is string
    } else {
        // value is number
    }

}
```

At the beginning:

```text
value
  ↓
string | number
```

After:

```ts
typeof value === "string"
```

TypeScript removes the impossible possibility.

Inside `if`:

```text
string | number
      ↓
    string
```

Inside `else`:

```text
string | number
      ↓
    number
```

So:

```text
Union
  ↓
Condition
  ↓
Narrowing
  ↓
Fewer possible types
```

---

# 8. Narrowing with Equality Checks

Equality checks can also help TypeScript narrow a type.

For example:

```ts
function check(value: string | number) {

    if (value === "hello") {
        console.log("It is hello");
    }

}
```

Inside the `if`, TypeScript knows that `value` must be the string `"hello"`.

Equality checks become especially useful with **Literal Unions**.

For example:

```ts
let status: "success" | "error";
```

Now:

```ts
if (status === "success") {
    console.log("Request completed");
} else {
    console.log("Request failed");
}
```

The condition tells TypeScript which possible value I am dealing with.

---

# 9. Narrowing Objects with `in`

The `in` operator can help narrow object types based on their properties.

For example:

```ts
type User = {
    name: string;
};

type Admin = {
    name: string;
    permissions: string[];
};
```

Now I can have:

```ts
function printUser(user: User | Admin) {

    if ("permissions" in user) {
        console.log(user.permissions);
    } else {
        console.log(user.name);
    }

}
```

The important part is:

```ts
"permissions" in user
```

TypeScript uses the property as a clue.

If `permissions` exists:

```text
User | Admin
     ↓
"permissions" exists
     ↓
Admin
```

Otherwise:

```text
User | Admin
     ↓
No permissions property
     ↓
User
```

So the `in` operator can be used to narrow object types based on their properties.

---

# 10. Narrowing with `instanceof`

When working with classes, I can use `instanceof`.

```ts
class Dog {

    bark() {
        console.log("Woof");
    }

}

class Cat {

    meow() {
        console.log("Meow");
    }

}
```

Now:

```ts
function makeSound(animal: Dog | Cat) {

    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }

}
```

Before the check:

```text
animal → Dog | Cat
```

After:

```ts
animal instanceof Dog
```

TypeScript knows:

```text
animal → Dog
```

And in the `else` branch:

```text
animal → Cat
```

So `instanceof` is useful when narrowing between class instances.

---

# 11. Literal Union Types

A Union Type does not have to contain only broad types like `string` or `number`.

I can also restrict a variable to specific values.

```ts
let direction: "left" | "right" | "up" | "down";
```

Now only these values are allowed:

```ts
direction = "left";
direction = "up";
direction = "right";
```

But this is an error:

```ts
direction = "diagonal";
```

Because `"diagonal"` is not part of the Union.

This is useful when I want to say:

> Only these specific values are allowed.

---

# 12. Union Types vs `any`

Union Types and `any` give very different levels of type safety.

## Union Type

```ts
let value: string | number;
```

TypeScript knows:

```text
value can only be:

string
OR
number
```

So TypeScript can still check what I am doing with the value.

## `any`

```ts
let value: any;
```

Now TypeScript largely stops checking the value.

I can do things that may not actually be valid at runtime.

That means:

```text
string | number
        ↓
Controlled flexibility
```

while:

```text
any
 ↓
Very little type checking
```

So when I know the possible types, a Union Type is much more useful than simply using `any`.

---

# 13. Compile-Time vs Runtime

This is an important distinction.

TypeScript performs type analysis during development and compilation.

But JavaScript code actually runs at runtime.

Consider:

```ts
function print(value: string | number) {

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }

}
```

The `typeof` check actually happens at **runtime**.

JavaScript checks the actual value:

```text
What is value right now?
        ↓
typeof value
        ↓
"string" / "number"
```

At the same time, TypeScript understands this check during **compile-time analysis** and uses it to narrow the type.

So:

```text
Runtime
    ↓
typeof actually checks the value

Compile time
    ↓
TypeScript uses that check for type narrowing
```

This is why `typeof` can both be a real JavaScript operation and a TypeScript narrowing tool.

---

# 14. Common Mistake

I should not think:

> "Union Type means TypeScript does not know the type."

Instead, I should think:

> "Union Type means TypeScript knows a limited set of possible types."

For:

```ts
let value: string | number;
```

TypeScript knows:

```text
Not anything
    ↓
Only string OR number
```

Then narrowing gives TypeScript more information.

```text
string | number
      ↓
condition
      ↓
string
```

So a Union Type does not remove type safety.

It gives me **controlled flexibility**.

---

# 15. Main Mental Model

This is the main flow I want to remember:

```text
Union Type
    ↓
Multiple possible types
    ↓
Type Guard / Condition
    ↓
Type Narrowing
    ↓
Fewer possible types
    ↓
Safer operations
```

For example:

```ts
let value: string | number;
```

Initially:

```text
string | number
```

Then:

```ts
if (typeof value === "string") {
```

TypeScript narrows it:

```text
string | number
      ↓
    string
```

The core idea is:

> **Union Type = Possible Types**

> **Narrowing = Removing Impossible Types**

---

# What I Should Remember

* A **Union Type** allows multiple possible types.
* The `|` symbol means **OR**.
* `string | number` means the value can be a string or a number.
* A Union does not mean the value contains both types at the same time.
* TypeScript cannot safely use an operation that is not available on every possible type.
* **Type Narrowing** reduces a Union Type to a more specific type.
* `typeof` is commonly used to narrow primitive types.
* Equality checks can also narrow types.
* `in` can narrow object types based on their properties.
* `instanceof` can narrow class instances.
* Literal Unions can restrict values to specific choices.
* Union Types provide controlled flexibility.
* `any` removes much of TypeScript's type safety.
* Narrowing allows me to safely work with the specific type I currently have.

---

# Quick Self-Test

## 1. What does this mean?

```ts
let id: string | number;
```

**Answer:**

`id` can contain either a string or a number.

---

## 2. What does `|` mean?

**Answer:**

OR.

---

## 3. What is Type Narrowing?

**Answer:**

Using information from the code to reduce a Union Type to a more specific type.

---

## 4. What does TypeScript know here?

```ts
function test(value: string | number) {

    if (typeof value === "string") {
        // ?
    }

}
```

**Answer:**

Inside the `if`, TypeScript knows that `value` is a `string`.

---

## 5. Why is this safer than `any`?

```ts
let value: string | number;
```

**Answer:**

Because TypeScript still knows exactly which types are allowed.

With `any`, TypeScript largely stops checking the value.

---

## 6. What type is `animal` inside this block?

```ts
function makeSound(animal: Dog | Cat) {

    if (animal instanceof Dog) {
        // ?
    }

}
```

**Answer:**

Inside the `if`, TypeScript knows that `animal` is a `Dog`.

---

# What I Learned From This Lesson

Sometimes a value legitimately needs to support multiple types.

Instead of using `any`, I can explicitly describe those possibilities:

```ts
let value: string | number;
```

TypeScript now knows:

```text
value
  ↓
string OR number
```

When I give TypeScript more information through a condition, it can narrow those possibilities.

```text
string | number
      ↓
typeof value === "string"
      ↓
string
```

So the main idea I want to remember is:

> **Union Types tell TypeScript what types are possible.**

> **Type Narrowing tells TypeScript which possibility I am currently working with.**

This gives me flexibility without giving up type safety.

---

# Next Lesson

## Lesson 5 — Type Assertions and Special Types

In the next lesson, I will learn:

* Type Assertions
* `as` syntax
* When Type Assertions are useful
* `unknown`
* `any`
* `never`
* `void`
* Why `unknown` is safer than `any`
* How TypeScript treats special types
