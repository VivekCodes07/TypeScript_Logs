# Lesson 22 — Generic Constraints

## Why Am I Learning This?

In the previous lessons, I learned how Generics allow me to write reusable code that works with different types.

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here, `T` can represent different types:

```ts
getValue("Vivek");       // T = string
getValue(20);            // T = number
getValue(true);          // T = boolean
```

This is useful, but sometimes I don't want `T` to accept **every possible type**.

For example, suppose I want a function that uses `.length`.

I know that strings and arrays have `.length`, but numbers don't.

So I need a way to tell TypeScript:

```text
T can be different types

BUT

T must satisfy a specific requirement
```

This is called a **Generic Constraint**.

The keyword used for this is:

```ts
extends
```

---

# What Am I Going To Learn?

In this lesson, I am going to learn:

1. Why an unrestricted Generic can be a problem
2. What a Generic Constraint means
3. How `<T extends Something>` works
4. How to constrain a Generic using object properties
5. How strings and arrays can satisfy the same constraint
6. How Generic Constraints work with classes
7. Why Generic Constraints are useful

---

# 1. The Problem With an Unrestricted Generic

Suppose I want to create a function that returns the length of a value.

I might write:

```ts
function getLength<T>(value: T): number {
    return value.length;
}
```

TypeScript gives me an error.

Why?

Because `T` could be **any type**.

For example:

```ts
getLength("Vivek");
```

A string has `.length`.

```ts
getLength([10, 20, 30]);
```

An array has `.length`.

But:

```ts
getLength(20);
```

A number does not have `.length`.

The problem is that TypeScript only knows:

```text
T = some type
```

It does not know:

```text
T has a length property
```

So I need to give TypeScript that information.

---

# 2. What Is a Generic Constraint?

A Generic Constraint puts a requirement on `T`.

For example:

```ts
<T extends { length: number }>
```

I can read this as:

```text
T can be different types

BUT

T must have a length property

AND

length must be a number
```

So now I can write:

```ts
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}
```

Now TypeScript knows that `.length` is available.

---

# 3. Understanding the Syntax

This syntax is the most important part of this lesson:

```ts
<T extends { length: number }>
```

Let's break it down.

### `<T>`

This creates a Generic Type Parameter.

```ts
<T>
```

means:

```text
I don't know the exact type yet.
```

---

### `extends`

Here, `extends` creates a **Generic Constraint**.

```ts
<T extends Something>
```

means:

```text
T can be different types,
but T must satisfy Something.
```

---

### `{ length: number }`

This is the requirement.

It says:

```text
The type must have:

length: number
```

So:

```ts
<T extends { length: number }>
```

really means:

```text
T
 ↓
can be different types
 ↓
but must have length
 ↓
and length must be a number
```

---

# 4. Does It Mean T Must Be an Object?

Not exactly.

This is an important point.

When I write:

```ts
<T extends { length: number }>
```

I am **not** saying:

```text
T must be an object
```

I am saying:

```text
T must have a length property
and that property must be a number.
```

For example, a string satisfies the requirement:

```text
string
  ↓
has length
  ↓
length is number
  ↓
allowed
```

An array also satisfies it:

```text
number[]
  ↓
has length
  ↓
length is number
  ↓
allowed
```

A normal object can satisfy it too:

```ts
const data = {
    length: 5,
    value: "Hello"
};
```

It has:

```ts
length: number
```

so it satisfies the constraint.

But:

```ts
getLength(20);
```

doesn't work because `number` does not have `length`.

### The rule is:

> **T does not need to be a specific type. T only needs to satisfy the constraint.**

---

# 5. Using the Constraint

Now I can safely write:

```ts
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}
```

These work:

```ts
console.log(getLength("Vivek"));

console.log(getLength([10, 20, 30]));

console.log(getLength({
    length: 5,
    value: "Hello"
}));
```

But this does not:

```ts
// getLength(20);
```

Because:

```text
number
  ↓
does not have length
  ↓
does not satisfy the constraint
  ↓
TypeScript error
```

---

# 6. Constraint With an Object Property

I can create other constraints too.

For example:

```ts
function printName<T extends { name: string }>(value: T): string {
    return value.name;
}
```

Now TypeScript knows:

```text
T must have:

name: string
```

So this works:

```ts
const user = {
    name: "Vivek",
    age: 20
};

console.log(printName(user));
```

The object has:

```ts
name: string
```

It also has:

```ts
age: number
```

That's completely fine.

The constraint does **not** say that `T` must contain only `name`.

It only says that `name` must exist.

So I can think of it as:

```text
Required:
    name: string

Extra properties:
    allowed
```

---

# 7. Generic Constraints With Classes

The same idea can be used with Generic Classes.

First, I create the requirement:

```ts
type HasName = {
    name: string;
};
```

Now I can constrain my class:

```ts
class UserStorage<T extends HasName> {

    items: T[];

    constructor(items: T[]) {
        this.items = items;
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    printNames(): void {
        for (const item of this.items) {
            console.log(item.name);
        }
    }
}
```

The important part is:

```ts
T extends HasName
```

This means:

```text
T can be different types

BUT

T must have name: string
```

Because of this constraint, TypeScript allows:

```ts
item.name
```

inside the class.

---

# 8. Using the Generic Class

I can create a `Student` type:

```ts
type Student = {
    name: string;
    age: number;
};
```

Then:

```ts
const students = new UserStorage<Student>([
    {
        name: "Vivek",
        age: 20
    },
    {
        name: "Rahul",
        age: 21
    }
]);
```

Here:

```text
UserStorage<Student>
        ↓
T = Student
        ↓
Student satisfies HasName
        ↓
allowed
```

I can also use another type:

```ts
type Employee = {
    name: string;
    salary: number;
};
```

And:

```ts
const employees = new UserStorage<Employee>([
    {
        name: "Karan",
        salary: 60000
    }
]);
```

I don't need two separate classes.

I have:

```text
UserStorage<Student>

UserStorage<Employee>
```

Both work because both types have:

```ts
name: string
```

---

# 9. Generic Constraint With Arrays

I can also constrain `T` to be an array.

```ts
function getFirst<T extends unknown[]>(items: T): T[0] {
    return items[0];
}
```

Here:

```ts
T extends unknown[]
```

means:

```text
T must be an array
```

So:

```ts
getFirst([10, 20, 30]);

getFirst(["Vivek", "Rahul"]);
```

are allowed.

The exact array type can still be different.

```text
T = number[]

or

T = string[]
```

The constraint only guarantees:

```text
T is an array
```

---

# 10. Normal Generic vs Constrained Generic

### Normal Generic

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here:

```text
T can be almost anything
```

So all of these are valid:

```ts
getValue("Vivek");
getValue(20);
getValue(true);
getValue([10, 20, 30]);
```

---

### Constrained Generic

```ts
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}
```

Now:

```text
T can still be different types

BUT

T must have length: number
```

So:

```ts
getLength("Vivek");
getLength([10, 20, 30]);
```

work.

But:

```ts
// getLength(20);
```

doesn't.

---

# 11. Generic Constraints Do Not Remove Generics

A constraint does **not** make a Generic fixed to one type.

For example:

```ts
<T extends { length: number }>
```

still allows:

```text
string
number[]
tuple
object with length
```

as long as they satisfy:

```ts
{
    length: number
}
```

So:

```text
Generic
    ↓
Different types can be used

Constraint
    ↓
Controls which types are allowed
```

Together:

```text
Generic + Constraint
        ↓
Reusable code
        +
Type safety
```

---

# 12. `extends` in Classes vs Generics

I have already seen `extends` in class inheritance:

```ts
class Car extends Vehicle {
}
```

Here:

```text
extends = inheritance
```

But:

```ts
<T extends HasName>
```

is different.

Here:

```text
extends = Generic Constraint
```

So I should not confuse the two.

```text
class Car extends Vehicle
        ↓
Inheritance


<T extends HasName>
        ↓
Generic Constraint
```

The keyword is the same, but the purpose is different.

---

# 13. Connection With Previous Lessons

My Generics progression so far is:

```text
Generic Functions
        ↓
Generic Arrays
        ↓
Generic Arrow Functions
        ↓
Generic Classes
        ↓
Generic Constraints
```

The progression makes sense:

```text
First:

T can represent different types

        ↓

Then:

I use T with arrays, functions and classes

        ↓

Now:

I control which types are allowed

        ↓

T extends Something
```

---

# 14. Why This Is Useful for Backend Development

Generic Constraints are useful when I need reusable code but still need certain properties to exist.

For example, suppose my function needs an `id`:

```ts
function processData<T extends { id: number }>(data: T): void {
    console.log(data.id);
}
```

Now I know that every type passed to this function has:

```ts
id: number
```

The actual type can still be different:

```text
User
Product
Order
Database record
API data
```

This is useful because I get both:

```text
Reusable Generic Code
        +
Known Required Properties
        =
Type-safe reusable code
```

---

# 15. Common Mistake

A common mistake is writing:

```ts
function getLength<T>(value: T) {
    return value.length;
}
```

and expecting TypeScript to know that every `T` has `.length`.

It doesn't.

`T` could be:

```text
number
boolean
object
string
array
```

So TypeScript cannot safely allow:

```ts
value.length
```

The solution is to tell TypeScript what `T` must have:

```ts
<T extends { length: number }>
```

---

# 16. Mental Model

This is the main mental model I want to remember.

### Normal Generic

```text
<T>

    ↓

T can be many different types

    ↓

No specific requirement
```

### Constrained Generic

```text
<T extends Something>

    ↓

T can still be many different types

    ↓

But T must satisfy Something
```

For example:

```ts
<T extends { length: number }>
```

means:

```text
T
 ↓
Can be different types
 ↓
Must have length
 ↓
length must be a number
```

---

# 17. Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a Generic Constraint?
2. Why do we use `extends` with Generics?
3. What does `<T extends { length: number }>` mean?
4. Does this syntax mean that `T` must be an object?
5. Why does `getLength("Vivek")` work?
6. Why does `getLength([10, 20, 30])` work?
7. Why does `getLength(20)` fail?
8. What is the difference between `<T>` and `<T extends Something>`?
9. How can a Generic Constraint be used with a class?
10. What is the difference between `extends` in inheritance and Generic Constraints?

---

# Key Takeaway

The most important syntax from this lesson is:

```ts
<T extends Something>
```

I should read it as:

```text
T can be different types

BUT

T must satisfy Something
```

For example:

```ts
function getLength<T extends { length: number }>(value: T): number {
    return value.length;
}
```

I am telling TypeScript:

```text
"I don't know exactly what T is,

but I know that T must have
length: number."
```

So Generic Constraints give me:

```text
Generics
    ↓
Flexibility

Constraints
    ↓
Control + Type Safety
```

That is the main idea I need to understand before moving to more advanced Generic patterns.
