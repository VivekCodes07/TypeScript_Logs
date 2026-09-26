# Lesson 25 — TypeScript Utility Types

## Why Am I Learning This?

In the previous lessons, I learned how to create reusable generic utilities myself.

I learned things like:

```ts
keyof

T[K]

K extends keyof T
```

and I used them to create functions that work with different object types.

For example:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Now I want to learn one more useful part of TypeScript.

TypeScript already provides some **built-in utility types** that can transform an existing type into another type.

Instead of creating these patterns manually, I can use utility types that TypeScript already gives me.

This is especially useful when working with backend code because I will often have one main object type but need slightly different versions of it.

For example:

```text
User
  ↓
User for creating data
  ↓
User for updating data
  ↓
User for sending response
  ↓
User with only selected properties
```

Utility types help me create these variations without rewriting the whole type.

---

# What Am I Going To Learn?

In this lesson, I am going to learn:

1. `Partial<T>`
2. `Required<T>`
3. `Readonly<T>`
4. `Pick<T, K>`
5. `Omit<T, K>`
6. `Record<K, T>`

I don't want to just memorize their names.

For each one, I want to understand:

```text
What problem does it solve?

What does it do to my existing type?

How do I use it?

Where would I use it in backend development?
```

---

# 1. `Partial<T>`

## The Problem

Suppose I have a `User` type:

```ts
type User = {
    name: string;
    age: number;
    email: string;
};
```

Normally, when I create a `User`, I need all three properties:

```ts
const user: User = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};
```

But imagine I am updating the user.

Maybe the user only wants to change their name.

```ts
const updateUser = {
    name: "Rahul"
};
```

I don't want to force the update object to contain `age` and `email`.

I need a version of `User` where every property is optional.

That's what `Partial<T>` does.

## Using `Partial`

```ts
type UpdateUser = Partial<User>;
```

Now I can do:

```ts
const updateUser: UpdateUser = {
    name: "Rahul"
};
```

I can also provide multiple properties:

```ts
const updateUser: UpdateUser = {
    name: "Rahul",
    age: 21
};
```

Or even an empty object:

```ts
const updateUser: UpdateUser = {};
```

Because every property became optional.

So I can think:

```text
User
  ↓
Partial<User>
  ↓
All properties become optional
```

---

# 2. `Required<T>`

Now I want to understand the opposite situation.

Suppose I have:

```ts
type User = {
    name?: string;
    age?: number;
};
```

Both properties are optional.

So this is allowed:

```ts
const user: User = {};
```

But sometimes I want a version where all properties are required.

I can use:

```ts
type CompleteUser = Required<User>;
```

Now this is required:

```ts
const user: CompleteUser = {
    name: "Vivek",
    age: 20
};
```

So:

```text
Partial
  ↓
Makes properties optional

Required
  ↓
Makes properties required
```

I can remember them as opposites.

---

# 3. `Readonly<T>`

Now I want to learn how to make an object's properties read-only.

Suppose:

```ts
type User = {
    name: string;
    age: number;
};
```

I can create:

```ts
const user: Readonly<User> = {
    name: "Vivek",
    age: 20
};
```

Now TypeScript doesn't allow me to reassign its properties:

```ts
// user.age = 21;
```

The important thing I need to understand is that `Readonly<T>` changes how I can use the object through TypeScript's type system.

It doesn't mean the JavaScript object becomes magically immutable at runtime.

The main idea is:

```text
User
  ↓
Readonly<User>
  ↓
Properties cannot be reassigned through this type
```

---

# 4. `Pick<T, K>`

Now suppose my type has many properties:

```ts
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};
```

But I only need:

```text
id
name
```

I could create another type manually:

```ts
type UserPreview = {
    id: number;
    name: string;
};
```

But this repeats information I already have.

Instead, I can use `Pick`.

```ts
type UserPreview = Pick<User, "id" | "name">;
```

Now:

```ts
const user: UserPreview = {
    id: 1,
    name: "Vivek"
};
```

The important part is:

```ts
Pick<User, "id" | "name">
```

I am saying:

```text
Take User
   ↓
Pick these keys
   ↓
"id" and "name"
```

So I can remember:

```text
Pick
  ↓
Keep only the properties I select
```

---

# 5. `Omit<T, K>`

Now I want to do the opposite.

Suppose I have:

```ts
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};
```

Maybe I want a public version of the user.

I don't want to include the password.

Instead of selecting every property I want to keep, I can remove the property I don't want.

```ts
type PublicUser = Omit<User, "password">;
```

Now:

```ts
const user: PublicUser = {
    id: 1,
    name: "Vivek",
    email: "vivek@gmail.com"
};
```

So I can remember:

```text
Pick
  ↓
Keep selected properties

Omit
  ↓
Remove selected properties
```

This is very useful when creating API response types.

For example, I might have a database user:

```text
id
name
email
password
```

but I don't want to send:

```text
password
```

to the client.

---

# 6. `Record<K, T>`

Now I want to learn `Record`.

`Record` is useful when I know what keys an object should have and what type all those values should have.

For example:

```ts
type Role = "admin" | "user" | "guest";
```

I want an object where each role has a boolean value.

I can write:

```ts
type RolePermissions = Record<Role, boolean>;
```

Now:

```ts
const permissions: RolePermissions = {
    admin: true,
    user: true,
    guest: false
};
```

The basic pattern is:

```ts
Record<Keys, ValueType>
```

So:

```ts
Record<Role, boolean>
```

means:

```text
Keys:
admin | user | guest

Values:
boolean
```

Another simple example:

```ts
type UserId = "vivek" | "rahul" | "aman";

type UserStatus = Record<UserId, string>;
```

Now:

```ts
const status: UserStatus = {
    vivek: "online",
    rahul: "offline",
    aman: "online"
};
```

So I can think:

```text
Record
  ↓
Create an object type
  ↓
with specific keys
  ↓
and a specific value type
```

---

# 7. Comparing the Utility Types

At this point, I have learned several utility types.

I want to make sure I don't mix them up.

| Utility Type   | What it does                                      |
| -------------- | ------------------------------------------------- |
| `Partial<T>`   | Makes all properties optional                     |
| `Required<T>`  | Makes all properties required                     |
| `Readonly<T>`  | Prevents property reassignment                    |
| `Pick<T, K>`   | Keeps selected properties                         |
| `Omit<T, K>`   | Removes selected properties                       |
| `Record<K, T>` | Creates an object type from keys and a value type |

The easiest way for me to remember them is:

```text
Partial  → optional

Required → required

Readonly → read-only

Pick     → keep

Omit     → remove

Record   → keys + value type
```

---

# 8. Using Utility Types Together

The real usefulness starts when I combine them.

Suppose I have:

```ts
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};
```

For creating a user, I may want:

```ts
type CreateUser = Omit<User, "id">;
```

Because the database might generate the `id`.

For updating a user:

```ts
type UpdateUser = Partial<Omit<User, "id">>;
```

Now:

```text
User
  ↓
Remove id
  ↓
Omit<User, "id">
  ↓
Make everything optional
  ↓
Partial<...>
```

For sending a public user response:

```ts
type PublicUser = Omit<User, "password">;
```

Now I have different versions of the same base type without rewriting everything.

---

# 9. Connection With Generics

I should notice something important.

Most utility types use the same generic idea I have already learned.

For example:

```ts
Partial<User>
```

Here:

```text
User
  ↓
T
```

`Partial` receives a type and transforms it.

Similarly:

```ts
Pick<User, "name">
```

uses:

```text
T = User

K = "name"
```

This connects directly with what I learned earlier:

```text
Generics
    ↓
Type parameters
    ↓
keyof
    ↓
Generic constraints
    ↓
T[K]
    ↓
Utility types
```

So utility types are not completely new magic.

They are another practical way of working with the type system I have already learned.

---

# 10. Why This Matters for Backend Development

This is where I will probably use utility types the most.

Suppose I create a backend API with a `User` model.

I might have:

```ts
type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};
```

Then I can create different types for different parts of my application:

```ts
type CreateUser = Omit<User, "id">;

type UpdateUser = Partial<Omit<User, "id">>;

type PublicUser = Omit<User, "password">;
```

Now each part of my backend gets the type it actually needs.

I don't have to duplicate the same properties manually.

This is the main reason I am learning utility types.

---

# 11. What I Should Practice

For this lesson, I should create a few examples myself.

### Practice 1

Create:

```ts
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};
```

Then create:

```ts
Partial<Product>
```

and use it for an update object.

### Practice 2

Create a public version of `Product` using:

```ts
Pick
```

Keep only:

```text
name
price
```

### Practice 3

Create another version using:

```ts
Omit
```

Remove:

```text
id
```

### Practice 4

Create a `Readonly<Product>` object and try changing one property.

See the TypeScript error for myself.

### Practice 5

Create a `Record` where:

```text
keys = product categories

value = number
```

For example:

```ts
type Category = "laptop" | "phone" | "tablet";
```

---

# 12. Final Mental Model

I don't want to memorize utility types as random TypeScript features.

I want to understand the problem each one solves.

```text
I already have a type
        ↓
I need a slightly different version
        ↓
Use a Utility Type
        ↓
Transform the existing type
```

The important ones from this lesson are:

```text
Partial<T>
    ↓
Everything optional

Required<T>
    ↓
Everything required

Readonly<T>
    ↓
No property reassignment

Pick<T, K>
    ↓
Keep selected properties

Omit<T, K>
    ↓
Remove selected properties

Record<K, T>
    ↓
Specific keys with a specific value type
```

---

# Final TypeScript Roadmap

This lesson completes my planned TypeScript learning path.

My overall progression was:

```text
01. Introduction
        ↓
02. Setup and Compiler
        ↓
03. Type Annotations and Inference
        ↓
04. Union Types and Narrowing
        ↓
05. Type Assertions and Special Types
        ↓
06. Arrays, Tuples and Enums
        ↓
07. Functions
        ↓
...
        ↓
Generics
        ↓
Generic Classes
        ↓
Generic Constraints
        ↓
keyof
        ↓
T[K]
        ↓
Generic Utility Patterns
        ↓
25. Utility Types
```

I now have enough TypeScript knowledge for my main goal.

I don't need to keep learning TypeScript forever before starting backend development.

The purpose of this project was to make TypeScript comfortable enough that it doesn't become an obstacle while learning:

```text
Node.js
   ↓
Express
   ↓
MongoDB
   ↓
Backend APIs
   ↓
Full Stack Development
```

After this lesson, I will move back to backend development and start using TypeScript where it actually matters.
