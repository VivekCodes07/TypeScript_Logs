# Lesson 4 — Union Types and Type Narrowing

## What am I learning in this lesson?

In this lesson, I am learning how TypeScript allows a variable to have **more than one possible type** and how it safely figures out which type I am working with.

I will learn:

* Union Types
* The `|` operator
* Why Union Types are useful
* Type Narrowing
* `typeof`
* Equality checks
* `in`
* `instanceof`
* Why Union Types are safer than `any`

---

# 1. The Problem

Normally, I can give a variable one type:

let age: number = 20;

So TypeScript knows:

age → number

But sometimes a value can legitimately be different types.

For example, an ID might come from an API as either a number or a string:

let userId: number | string;

Now both are allowed:

userId = 101;
userId = "101";

This is where **Union Types** are useful.

---

# 2. What is a Union Type?

A Union Type means:

> This value can be one of several specified types.

The syntax is:

let variable: type1 | type2;

Example:

let userId: number | string;

This means:

userId
↓
number OR string

So:

userId = 101;       // valid
userId = "101";     // valid
userId = true;      // error

The `|` means **OR**.

---

# 3. Understanding the `|` Symbol

Consider:

let value: string | number;

I should read this as:

> `value` can contain a string OR a number.

It does NOT mean that the value contains both types at the same time.

At any particular moment, it has one actual runtime value.

For example:

value = "Hello";

Now the runtime value is a string.

Later:

value = 100;

Now the runtime value is a number.

---

# 4. Union Types with Functions

Union Types become more useful when working with functions.

function printId(id: string | number) {
console.log(id);
}

Now I can call:

printId("user101");
printId(101);

Both are valid.

But TypeScript only knows:

id → string OR number

It cannot assume that `id` is always a string.

So this can cause a problem:

function printId(id: string | number) {
console.log(id.toUpperCase());
}

Why?

Because:

string → has `toUpperCase()`
number → does not have `toUpperCase()`

TypeScript prevents me from making that assumption.

---

# 5. What is Type Narrowing?

Type Narrowing means:

> I give TypeScript some information that helps it reduce a Union Type to a more specific type.

Suppose:

let value: string | number;

Initially:

value
↓
string OR number

Now I check:

if (typeof value === "string") {
// here value is string
}

Inside this block, TypeScript knows:

value
↓
string | number
↓
typeof value === "string"
↓
value → string

This reduction is called **Type Narrowing**.

---

# 6. Narrowing with `typeof`

`typeof` is one of the most common ways to narrow primitive types.

Example:

function printValue(value: string | number) {

```
if (typeof value === "string") {
    console.log(value.toUpperCase());
} else {
    console.log(value.toFixed(2));
}
```

}

What does TypeScript understand?

Before the `if`:

value → string | number

Inside `if`:

value → string

Inside `else`:

value → number

So both operations become safe.

---

# 7. TypeScript is Tracking Possibilities

This is the mental model I want to remember.

Suppose:

function process(value: string | number) {

```
if (typeof value === "string") {
    // TypeScript knows value is string
} else {
    // TypeScript knows value is number
}
```

}

At the beginning:

value
↓
string | number

After checking:

typeof value === "string"

TypeScript removes the impossible possibility.

Inside `if`:

string | number
↓
string

Inside `else`:

string | number
↓
number

So narrowing is basically:

> **Use a condition to remove types that are no longer possible.**

---

# 8. Equality Checks

TypeScript can also narrow types using comparisons.

function check(value: string | number) {

```
if (value === "hello") {
    // value is "hello"
}
```

}

This becomes especially useful with literal unions.

Example:

let status: "success" | "error";

if (status === "success") {
console.log("Request completed");
} else {
console.log("Request failed");
}

TypeScript knows which possibility remains after the check.

---

# 9. Narrowing Objects with `in`

The `in` operator can help when different objects have different properties.

type User = {
name: string;
};

type Admin = {
name: string;
permissions: string[];
};

function printUser(user: User | Admin) {

```
if ("permissions" in user) {
    console.log(user.permissions);
} else {
    console.log(user.name);
}
```

}

TypeScript understands:

"permissions" exists
↓
Probably Admin
↓
user → Admin

Otherwise:

user → User

The important idea is that the property acts as a **clue for narrowing**.

---

# 10. Narrowing with `instanceof`

When working with classes, I can use `instanceof`.

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

function makeSound(animal: Dog | Cat) {

```
if (animal instanceof Dog) {
    animal.bark();
} else {
    animal.meow();
}
```

}

The flow is:

animal → Dog | Cat

`instanceof Dog`

```
    ↓
```

animal → Dog

Otherwise:

animal → Cat

---

# 11. Union Types vs `any`

These two may look similar, but they are completely different.

### Union

let value: string | number;

TypeScript knows:

value can ONLY be string or number.

So it protects me from invalid values.

### `any`

let value: any;

Now TypeScript basically says:

> I won't check this value normally.

So I can do almost anything with it.

That's why:

string | number

is much safer than:

any

A Union Type gives me **controlled flexibility**.

`any` gives me **uncontrolled flexibility**.

---

# 12. Union Types with Literal Values

A Union Type does not have to contain only broad types.

I can restrict a variable to specific values:

let direction: "left" | "right" | "up" | "down";

Now these are valid:

direction = "left";
direction = "up";

But:

direction = "diagonal";

is an error.

This is useful when I want to say:

> Only these specific values are allowed.

---

# 13. Important Mental Model

I want to remember Union Types like this:

let value: string | number;

At first, TypeScript knows:

value
↓
string OR number

Then I provide some evidence:

typeof value === "string"

TypeScript narrows it:

string | number
↓
string

So:

**Union Type = Possible Types**

**Narrowing = Removing Impossible Types**

That's the core idea of this lesson.

---

# 14. Compile-Time vs Runtime

This is important.

The actual value exists at runtime.

For example:

let value = "Hello";

JavaScript knows the runtime value is `"Hello"`.

But TypeScript's type analysis happens during development/compilation.

For:

function print(value: string | number) {

```
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

}

The `typeof` check actually runs at **runtime**.

But TypeScript uses that check during **compile-time analysis** to understand:

if block → string
else block → number

So there are two things happening:

Runtime:
`typeof value` actually checks the value.

Compile time:
TypeScript uses the check to narrow the type.

---

# 15. Common Mistake

I should not think:

> "Union Type means TypeScript doesn't know the type."

Instead:

> "Union Type means TypeScript knows a limited set of possible types."

For:

let value: string | number;

TypeScript knows:

Not anything
↓
Only string OR number

Then narrowing tells TypeScript which possibility I am currently dealing with.

---

# What I Should Remember

* A **Union Type** allows multiple possible types.
* The `|` symbol means **OR**.
* `string | number` means the value can be a string or a number.
* A Union does not mean the value contains both types simultaneously.
* TypeScript cannot use operations that are not valid for every possible type.
* **Type Narrowing** reduces a Union Type to a more specific type.
* `typeof` is commonly used for primitive types.
* Equality checks can also narrow types.
* `in` can narrow object types based on properties.
* `instanceof` can narrow class instances.
* Union Types provide controlled flexibility.
* `any` removes much of TypeScript's type safety.
* Literal Unions can restrict values to specific choices.

The main idea:

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

---

# Quick Self-Test

### 1. What does this mean?

let id: string | number;

**Answer:**

`id` can contain either a string or a number.

---

### 2. What does `|` mean?

**Answer:**

OR.

---

### 3. What is Type Narrowing?

**Answer:**

Using information from the code to reduce a Union Type to a more specific type.

---

### 4. What does TypeScript know here?

```ts
function test(value: string | number) {

    if (typeof value === "string") {
        // ?
    }
}
```

**Answer:**

Inside the `if`, TypeScript knows `value` is a `string`.

---

### 5. Why is this safer than `any`?

```ts
let value: string | number;
```

Because TypeScript still knows exactly which types are allowed.

With `any`, TypeScript largely stops checking the value.

---

# What I Learned From This Lesson

I learned that sometimes a value legitimately needs to support multiple types.

Instead of using `any`, I can explicitly describe those possibilities:

```ts
let value: string | number;
```

Then TypeScript knows:

```text
value
 ↓
string OR number
```

When I give TypeScript evidence about the actual type, it can **narrow** the possibilities.

```text
string | number
      ↓
typeof value === "string"
      ↓
string
```

So the core idea I want to remember is:

> **Union Types tell TypeScript what types are possible.**

> **Type Narrowing tells TypeScript which possibility I am currently working with.**

That is what allows me to have flexibility without losing type safety.

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
