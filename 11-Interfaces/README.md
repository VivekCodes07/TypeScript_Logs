# 11 — Interfaces

## 1. Why Am I Learning This?

I already know how to describe object structures using **Type Aliases**.

For example:

```ts
type User = {
    id: number;
    name: string;
};
```

I also learned **Intersection Types**, where I can combine existing types using `&`.

Now I want to learn another important TypeScript feature for describing object structures:

**Interfaces**

Interfaces are especially common when working with larger TypeScript projects and backend code.

The main goal of this lesson is to understand:

> How can I define the structure of an object using an Interface, and how is it different from a Type Alias?

---

## 2. What Am I Going to Study?

In this lesson I am going to learn:

* What Interfaces are
* Basic Interface syntax
* Required properties
* Optional properties
* `readonly` properties
* Using interfaces with functions
* Nested interfaces
* Extending interfaces using `extends`
* Extending multiple interfaces
* Interface vs Type Alias
* Interface vs Intersection Types
* How Interfaces are useful in backend development
* Common mistakes
* My mental model for Interfaces

---

## 3. What Is an Interface?

An Interface describes the **structure of an object**.

It tells TypeScript:

> An object following this interface should have these properties and these types.

Example:

```ts
interface User {
    id: number;
    name: string;
    email: string;
}
```

Now I can create an object using the `User` interface:

```ts
const user: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};
```

TypeScript checks that the object follows the structure defined by `User`.

---

## 4. Basic Interface Syntax

The basic syntax is:

```ts
interface InterfaceName {
    property: type;
}
```

For example:

```ts
interface Student {
    name: string;
    age: number;
}
```

Now:

```ts
const student: Student = {
    name: "Vivek",
    age: 20
};
```

The interface does not create the object.

It only describes what the object should look like.

So I can think of it as:

```text
Interface
    ↓
Describes structure
    ↓
Object follows that structure
```

---

## 5. Required Properties

Properties inside an interface are required by default.

For example:

```ts
interface User {
    id: number;
    name: string;
}
```

This object is valid:

```ts
const user: User = {
    id: 101,
    name: "Vivek"
};
```

But this is not:

```ts
const user: User = {
    id: 101
};
```

The `name` property is missing.

So:

```text
property: type
      ↓
Required property
```

---

## 6. Optional Properties

Sometimes an object may or may not have a property.

I can make a property optional using `?`.

```ts
interface User {
    id: number;
    name: string;
    phone?: string;
}
```

Now both of these are valid:

```ts
const user1: User = {
    id: 101,
    name: "Vivek"
};

const user2: User = {
    id: 102,
    name: "Rahul",
    phone: "9876543210"
};
```

The `phone` property is optional.

So:

```text
phone?: string
      ↓
May or may not exist
```

I will study optional properties more deeply in the next lesson.

---

## 7. Readonly Properties

I can use `readonly` when I don't want a property to be reassigned after the object is created.

```ts
interface User {
    readonly id: number;
    name: string;
}
```

Now:

```ts
const user: User = {
    id: 101,
    name: "Vivek"
};

user.name = "Rahul";
```

This is allowed.

But:

```ts
// user.id = 102;
```

will produce an error.

The important thing is that `readonly` applies to the **property**, not the entire object.

---

## 8. `const` vs `readonly`

I should not confuse these two.

### `const`

```ts
const user = {
    name: "Vivek"
};

user.name = "Rahul";
```

This is allowed.

`const` prevents me from assigning a completely new object to `user`.

It does not automatically make the object's properties readonly.

### `readonly`

```ts
interface User {
    readonly id: number;
}
```

This prevents reassignment of the `id` property.

So:

```text
const
→ protects the variable binding

readonly
→ protects the property from reassignment
```

---

## 9. Nested Interfaces

An interface can use another interface.

For example:

```ts
interface Address {
    city: string;
    pincode: number;
}

interface User {
    name: string;
    address: Address;
}
```

Now:

```ts
const user: User = {
    name: "Vivek",
    address: {
        city: "Mohali",
        pincode: 140301
    }
};
```

The structure becomes:

```text
User
├── name
└── address
    ├── city
    └── pincode
```

This is useful when objects become more complex.

Instead of putting everything inside one huge interface, I can create smaller interfaces and connect them.

---

## 10. Interfaces with Functions

I can use an interface as the type of a function parameter.

```ts
interface User {
    name: string;
    age: number;
}

function printUser(user: User): void {
    console.log(user.name);
    console.log(user.age);
}
```

Now I can pass an object that follows the `User` interface:

```ts
printUser({
    name: "Vivek",
    age: 20
});
```

This is useful because the function knows exactly what kind of object it expects.

---

## 11. Extending Interfaces

One of the important features of Interfaces is `extends`.

Suppose I already have:

```ts
interface User {
    id: number;
    name: string;
}
```

Now I want an Admin to have all the properties of `User` plus some additional properties.

I can write:

```ts
interface Admin extends User {
    permissions: string[];
}
```

Now `Admin` contains:

```text
User
├── id
└── name

Admin
└── permissions
```

So an Admin object needs all three:

```ts
const admin: Admin = {
    id: 101,
    name: "Vivek",
    permissions: ["create", "delete"]
};
```

This allows me to reuse an existing interface instead of repeating its properties.

---

## 12. Extending Multiple Interfaces

An interface can extend more than one interface.

For example:

```ts
interface User {
    name: string;
}

interface Employee {
    employeeId: number;
}

interface Developer extends User, Employee {
    language: string;
}
```

Now `Developer` needs properties from all three:

```ts
const developer: Developer = {
    name: "Vivek",
    employeeId: 101,
    language: "TypeScript"
};
```

The mental model is:

```text
User
   +
Employee
   +
Developer properties
        ↓
    Developer
```

---

## 13. Interface vs Type Alias

I already learned Type Aliases, so this comparison is important.

### Type Alias

```ts
type User = {
    name: string;
};
```

### Interface

```ts
interface User {
    name: string;
}
```

For basic object structures, both can describe the shape of an object.

The difference becomes more noticeable when I use the features they are designed for.

### Type Alias

A Type Alias can represent many kinds of types:

```ts
type UserId = number;

type UserIds = number[];

type Status = "active" | "inactive";

type User = {
    name: string;
};
```

### Interface

Interfaces are mainly used to describe object structures:

```ts
interface User {
    id: number;
    name: string;
}
```

Interfaces also have `extends` for building related object structures.

So my basic mental model is:

```text
Type Alias
→ Can name many kinds of types


Interface
→ Mainly describes object structures
→ Can extend other interfaces
```

---

## 14. Interface vs Intersection Type

I just learned Intersection Types, so I can compare them here.

Suppose I have:

```ts
interface User {
    name: string;
}

interface Admin {
    permissions: string[];
}
```

I can combine them using an intersection:

```ts
type AdminUser = User & Admin;
```

Or I can use interface inheritance:

```ts
interface AdminUser extends User {
    permissions: string[];
}
```

Both can describe an object containing:

```text
name
permissions
```

But they are different TypeScript features.

My mental model:

```text
Intersection
A & B
→ Combine type requirements


extends
A extends B
→ Build an interface from another interface
```

I don't need to treat them as exactly the same thing.

I mainly need to understand when I see `&` versus `extends`.

---

## 15. Interfaces Do Not Create Runtime Objects

Just like Type Aliases, Interfaces are part of the TypeScript type system.

For example:

```ts
interface User {
    name: string;
}
```

This does not create a JavaScript object called `User`.

I still need to create the actual object:

```ts
const user: User = {
    name: "Vivek"
};
```

The interface helps TypeScript check the structure while developing.

The interface itself does not become a normal JavaScript object at runtime.

So:

```text
Interface
    ↓
TypeScript type system
    ↓
Compile-time checking
    ↓
JavaScript runs without the interface
```

---

## 16. Why Are Interfaces Useful in Backend Development?

Backend applications contain many objects whose structure needs to stay consistent.

For example:

```text
User
Product
Order
Request
Response
Database document
```

I can describe these structures using interfaces.

Example:

```ts
interface User {
    id: number;
    name: string;
    email: string;
}
```

Then different functions can use the same structure:

```ts
function createUser(user: User): void {
    // ...
}

function printUser(user: User): void {
    // ...
}
```

This gives me consistent types across my application.

When I start working with Node.js and Express using TypeScript, these concepts will become much more practical.

---

## 17. Common Mistakes

### Mistake 1 — Forgetting required properties

If I write:

```ts
interface User {
    name: string;
    age: number;
}
```

then both properties are required.

---

### Mistake 2 — Thinking `interface` creates an object

```ts
interface User {
    name: string;
}
```

This only describes a type.

It does not create a runtime object.

---

### Mistake 3 — Confusing `extends` with `&`

```ts
type Admin = User & {
    permissions: string[];
};
```

uses an **Intersection Type**.

```ts
interface Admin extends User {
    permissions: string[];
}
```

uses **Interface Extension**.

They can produce similar object structures, but they are different features.

---

### Mistake 4 — Confusing `const` and `readonly`

```ts
const user = {
    name: "Vivek"
};
```

does not make `user.name` readonly.

`readonly` is what controls property reassignment at the type level.

---

## 18. My Mental Model

I want to remember Interfaces like this:

```text
Interface
    ↓
Describes object structure
    ↓
Properties + their types
    ↓
Objects must follow that structure
```

Important syntax:

```text
property: type
→ Required


property?: type
→ Optional


readonly property: type
→ Cannot reassign


extends
→ Build a new interface from existing interface(s)
```

And the comparison I want to remember:

```text
type
→ General-purpose type alias


interface
→ Mainly object structure
```

---

## 19. Final Flow

```text
Object Structure
       ↓
Need a reusable structure
       ↓
Interface
       ↓
Define properties
       ↓
Optional / readonly when needed
       ↓
Use interface with objects and functions
       ↓
Use extends for related interfaces
```

And the bigger TypeScript flow I have learned so far:

```text
Object Types
     ↓
Type Aliases
     ↓
Intersection Types
     ↓
Interfaces
```

Each lesson builds on the previous one.

---

## 20. Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is an Interface?
2. Why do I use Interfaces?
3. How do I define an Interface?
4. What happens if a required property is missing?
5. How do I make a property optional?
6. What does `readonly` do?
7. What is the difference between `const` and `readonly`?
8. Can an Interface contain another Interface?
9. How do I use an Interface with a function?
10. What does `extends` do?
11. Can an Interface extend multiple Interfaces?
12. What is the difference between a Type Alias and an Interface?
13. What is the difference between `extends` and `&`?
14. Does an Interface exist as a JavaScript object at runtime?

If I can answer these and create a basic interface myself, I understand the core idea.

---

## 21. Final Recap

* An Interface describes the structure of an object.
* Properties are required by default.
* `?` makes a property optional.
* `readonly` prevents property reassignment.
* Interfaces can contain nested interfaces.
* Interfaces can be used as function parameter types.
* `extends` allows me to build one interface from another.
* An interface can extend multiple interfaces.
* Type Aliases are more general-purpose.
* Interfaces are mainly focused on object structures.
* Interfaces and Intersection Types can sometimes describe similar structures, but they use different mechanisms.
* Interfaces exist only in the TypeScript type system and do not create runtime objects.

The main thing I need to remember:

> **Interface = a reusable contract for the structure of an object.**

And:

> **`extends` = build an interface using another interface.**
