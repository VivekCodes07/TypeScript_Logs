# 10 — Intersection Types

## 1. Why Am I Learning This?

In the previous lesson, I learned about **Type Aliases** and how I can create reusable types.

For example:

```ts
type User = {
    id: number;
    name: string;
};
```

But sometimes I already have multiple types and I want to create a new type that contains the properties of **all of them**.

Instead of writing the same properties again, TypeScript gives me **Intersection Types**.

The main thing I want to understand in this lesson is:

> How can I combine multiple types into one type?

This is important because I will see this pattern frequently when working with larger TypeScript applications and backend code.

---

## 2. What Am I Going to Study?

In this lesson I am going to learn:

* What Intersection Types are
* The `&` operator
* Combining Type Aliases
* Combining object types
* Intersection vs Union
* Adding new properties to an existing type
* Intersections with functions
* What happens when types conflict
* Intersection Types vs Interface `extends`
* How intersections are useful in backend development

---

## 3. The Problem I Want to Solve

Suppose I already have two types:

```ts
type User = {
    id: number;
    name: string;
};

type Admin = {
    permissions: string[];
};
```

Now imagine I need a type for an **Admin User**.

The object needs:

```text
User properties
+
Admin properties
```

I could write everything again:

```ts
type AdminUser = {
    id: number;
    name: string;
    permissions: string[];
};
```

But this duplicates the existing type definitions.

If `User` changes later, I would have to update `AdminUser` manually.

Intersection Types solve this problem.

---

## 4. What Is an Intersection Type?

An Intersection Type combines two or more types into a single type.

The syntax is:

```ts
type NewType = TypeA & TypeB;
```

The `&` symbol means:

> The new type must satisfy TypeA **AND** TypeB.

For example:

```ts
type User = {
    id: number;
    name: string;
};

type Admin = {
    permissions: string[];
};

type AdminUser = User & Admin;
```

Now `AdminUser` contains the properties from both types.

```text
User
├── id
└── name

Admin
└── permissions

      ↓ &

AdminUser
├── id
├── name
└── permissions
```

---

## 5. Creating an Intersection Type

Now I can create an object using the combined type:

```ts
const admin: AdminUser = {
    id: 101,
    name: "Vivek",
    permissions: ["create", "delete"]
};
```

This works because the object satisfies both types.

If I leave out `permissions`:

```ts
const admin: AdminUser = {
    id: 101,
    name: "Vivek"
};
```

TypeScript gives an error because `AdminUser` also requires everything from `Admin`.

So I should remember:

> Intersection means I need to satisfy **all** the types being combined.

---

## 6. The `&` Operator

The most important syntax in this lesson is:

```ts
&
```

For example:

```ts
type A = {
    name: string;
};

type B = {
    age: number;
};

type C = A & B;
```

`C` now requires:

```ts
{
    name: string;
    age: number;
}
```

I can think of it as:

```text
A + B = A & B
```

But this is a **type-level combination**, not JavaScript object merging.

---

## 7. Intersection vs Union

I already learned Union Types, so this is where I need to clearly separate the two concepts.

### Union

```ts
type Value = string | number;
```

The `|` means:

```text
string OR number
```

The value can be one of them.

### Intersection

```ts
type AdminUser = User & Admin;
```

The `&` means:

```text
User AND Admin
```

The value must satisfy both.

### My Mental Comparison

```text
Union
A | B
↓
A OR B


Intersection
A & B
↓
A AND B
```

This is one of the most important things I need to remember from this lesson.

---

## 8. Combining Multiple Types

I am not limited to two types.

I can combine three or more types:

```ts
type User = {
    name: string;
};

type Employee = {
    employeeId: number;
};

type Developer = {
    language: string;
};

type DeveloperUser = User & Employee & Developer;
```

Now the object must contain all three:

```ts
const developer: DeveloperUser = {
    name: "Vivek",
    employeeId: 101,
    language: "TypeScript"
};
```

So:

```text
User
  +
Employee
  +
Developer
  ↓
DeveloperUser
```

---

## 9. Extending an Existing Type

I can also use an intersection when I want to add extra properties to an existing type.

For example:

```ts
type User = {
    id: number;
    name: string;
};

type AuthenticatedUser = User & {
    token: string;
};
```

Now `AuthenticatedUser` contains:

```text
User
├── id
├── name
└── token
```

Example:

```ts
const user: AuthenticatedUser = {
    id: 101,
    name: "Vivek",
    token: "abc123"
};
```

This pattern will become useful when I start working with backend authentication and request data.

---

## 10. Intersection with Functions

An intersection type can also be used as a function parameter.

```ts
type User = {
    name: string;
};

type Admin = {
    permissions: string[];
};

type AdminUser = User & Admin;

function printAdmin(user: AdminUser): void {
    console.log(user.name);
    console.log(user.permissions);
}
```

Now the function expects an object that satisfies both `User` and `Admin`.

```ts
printAdmin({
    name: "Vivek",
    permissions: ["create", "delete"]
});
```

The benefit is that the function gets a clearly defined structure.

---

## 11. What Happens When Types Conflict?

I also need to understand what happens when two types have the same property but different types.

For example:

```ts
type A = {
    value: string;
};

type B = {
    value: number;
};

type C = A & B;
```

Now TypeScript would need `value` to satisfy:

```text
string AND number
```

A normal value cannot satisfy both.

So this will not work:

```ts
const example: C = {
    value: "Hello"
};
```

This is an important point:

> Intersection does not mean "choose either type."

It requires the value to satisfy **both** types.

---

## 12. Intersection Is a Type-Level Concept

When I write:

```ts
type AdminUser = User & Admin;
```

TypeScript is not creating a new JavaScript object.

The intersection exists only for the **TypeScript type system**.

Its job is to tell TypeScript:

> This value must satisfy both of these structures.

So the flow is:

```text
Intersection Type
      ↓
TypeScript checks the structure
      ↓
TypeScript compiles the code
      ↓
JavaScript runs normally
```

There is no special `&` operation happening at runtime.

---

## 13. Intersection vs Interface `extends`

I am going to learn **Interfaces in the next lesson**, so I should already understand why `Intersection Types` and `extends` may look similar.

For example:

```ts
type User = {
    name: string;
};

type Admin = User & {
    permissions: string[];
};
```

An interface can express a similar structure:

```ts
interface Admin extends User {
    permissions: string[];
}
```

The concepts are related, but they are not exactly the same feature.

For now, my important mental model is:

```text
& 
→ Combine types


extends
→ Extend an interface
```

I will study Interfaces properly in the next lesson.

---

## 14. Why Is This Useful in Backend Development?

Intersection Types become useful when I need to combine information that already has its own type.

For example:

```text
User
+
Authentication
```

can become:

```ts
type AuthenticatedUser = User & {
    token: string;
};
```

Other examples could be:

```text
Product
+
Database information
```

or:

```text
Request data
+
User information
```

Instead of creating a completely new type and repeating properties, I can build on existing types.

This helps keep my types reusable.

---

## 15. Common Mistakes

### Mistake 1 — Confusing `&` with `|`

```ts
A | B
```

means:

```text
A OR B
```

while:

```ts
A & B
```

means:

```text
A AND B
```

---

### Mistake 2 — Thinking `&` merges JavaScript objects

```ts
type C = A & B;
```

This does not merge actual objects.

It combines their **type requirements**.

---

### Mistake 3 — Forgetting Properties From Both Types

If I have:

```ts
type C = A & B;
```

then my object must satisfy both `A` and `B`.

I cannot provide only the properties from `A`.

---

### Mistake 4 — Ignoring Conflicting Properties

If two types contain the same property with incompatible types, their intersection can become impossible to satisfy.

I should check the property definitions before combining types.

---

## 16. My Mental Model

I want to remember Intersection Types with one simple rule:

```text
& = AND
```

If I have:

```ts
type A = ...;
type B = ...;

type C = A & B;
```

I am saying:

> C must contain everything required by A AND everything required by B.

So:

```text
       A
       +
       B
       ↓
      A & B
       ↓
 Combined Type
```

---

## 17. Final Flow

```text
Type Aliases
     ↓
Create reusable types
     ↓
Need to combine existing types
     ↓
Use &
     ↓
Intersection Type
     ↓
Combined type must satisfy all requirements
```

And the most important comparison:

```text
| → OR
& → AND
```

---

## 18. Self-Test

Before moving to Interfaces, I should be able to answer:

1. What is an Intersection Type?
2. What does the `&` operator mean?
3. What is the difference between `|` and `&`?
4. How can I combine two Type Aliases?
5. Can I combine more than two types?
6. Can I add extra properties using an intersection?
7. What happens when two types have conflicting property types?
8. Does an Intersection Type create anything at runtime?
9. How can intersections be useful in backend development?
10. How is `&` different from interface `extends`?

If I can answer these questions and create a simple intersection type myself, I am ready for Interfaces.

---

## 19. Final Recap

* Intersection Types combine multiple types.
* The `&` operator is used for intersections.
* `A & B` means the value must satisfy **A AND B**.
* Intersection Types work especially well with object types.
* Multiple types can be combined.
* I can use intersections to build on existing types.
* Intersections are useful for combining related backend data.
* Conflicting properties can make an intersection impossible to satisfy.
* Intersection Types exist in the TypeScript type system and do not create runtime objects.
* `|` means **OR**.
* `&` means **AND**.

The main thing I need to remember:

> **Union = OR (`|`)**
> **Intersection = AND (`&`)**

Next, I will learn **Interfaces**, where I will be able to compare interface inheritance using `extends` with the intersection approach I learned here.
