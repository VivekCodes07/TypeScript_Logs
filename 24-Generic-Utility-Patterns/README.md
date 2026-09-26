# Lesson 24 — Generic Utility Patterns

## Why Am I Learning This?

In the previous lesson, I learned how `keyof` and Generic Constraints can connect an object with its keys.

I learned:

```ts
keyof T
```

means:

```text
all keys of T
```

I also learned:

```ts
K extends keyof T
```

means:

```text
K must be a valid key of T
```

And:

```ts
T[K]
```

means:

```text
the type of property K inside T
```

For example:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Now I don't want to learn another complicated TypeScript feature immediately.

Instead, I want to use the generic concepts I already know to build a few **small reusable utility functions**.

The goal of this lesson is to understand how these patterns can actually be useful in real code.

---

# What Am I Going to Learn?

In this lesson I am going to practice:

```text
Generic Functions
      ↓
Generic Constraints
      ↓
keyof
      ↓
T[K]
      ↓
Reusable Utility Functions
```

I will build small utilities for things like:

* getting a property
* checking whether an object has a key
* getting multiple values
* updating a property
* working with arrays of objects
* creating reusable functions that work with different types

I am not trying to memorize utility functions.

I am trying to understand the **pattern behind them**.

---

# 1. Start With What I Already Know

I already know how to get a property safely:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

If I have:

```ts
type User = {
    name: string;
    age: number;
    email: string;
};
```

I can write:

```ts
getProperty(user, "name");
getProperty(user, "age");
```

The same function can work with different objects because `T` changes automatically.

---

# 2. Why Are These Called Utility Patterns?

A utility function is usually a small function that solves a common problem.

For example:

```ts
getProperty(user, "name");
```

Instead of writing the same property-access logic repeatedly, I can create one reusable function.

The important part is that the function should still keep TypeScript's type safety.

I don't want to solve the problem by using:

```ts
any
```

I want TypeScript to continue checking my types.

---

# 3. Generic Functions Should Preserve Type Information

One important thing I want to understand in this lesson is:

```text
Don't just make a function generic.

Make the generic function useful.
```

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

The type I pass in is preserved.

```ts
const name = getValue("Vivek");
const age = getValue(20);
```

So:

```text
"Vivek" → string
20      → number
```

This same idea is useful when creating utility functions.

---

# 4. Utility Pattern — Get a Property

I already learned this in Lesson 23:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

The important pattern is:

```text
T
↓
object

K extends keyof T
↓
valid key

T[K]
↓
type of that property
```

This is one of the most useful patterns I have learned so far.

---

# 5. Utility Pattern — Get Two Properties

I can extend the same idea:

```ts
function getTwoProperties<
    T,
    K1 extends keyof T,
    K2 extends keyof T
>(
    object: T,
    key1: K1,
    key2: K2
) {
    return {
        first: object[key1],
        second: object[key2]
    };
}
```

The important thing here is not the function itself.

The important thing is that I am reusing the same relationship:

```text
T = object

K1 = first valid key

K2 = second valid key
```

---

# 6. Utility Pattern — Update a Property

Now I want to try something slightly different.

Suppose I have:

```ts
type User = {
    name: string;
    age: number;
};
```

I want a function that updates one property.

The key should still be a valid key of the object.

The value should also match the type of that property.

This is where `T[K]` becomes even more useful.

For example:

```text
name → string
age  → number
```

So I should not be able to do:

```ts
updateProperty(user, "age", "twenty");
```

because `age` expects a number.

The generic relationship should help TypeScript catch this.

---

# 7. Utility Pattern — Work With Arrays

I also want to connect this lesson with what I learned earlier about Generics and arrays.

For example:

```ts
function getFirst<T>(items: T[]): T {
    if (items.length === 0) {
        throw new Error("Array is empty");
    }

    return items[0]!;
}
```

This function works with:

```ts
getFirst([10, 20, 30]);
```

and:

```ts
getFirst(["Vivek", "Rahul", "Aman"]);
```

The same generic pattern works with different types.

Now I want to combine this idea with objects.

---

# 8. Utility Pattern — Get a Property From Objects

Suppose I have:

```ts
type User = {
    name: string;
    age: number;
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
```

I may want a function that gets one property from every object.

For example:

```text
users
  ↓
"name"
  ↓
["Vivek", "Rahul"]
```

Or:

```text
users
  ↓
"age"
  ↓
[20, 21]
```

This is a good example of combining:

```text
Generics
+
Arrays
+
keyof
+
T[K]
```

---

# 9. What I Want to Understand

I don't want to simply copy these functions.

For every utility pattern, I want to ask:

```text
What does T represent?

What does K represent?

Why is K constrained?

Why am I using keyof?

Why am I using T[K]?

What type will TypeScript infer?
```

If I can answer these questions, I actually understand the pattern.

---

# 10. Connection With Previous Lessons

My Generic learning has progressed like this:

```text
Basic Generics
    ↓
Generic Arrays
    ↓
Generic Arrow Functions
    ↓
Generic Classes
    ↓
Generic Constraints
    ↓
keyof
    ↓
K extends keyof T
    ↓
T[K]
    ↓
Generic Utility Patterns
```

So this lesson is mainly about **using what I already learned**.

I am not starting from zero again.

---

# 11. What I Should Be Able to Do After This Lesson

After finishing this lesson, I should be able to create small generic utility functions that:

* work with different object types
* keep type safety
* restrict keys using `keyof`
* use `T[K]` when the value type depends on the selected key
* work with arrays of generic objects
* avoid unnecessary `any`
* preserve useful type information

Most importantly, I should be able to look at code like:

```ts
<T, K extends keyof T>
```

and understand what each part is doing instead of treating it as one complicated syntax.

---

# Final Mental Model

The main pattern I want to remember is:

```text
T
↓
The object/type I am working with

keyof T
↓
All valid keys of that object

K extends keyof T
↓
K must be one of those keys

T[K]
↓
The type of the selected property
```

And now I want to use this pattern to build **small reusable functions** instead of learning it only as theory.

That is the purpose of Lesson 24.
