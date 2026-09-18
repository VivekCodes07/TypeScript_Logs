# 09 — Type Aliases

## 1. Why Am I Learning This?

In the previous lesson, I learned how to describe the structure of an object directly:

```ts
const user: {
    id: number;
    name: string;
    email: string;
} = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};
```

This works perfectly for a small object.

But there is a problem.

What if I need the same object structure in multiple places?

For example:

```ts
const user1: {
    id: number;
    name: string;
    email: string;
} = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};

const user2: {
    id: number;
    name: string;
    email: string;
} = {
    id: 102,
    name: "Rahul",
    email: "rahul@example.com"
};
```

I am repeating the same object structure again and again.

This is where **Type Aliases** become useful.

Instead of writing the complete structure every time, I can give that type a name.

```ts
type User = {
    id: number;
    name: string;
    email: string;
};
```

Now I can simply use:

```ts
const user: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};
```

So my main reason for learning Type Aliases is:

> I want to create reusable names for types instead of repeating the same type definition everywhere.

---

# 2. What Am I Going to Study?

In this lesson, I am going to learn:

* What a Type Alias is
* The `type` keyword
* Creating custom types
* Using Type Aliases with objects
* Reusing the same type
* Type Aliases with primitive types
* Type Aliases with arrays
* Type Aliases with union types
* Optional properties inside Type Aliases
* `readonly` properties inside Type Aliases
* Type Aliases with functions
* Combining types
* Type Alias vs directly writing an object type
* How Type Aliases will help me in backend development

The main goal is:

> I should be able to create my own reusable types and understand where they are useful.

---

# 3. First Understand the Problem

Suppose I have many users.

Without a Type Alias:

```ts
const user1: {
    id: number;
    name: string;
    email: string;
} = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};

const user2: {
    id: number;
    name: string;
    email: string;
} = {
    id: 102,
    name: "Rahul",
    email: "rahul@example.com"
};
```

The object structure is the same.

I am just repeating it.

Instead, I can create a type:

```ts
type User = {
    id: number;
    name: string;
    email: string;
};
```

Now:

```ts
const user1: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};

const user2: User = {
    id: 102,
    name: "Rahul",
    email: "rahul@example.com"
};
```

Much cleaner.

---

# 4. What Is a Type Alias?

A Type Alias allows me to give a **name to a type**.

The basic syntax is:

```ts
type TypeName = type;
```

For example:

```ts
type Username = string;
```

Now I can use:

```ts
let username: Username = "Vivek";
```

Here:

```text
Username
    ↓
alias
    ↓
string
```

The alias does not create a new runtime value.

It is simply a reusable name for a type.

---

# 5. Type Alias for an Object

This is where Type Aliases become really useful.

I can create:

```ts
type User = {
    id: number;
    name: string;
    email: string;
};
```

Now I can use `User` anywhere I need that structure:

```ts
const user: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};
```

Another object can use the same type:

```ts
const anotherUser: User = {
    id: 102,
    name: "Rahul",
    email: "rahul@example.com"
};
```

I define the structure once and reuse it.

---

# 6. What Actually Happens?

When I write:

```ts
type User = {
    id: number;
    name: string;
};
```

I am not creating a JavaScript object.

There is no `User` object created at runtime.

I am only telling TypeScript:

```text
Whenever I use User as a type,
expect an object with:

id   → number
name → string
```

So:

```text
type User
    ↓
TypeScript only
    ↓
Describes a structure
```

The type information is used by TypeScript while checking my code.

---

# 7. Type Alias for Primitive Types

I can also create aliases for simple types.

```ts
type UserId = number;
type Username = string;
type IsActive = boolean;
```

Now I can write:

```ts
let userId: UserId = 101;
let username: Username = "Vivek";
let isActive: IsActive = true;
```

This can make the meaning of a value clearer.

Compare:

```ts
let id: number = 101;
```

with:

```ts
let userId: UserId = 101;
```

Both are still numbers.

But `UserId` tells me what that number represents.

---

# 8. Type Alias for Arrays

I can also create a type alias for an array.

```ts
type UserIds = number[];
```

Now:

```ts
const userIds: UserIds = [101, 102, 103];
```

I can also use:

```ts
type Names = string[];

const names: Names = [
    "Vivek",
    "Rahul",
    "Aman"
];
```

So Type Aliases are not limited to objects.

They can represent many different types.

---

# 9. Type Alias for Union Types

I already learned Union Types.

For example:

```ts
let value: string | number;
```

I can give this union a reusable name:

```ts
type StringOrNumber = string | number;
```

Now:

```ts
let value: StringOrNumber = "Vivek";

value = 100;
```

Both are allowed.

The alias is simply giving the union a name.

---

# 10. Type Aliases with Optional Properties

The concepts from the previous lesson still work inside a Type Alias.

For example:

```ts
type User = {
    id: number;
    name: string;
    phone?: string;
};
```

Here:

```text
id
↓
required

name
↓
required

phone?
↓
optional
```

Now this is valid:

```ts
const user: User = {
    id: 101,
    name: "Vivek"
};
```

And this is also valid:

```ts
const user: User = {
    id: 101,
    name: "Vivek",
    phone: "9876543210"
};
```

---

# 11. Type Aliases with `readonly`

I can also use `readonly` inside a Type Alias.

```ts
type User = {
    readonly id: number;
    name: string;
};
```

Now:

```ts
const user: User = {
    id: 101,
    name: "Vivek"
};
```

I can change:

```ts
user.name = "Rahul";
```

But I cannot change:

```ts
// user.id = 102;
```

because `id` is readonly.

So the rules I learned earlier still apply.

The only difference is that I am now storing the object structure inside a reusable Type Alias.

---

# 12. Nested Objects with Type Aliases

Type Aliases are especially useful when objects become bigger.

For example:

```ts
type Address = {
    city: string;
    pincode: number;
};

type User = {
    id: number;
    name: string;
    address: Address;
};
```

Now:

```ts
const user: User = {
    id: 101,
    name: "Vivek",
    address: {
        city: "Mohali",
        pincode: 140301
    }
};
```

This is much easier to understand than putting the entire nested structure inside one huge object type.

I can break a large structure into smaller meaningful types.

---

# 13. Type Aliases with Functions

I can also create a Type Alias for a function.

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

Here `Add` describes the function:

```text
Add
 ↓
takes two numbers
 ↓
returns a number
```

This becomes useful when I want multiple functions to follow the same structure.

I will understand function types more deeply in the next lessons.

---

# 14. Combining Types

Type Aliases can also be combined using unions.

For example:

```ts
type Admin = {
    id: number;
    name: string;
    role: "admin";
};

type User = {
    id: number;
    name: string;
    role: "user";
};
```

I can create another type:

```ts
type Account = Admin | User;
```

Now an `Account` can be either an `Admin` or a `User`.

This connects Type Aliases with the Union Types I already learned.

---

# 15. Type Alias vs Direct Object Type

I can describe an object directly:

```ts
const user: {
    id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};
```

Or I can create a Type Alias:

```ts
type User = {
    id: number;
    name: string;
};

const user: User = {
    id: 101,
    name: "Vivek"
};
```

The second approach becomes more useful when I need the same structure in multiple places.

So my mental model is:

```text
Small / one-time structure
        ↓
Direct object type can be enough

Reusable structure
        ↓
Create a Type Alias
```

---

# 16. Type Aliases Make Code Easier to Maintain

Imagine my backend has this user structure:

```ts
type User = {
    id: number;
    name: string;
    email: string;
};
```

I use it in many places:

```ts
const user: User = ...;
```

```ts
function getUser(): User {
    // ...
}
```

```ts
function printUser(user: User): void {
    // ...
}
```

Now if the structure changes, I have one central type definition.

For example, I add:

```ts
phone?: string;
```

Now every place using `User` understands that the type can contain an optional phone number.

This is one of the main reasons reusable types are valuable in larger applications.

---

# 17. Type Aliases in Backend Development

This is where I will start seeing the real value.

Imagine a backend application.

I might have:

```text
User
Product
Order
Cart
Address
Payment
```

Instead of repeatedly writing their structures, I can create types:

```ts
type User = {
    id: number;
    name: string;
    email: string;
};

type Product = {
    id: number;
    name: string;
    price: number;
};

type Order = {
    id: number;
    userId: number;
    total: number;
};
```

Then these types can be reused throughout my backend.

For example:

```text
Request
   ↓
Controller
   ↓
Service
   ↓
Database
   ↓
Response
```

The same data structures can be described consistently using TypeScript types.

This is one of the reasons I need to understand Type Aliases before moving deeper into backend TypeScript.

---

# 18. Type Alias vs Value

This is an important distinction.

A Type Alias:

```ts
type User = {
    name: string;
};
```

is a **type-level thing**.

An object:

```ts
const user: User = {
    name: "Vivek"
};
```

is a **runtime value**.

So:

```text
User
 ↓
TypeScript type
 ↓
Used for type checking


user
 ↓
JavaScript value
 ↓
Exists when the program runs
```

This distinction will become important when I start working with Node.js and TypeScript.

---

# 19. Everything Together

Here is a small example combining the concepts:

```ts
type Address = {
    city: string;
    pincode: number;
};

type User = {
    readonly id: number;
    name: string;
    email: string;
    phone?: string;
    address: Address;
};

const user: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com",
    address: {
        city: "Mohali",
        pincode: 140301
    }
};

console.log(user.name);
console.log(user.address.city);

user.name = "Rahul";

// user.id = 102; // Error because id is readonly
```

Now I am using:

```text
Type Alias
    ↓
Nested Type Alias
    ↓
readonly property
    ↓
Optional property
    ↓
Object typing
```

All the concepts are working together.

---

# 20. Common Mistakes

### Mistake 1 — Confusing a Type Alias with an object

```ts
type User = {
    name: string;
};
```

This does not create a user object.

It only describes a type.

---

### Mistake 2 — Forgetting the `type` keyword

Correct:

```ts
type User = {
    name: string;
};
```

Not:

```ts
User = {
    name: string;
};
```

---

### Mistake 3 — Giving the wrong type

```ts
type User = {
    age: number;
};

const user: User = {
    age: "20"
};
```

This is incorrect because `age` must be a number.

---

### Mistake 4 — Forgetting that aliases are reusable

If I repeatedly write:

```ts
{
    id: number;
    name: string;
    email: string;
}
```

in many places, I should ask myself:

> "Should I create a Type Alias for this?"

---

### Mistake 5 — Thinking Type Aliases exist at runtime

Type Aliases are used by TypeScript's type system.

They are not JavaScript objects or variables that I can use at runtime.

---

# 21. My Mental Model

I want to remember Type Alias like this:

```text
Type Alias
    ↓
Give a name to a type
    ↓
Reuse that type
    ↓
Avoid repeating type definitions
```

For example:

```ts
type User = {
    id: number;
    name: string;
};
```

Then:

```ts
const user1: User = {
    id: 101,
    name: "Vivek"
};

const user2: User = {
    id: 102,
    name: "Rahul"
};
```

So:

```text
type User
    ↓
Reusable blueprint for the type
    ↓
user1 / user2
    ↓
Actual objects
```

---

# 22. Final Flow

The complete idea is:

```text
Object Type
    ↓
I describe an object's structure
    ↓
Same structure starts repeating
    ↓
Create a Type Alias
    ↓
Give the type a meaningful name
    ↓
Reuse that type
    ↓
Use it with objects, arrays, unions, functions, etc.
    ↓
Cleaner and more maintainable TypeScript
    ↓
Useful for backend data structures
```

---

# 23. Self-Test

Before moving forward, I should be able to answer:

1. What is a Type Alias?
2. Why do I need Type Aliases?
3. What does the `type` keyword do?
4. How do I create an object Type Alias?
5. Can a Type Alias represent a primitive type?
6. Can I create an array Type Alias?
7. Can I create a Union Type Alias?
8. Can I use `?` inside a Type Alias?
9. Can I use `readonly` inside a Type Alias?
10. Can a Type Alias contain another Type Alias?
11. Can I create a Type Alias for a function?
12. What is the difference between a Type Alias and an actual object?
13. Why will Type Aliases be useful in backend development?

If I can explain these without looking at the notes, I understand the main purpose of Type Aliases.

---

# 24. Final Recap

The main thing I learned in this lesson is:

> A Type Alias lets me give a reusable name to a type.

The basic syntax is:

```ts
type User = {
    id: number;
    name: string;
};
```

Then I can reuse it:

```ts
const user: User = {
    id: 101,
    name: "Vivek"
};
```

I can also create aliases for:

```text
Primitive types
    ↓
Arrays
    ↓
Objects
    ↓
Union types
    ↓
Function types
```

And Type Aliases can be combined:

```ts
type Address = {
    city: string;
};

type User = {
    name: string;
    address: Address;
};
```

My final mental model:

```text
Object Type
    ↓
Useful structure
    ↓
Structure repeats
    ↓
Type Alias
    ↓
Give it a name
    ↓
Reuse it everywhere
    ↓
Less repetition
    ↓
Better type safety
```

Now I have moved from:

```text
"How do I type this object?"
```

to:

```text
"How do I create a reusable type
for this kind of data?"
```

That is the real purpose of **Type Aliases**.
