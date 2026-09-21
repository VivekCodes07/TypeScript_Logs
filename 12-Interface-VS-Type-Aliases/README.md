# 12 — Interface vs Type Aliases

## 1. Why Am I Learning This?

In the previous lessons, I learned about **Type Aliases**, **Intersection Types**, and **Interfaces**.

I already know that a Type Alias can describe an object:

```ts
type User = {
    id: number;
    name: string;
};
```

And I also know that an Interface can describe the same kind of object:

```ts
interface User {
    id: number;
    name: string;
}
```

At first, these look almost identical.

So now I want to understand an important question:

> If both `type` and `interface` can describe objects, then what is actually different between them?

I don't want to simply memorize a list of differences.

I want to understand:

```text
What can Type do?
        ↓
What can Interface do?
        ↓
Where do they overlap?
        ↓
Where are they different?
        ↓
When would I actually use each one?
```

This is especially important because when I start working with real TypeScript projects and backend code, I will see both `type` and `interface`.

---

## 2. What Am I Going to Study?

In this lesson I am going to learn:

* How `type` and `interface` can both describe objects
* What a Type Alias actually represents
* What an Interface actually represents
* Type Aliases with primitive types
* Type Aliases with Union Types
* Type Aliases with Intersection Types
* Interfaces with `extends`
* Interface inheritance
* Multiple interface inheritance
* Interface declaration merging
* Function types using `type`
* Function structures using `interface`
* Interface vs Type Alias
* Interface vs Intersection Types
* When I am likely to see each one in backend development
* Common mistakes
* My mental model for `type` vs `interface`

---

## 3. Both Can Describe Objects

Let's start with the most important point.

A Type Alias can describe an object:

```ts
type User = {
    name: string;
    age: number;
};
```

An Interface can also describe an object:

```ts
interface User {
    name: string;
    age: number;
}
```

Now both can be used to create an object:

```ts
const user: User = {
    name: "Vivek",
    age: 20
};
```

So for a basic object structure:

```text
type
 ↓
Can describe an object

interface
 ↓
Can describe an object
```

This is why they can sometimes feel interchangeable.

But they are not exactly the same feature.

---

## 4. What Is a Type Alias?

I already learned Type Aliases in Lesson 09.

A Type Alias allows me to give a reusable name to a type.

For example:

```ts
type User = {
    name: string;
    age: number;
};
```

Now I can reuse `User`:

```ts
const user1: User = {
    name: "Vivek",
    age: 20
};

const user2: User = {
    name: "Rahul",
    age: 21
};
```

The important thing is that `type` is not limited to objects.

I can give names to many different kinds of types.

---

## 5. Type Alias for Primitive Types

For example:

```ts
type UserId = number;
```

Now:

```ts
let userId: UserId = 101;
```

I can also create:

```ts
type Username = string;

let username: Username = "Vivek";
```

So:

```text
type
 ↓
Can name an object type
Can name a primitive type
Can name a union
Can name an intersection
Can name a function type
Can name a tuple
```

This makes `type` a general-purpose way of giving a name to a type.

---

## 6. Type Alias with Union Types

This is another important difference.

I can create a Union Type using `type`:

```ts
type Status = "success" | "error" | "loading";
```

Now:

```ts
let status: Status = "success";

status = "loading";
```

But this is not allowed:

```ts
// status = "failed";
```

because `"failed"` is not part of the `Status` type.

So:

```text
type Status

        ↓

"success" | "error" | "loading"

        ↓

One of these values
```

This is one of the areas where Type Aliases are very useful.

---

## 7. Type Alias with Intersection Types

I already learned Intersection Types in Lesson 10.

Suppose I have:

```ts
type User = {
    name: string;
};

type Employee = {
    employeeId: number;
};
```

I can combine them:

```ts
type Developer = User & Employee;
```

Now `Developer` requires properties from both types.

```ts
const developer: Developer = {
    name: "Vivek",
    employeeId: 101
};
```

My previous mental model was:

```text
& = AND
```

So:

```text
User & Employee
        ↓
Must satisfy User
        AND
Must satisfy Employee
```

This is another reason `type` is useful for composing different types.

---

## 8. Interface

I learned Interfaces in the previous lesson.

An Interface mainly describes the structure of an object.

For example:

```ts
interface User {
    name: string;
    age: number;
}
```

Then:

```ts
const user: User = {
    name: "Vivek",
    age: 20
};
```

The Interface tells TypeScript:

> An object using this interface should follow this structure.

So my basic mental model is:

```text
Interface
    ↓
Object structure
    ↓
Reusable contract
```

---

## 9. Interface with Optional and Readonly Properties

Interfaces can also use the features I already learned.

For example:

```ts
interface User {
    readonly id: number;
    name: string;
    phone?: string;
}
```

Here:

```text
id
 ↓
required + readonly

name
 ↓
required

phone
 ↓
optional
```

This is one reason Interfaces are useful for describing structured objects.

---

## 10. Extending Interfaces

One important feature of Interfaces is `extends`.

Suppose I already have:

```ts
interface User {
    id: number;
    name: string;
}
```

Now I want an Admin to contain everything from `User` plus some additional properties.

I can write:

```ts
interface Admin extends User {
    permissions: string[];
}
```

Now:

```ts
const admin: Admin = {
    id: 101,
    name: "Vivek",
    permissions: ["read", "write"]
};
```

The mental model is:

```text
User
│
├── id
└── name
        ↓
     extends
        ↓
Admin
│
├── id
├── name
└── permissions
```

I don't need to repeat `id` and `name`.

---

## 11. Extending Multiple Interfaces

An Interface can extend more than one Interface.

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

Now:

```ts
const developer: Developer = {
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
Developer properties
        ↓
Developer
```

This allows me to build larger object structures from smaller interfaces.

---

## 12. Interface vs Intersection Type

I already know Intersection Types.

Suppose:

```ts
interface User {
    name: string;
}

interface Admin {
    permissions: string[];
}
```

I can combine them using an Intersection Type:

```ts
type AdminUser = User & Admin;
```

This means:

```text
AdminUser
    ↓
must satisfy User
    AND
must satisfy Admin
```

I can also build a related Interface using `extends`:

```ts
interface AdminUser extends User {
    permissions: string[];
}
```

These can produce similar object structures.

But they are different TypeScript features.

My mental model is:

```text
A & B

    ↓

Intersection

    ↓

Combine type requirements
```

while:

```text
A extends B

    ↓

Interface inheritance

    ↓

Build an interface from another interface
```

I don't need to think of them as exactly the same thing.

I just need to understand what `&` and `extends` mean when I see them.

---

## 13. Type Alias for Functions

A Type Alias can describe a function type.

For example:

```ts
type Add = (a: number, b: number) => number;
```

Now I can create a function using that type:

```ts
const add: Add = (a, b) => {
    return a + b;
};
```

The function must follow the structure defined by `Add`.

So:

```text
Add
 ↓
takes number
takes number
 ↓
returns number
```

This is another example of how general-purpose `type` can be.

---

## 14. Interface with Functions

Interfaces can also describe callable structures.

For example:

```ts
interface Add {
    (a: number, b: number): number;
}
```

Then:

```ts
const add: Add = (a, b) => {
    return a + b;
};
```

Both approaches can describe a function.

So again:

```text
type
 ↓
Can describe function types

interface
 ↓
Can also describe callable structures
```

The syntax is different.

---

## 15. Declaration Merging

One important feature of Interfaces is **declaration merging**.

Suppose I write:

```ts
interface User {
    name: string;
}
```

Then later I write:

```ts
interface User {
    age: number;
}
```

TypeScript combines them.

So the resulting `User` behaves like:

```ts
interface User {
    name: string;
    age: number;
}
```

Now this is valid:

```ts
const user: User = {
    name: "Vivek",
    age: 20
};
```

The important concept is:

```text
Same Interface name
        ↓
Declared again
        ↓
TypeScript merges them
```

This is called:

> Declaration Merging

---

## 16. Type Aliases Do Not Work This Way

I cannot redeclare the same Type Alias like this:

```ts
type User = {
    name: string;
};

type User = {
    age: number;
};
```

TypeScript will give an error because `User` has already been declared as a type alias.

So:

```text
Interface
    ↓
Supports declaration merging

Type Alias
    ↓
Does not support declaration merging
```

This is an important difference to remember.

---

## 17. Interface vs Type Alias

Now I can compare the two.

### Type Alias

```ts
type User = {
    name: string;
};
```

A Type Alias can represent many kinds of types:

```ts
type UserId = number;

type Status = "active" | "inactive";

type User = {
    name: string;
};

type UserWithOrders = User & {
    orders: string[];
};
```

So:

```text
Type Alias

    ↓

General-purpose type definition

    ↓

Object
Primitive
Union
Intersection
Tuple
Function
etc.
```

### Interface

```ts
interface User {
    name: string;
}
```

Interfaces are mainly focused on object structures.

They also provide features such as:

```text
extends
declaration merging
```

So my basic mental model is:

```text
type

→ General-purpose type alias


interface

→ Mainly object structure
→ Can extend other interfaces
→ Supports declaration merging
```

---

## 18. Main Differences

I don't want to memorize this table without understanding the concepts, but it is useful as a quick reference.

| Feature              | Type Alias            | Interface                      |
| -------------------- | --------------------- | ------------------------------ |
| Object structure     | Yes                   | Yes                            |
| Primitive types      | Yes                   | No                             |
| Union Types          | Yes                   | Not directly                   |
| Intersection Types   | Yes                   | Uses `extends` for inheritance |
| Arrays               | Yes                   | Not the usual purpose          |
| Tuples               | Yes                   | Not the usual purpose          |
| Function types       | Yes                   | Yes                            |
| Optional properties  | Yes                   | Yes                            |
| `readonly`           | Yes                   | Yes                            |
| Extending            | `&`                   | `extends`                      |
| Multiple inheritance | Through intersections | Yes                            |
| Declaration merging  | No                    | Yes                            |

The main idea is not:

```text
type = better
```

or:

```text
interface = better
```

Instead:

```text
Both are useful.

They overlap in many situations.

But they have different capabilities.
```

---

## 19. Are Type Aliases and Interfaces the Same?

No.

But they overlap significantly.

For example:

```ts
type User = {
    name: string;
};
```

and:

```ts
interface User {
    name: string;
}
```

can describe the same object structure.

That does not mean they are the same TypeScript feature.

A better way to think about it is:

```text
Same possible object shape
        ≠
Same TypeScript feature
```

The difference becomes important when I start using:

```text
Union Types
Intersection Types
extends
Declaration Merging
Primitive aliases
Function types
```

---

## 20. Interfaces Do Not Create Runtime Objects

Just like Type Aliases, Interfaces belong to the TypeScript type system.

For example:

```ts
interface User {
    name: string;
}
```

This does not create a JavaScript object called `User`.

I still need:

```ts
const user: User = {
    name: "Vivek"
};
```

The Interface helps TypeScript check the object while developing.

So:

```text
Interface
    ↓
TypeScript type system
    ↓
Compile-time checking
    ↓
JavaScript
    ↓
Interface is removed
```

The same general idea applies to Type Aliases.

---

## 21. Why Does This Matter in Backend Development?

When I start building backend applications, I will work with many different types of data.

For example:

```text
User
Product
Order
Request
Response
Database document
API response
Authentication data
```

I may see Interfaces used for object contracts:

```ts
interface User {
    id: string;
    name: string;
    email: string;
}
```

And I may see Type Aliases for things such as:

```ts
type Status = "active" | "blocked";

type UserId = string;
```

Or:

```ts
type UserWithOrders = User & {
    orders: string[];
};
```

So understanding both means I won't get confused when a real TypeScript backend project uses one or the other.

---

## 22. Common Mistakes

### Mistake 1 — Thinking Interface is always better

I should not think:

```text
interface = better
type = worse
```

Both have different capabilities.

---

### Mistake 2 — Thinking Type Alias is only for objects

A Type Alias can represent:

```text
number
string
array
tuple
union
intersection
function
object
```

and more.

---

### Mistake 3 — Thinking Interface can replace every Type Alias

For example:

```ts
type Status = "active" | "blocked";
```

This is a natural use of a Type Alias.

I should understand that Interfaces are mainly focused on object structures.

---

### Mistake 4 — Confusing `extends` and `&`

```ts
interface Admin extends User {
    permissions: string[];
}
```

uses Interface inheritance.

While:

```ts
type Admin = User & {
    permissions: string[];
};
```

uses an Intersection Type.

They can produce similar structures, but they are different mechanisms.

---

### Mistake 5 — Thinking both exist at runtime

Neither Type Aliases nor Interfaces become normal JavaScript objects at runtime.

They are used by TypeScript for type checking.

---

## 23. My Mental Model

I want to remember `type` and `interface` like this:

```text
type

    ↓

Give a name to a type

    ↓

Can represent many kinds of types
```

While:

```text
interface

    ↓

Describe an object contract

    ↓

Can extend interfaces

    ↓

Can participate in declaration merging
```

A simple comparison:

```text
type

→ General-purpose
→ Object
→ Primitive
→ Union
→ Intersection
→ Tuple
→ Function


interface

→ Mainly object structure
→ extends
→ declaration merging
```

---

## 24. The Connection With What I Have Learned

My TypeScript learning so far now connects like this:

```text
Object Types
      ↓
Type Aliases
      ↓
Intersection Types
      ↓
Interfaces
      ↓
Interface vs Type
```

Each lesson adds another way of describing and combining types.

For example:

```text
Object Type

{
    name: string;
}
```

↓

```text
Type Alias

type User = {
    name: string;
};
```

↓

```text
Intersection

type Admin = User & {
    permissions: string[];
};
```

↓

```text
Interface

interface User {
    name: string;
}
```

↓

```text
Interface Extension

interface Admin extends User {
    permissions: string[];
}
```

Now I can see how these concepts are connected instead of learning each one separately.

---

## 25. Final Flow

```text
Need to describe a type
        ↓
Can I use a Type Alias?
        ↓
type User = ...
        ↓
Need an object contract?
        ↓
interface User
        ↓
Need to extend an Interface?
        ↓
extends
        ↓
Need to combine types?
        ↓
&
        ↓
Need a Union Type?
        ↓
type
```

The important thing is to understand what each feature is doing.

---

## 26. Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a Type Alias?
2. What is an Interface?
3. Can both describe object structures?
4. What can a Type Alias represent besides objects?
5. Can a Type Alias represent a Union Type?
6. Can a Type Alias represent an Intersection Type?
7. What does `extends` do?
8. Can an Interface extend multiple Interfaces?
9. What is declaration merging?
10. Which one supports declaration merging?
11. Can both use optional properties?
12. Can both use `readonly`?
13. How can I combine types using `&`?
14. What is the difference between `extends` and `&`?
15. Can an Interface create a JavaScript object at runtime?
16. Why might I see both `type` and `interface` in a backend project?
17. When would a Type Alias be useful for a Union Type?
18. What is my basic mental model for `type` vs `interface`?

If I can answer these and write both a Type Alias and an Interface myself, I understand the core idea of this lesson.

---

## 27. Final Recap

* Both `type` and `interface` can describe object structures.

* A Type Alias can represent many different kinds of types.

* Type Aliases can represent primitives.

* Type Aliases can represent Union Types.

* Type Aliases can represent Intersection Types.

* Type Aliases can represent function types and tuples.

* Interfaces are mainly used to describe object structures.

* Interfaces can use optional properties.

* Interfaces can use `readonly`.

* Interfaces can extend other Interfaces using `extends`.

* Interfaces can extend multiple Interfaces.

* Interfaces support declaration merging.

* Type Aliases do not support declaration merging.

* `&` is used for Intersection Types.

* `extends` is used for Interface inheritance.

* Interfaces and Type Aliases are TypeScript type-system features.

* They do not create normal JavaScript objects at runtime.

The main thing I need to remember:

> **Type Alias = a general-purpose name for a type.**

And:

> **Interface = a reusable contract for the structure of an object.**

And when I see:

```ts
interface Admin extends User
```

I should think:

```text
Build Admin from User
```

While:

```ts
type Admin = User & Permissions
```

should make me think:

```text
Combine both type requirements
```
