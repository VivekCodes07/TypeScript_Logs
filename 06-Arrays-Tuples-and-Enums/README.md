# 06 — Arrays, Tuples and Enums

## 1. Why Am I Learning This?

So far, I have mainly worked with individual values:

```ts
let username: string = "Vivek";
let age: number = 20;
let isLoggedIn: boolean = true;
```

But real applications don't work with only one value at a time.

In backend development, I will work with things like:

```text
users
products
orders
IDs
prices
roles
permissions
```

Most of this data will be stored in some kind of collection or structure.

For example:

```ts
let usernames = ["Vivek", "Rahul", "Aman"];
```

Now I have a few questions:

> How do I tell TypeScript what kind of values an array should contain?

> What if each position in a structure has a different meaning?

> What if I have a fixed set of possible choices like `admin`, `user`, or `manager`?

These problems lead to three important TypeScript features:

```text
Arrays
   ↓
Tuples
   ↓
Enums
```

The goal of this lesson is not to memorize three different syntaxes.

I want to understand **what problem each one solves and when I should use it.**

---

## 2. What Am I Going to Study?

In this lesson, I am going to learn:

* Typed arrays
* `string[]`, `number[]`, and `boolean[]`
* `Array<T>` syntax
* Array type inference
* Union arrays
* Tuples and positional types
* Tuple destructuring
* Tuples vs union arrays
* Enums
* Numeric and string enums
* Using enums as types
* When to use Arrays, Tuples, and Enums

By the end, I should be able to think:

```text
Collection?
    ↓
Array

Fixed structure?
    ↓
Tuple

Fixed named choices?
    ↓
Enum
```

---

# 3. Arrays in TypeScript

In JavaScript, I can create an array easily:

```ts
let names = ["Vivek", "Rahul", "Aman"];
```

TypeScript can automatically understand that this is an array of strings:

```text
names
  ↓
string[]
```

So this is allowed:

```ts
names.push("Karan");
```

But this is not:

```ts
names.push(100);
```

Why?

Because TypeScript has inferred that `names` should contain strings.

This gives me the first important idea:

> **A typed array tells TypeScript what kind of values are allowed inside the array.**

---

# 4. Creating Typed Arrays

The most common syntax is:

```ts
let names: string[] = ["Vivek", "Rahul", "Aman"];
```

The important part is:

```ts
string[]
```

It means:

> An array containing strings.

Similarly:

```ts
let ages: number[] = [18, 20, 22];

let isActive: boolean[] = [true, false, true];
```

So:

```text
string[]   → array of strings
number[]   → array of numbers
boolean[]  → array of booleans
```

The general syntax is:

```text
type[]
```

---

# 5. Why Does the Array Type Matter?

Suppose I have product prices:

```ts
let prices: number[] = [100, 200, 300];
```

If I accidentally write:

```ts
prices.push("500");
```

TypeScript will catch the mistake.

A price should be a number, so the array should not accept a string.

This is especially useful in backend development where arrays may contain:

* User IDs
* Product IDs
* Prices
* Database records
* Permissions

TypeScript helps me keep the data consistent.

---

# 6. TypeScript Can Infer Array Types

I don't always have to manually write the type.

For example:

```ts
let names = ["Vivek", "Rahul", "Aman"];
```

TypeScript understands:

```text
names → string[]
```

Similarly:

```ts
let numbers = [10, 20, 30];
```

TypeScript understands:

```text
numbers → number[]
```

This connects directly with what I learned in **Lesson 03 — Type Annotations and Type Inference**.

So I should not think:

> "I must manually type every array."

Instead:

> "If TypeScript already knows the type, inference can do the work for me."

---

# 7. `Array<T>` Syntax

There is another way to write an array type:

```ts
let names: Array<string> = ["Vivek", "Rahul"];
```

This means the same thing as:

```ts
let names: string[] = ["Vivek", "Rahul"];
```

I can think of it as:

```text
string[]
    =
Array<string>
```

For simple arrays, `string[]` is usually easier to read.

The important thing is that I recognize both forms when I see them in TypeScript code.

---

# 8. What If an Array Contains More Than One Type?

Sometimes an array is intentionally allowed to contain different types.

For example:

```ts
let values: (number | string | boolean)[] = [
    10,
    "Vivek",
    true
];
```

Here each element can be:

```text
number
string
boolean
```

So these are allowed:

```ts
values.push(50);
values.push("Hello");
values.push(false);
```

But this is not:

```ts
values.push({ name: "Vivek" });
```

because the object is not one of the allowed types.

This is called a **union array**.

The important thing is:

> A union array tells me which types are allowed, but it does not assign a different type to each position.

That difference becomes important when I learn tuples.

---

# 9. Why Do I Need Tuples?

Consider this:

```ts
let user: (number | string | boolean)[] = [
    101,
    "Vivek",
    true
];
```

This tells TypeScript:

> The array can contain numbers, strings, and booleans.

But it doesn't clearly describe what each position means.

Maybe I know:

```text
position 0 → user ID
position 1 → username
position 2 → account status
```

Now I want to describe that exact structure.

This is where a **tuple** becomes useful.

---

# 10. Understanding Tuples

A tuple allows me to specify the type of each position:

```ts
let user: [number, string, boolean] = [
    101,
    "Vivek",
    true
];
```

Now TypeScript understands:

```text
position 0 → number
position 1 → string
position 2 → boolean
```

So:

```ts
[number, string, boolean]
```

describes a specific positional structure.

The main idea:

> **A tuple is an array-like structure where the type of each position is defined.**

---

# 11. Why Does Position Matter?

Look at this:

```ts
let user: [number, string] = [101, "Vivek"];
```

I have defined:

```text
position 0 → number
position 1 → string
```

So this is correct:

```ts
[101, "Vivek"]
```

But this is incorrect:

```ts
["Vivek", 101]
```

Even though the same two types are present.

The problem is their positions.

I said:

```text
position 0 must be number
position 1 must be string
```

But I provided:

```text
position 0 → string
position 1 → number
```

So a tuple gives me more structure than a normal union array.

---

# 12. Tuple vs Union Array

This is one of the most important differences in this lesson.

### Union Array

```ts
let values: (number | string)[] = [101, "Vivek"];
```

This means:

> The array can contain numbers or strings.

The positions are not fixed.

For example, this is also valid:

```ts
["Vivek", 101]
```

### Tuple

```ts
let user: [number, string] = [101, "Vivek"];
```

This means:

> Position 0 must be a number and position 1 must be a string.

So:

```text
Union Array
    ↓
Allowed types matter

Tuple
    ↓
Allowed types + positions matter
```

This is the key difference I need to remember.

---

# 13. Accessing Tuple Values

Because TypeScript knows the type of each position, it also knows what I get back.

```ts
let user: [number, string] = [101, "Vivek"];

let id = user[0];
let username = user[1];
```

TypeScript understands:

```text
user[0] → number
user[1] → string
```

Why?

Because I already defined:

```ts
[number, string]
```

So TypeScript can use that information when I access the values.

---

# 14. Tuple Destructuring

I can also destructure a tuple:

```ts
let user: [number, string] = [101, "Vivek"];

let [id, username] = user;
```

Now TypeScript knows:

```text
id
 ↓
number

username
 ↓
string
```

This is useful when a function returns a small fixed group of values.

The important idea is:

> **The tuple describes the structure, and TypeScript carries that structure into the variables I create from it.**

---

# 15. When Should I Use an Array or Tuple?

I should ask myself:

> Is this data a collection, or is it a small fixed structure?

### Collection

```ts
let users: string[] = ["Vivek", "Rahul", "Aman"];
```

Use an **array**.

```text
Array
  ↓
Collection of values
```

### Fixed Structure

```ts
let user: [number, string] = [101, "Vivek"];
```

Use a **tuple**.

```text
Tuple
  ↓
Fixed positional structure
```

I should not use tuples to represent large collections.

---

# 16. Now I Have Another Problem: Fixed Choices

So far I can represent:

```text
Collections
    ↓
Arrays

Fixed structures
    ↓
Tuples
```

But backend applications also contain fixed sets of choices.

For example, a user's role might be:

```text
admin
user
manager
```

An account status might be:

```text
active
inactive
blocked
```

An order might be:

```text
pending
shipped
delivered
cancelled
```

These aren't really collections.

They aren't tuples.

They are **fixed sets of possible choices**.

This is where enums come in.

---

# 17. Understanding Enums

An enum allows me to define named members representing a set of values.

```ts
enum Role {
    Admin,
    User,
    Manager
}
```

Now I can use:

```ts
let role: Role = Role.Admin;
```

I can think about the enum like this:

```text
Role
 ├── Admin
 ├── User
 └── Manager
```

The main idea is:

> **An enum gives names to a predefined set of values.**

---

# 18. Numeric Enums

By default, TypeScript assigns numeric values to enum members:

```ts
enum Role {
    Admin,
    User,
    Manager
}
```

Conceptually:

```text
Admin   → 0
User    → 1
Manager → 2
```

So:

```ts
console.log(Role.Admin);
```

produces:

```text
0
```

For this lesson, I don't need to focus heavily on the internal numbering.

What matters is that:

```ts
Role.Admin
```

is a named enum member.

---

# 19. String Enums

I can also explicitly give enum members string values:

```ts
enum Role {
    Admin = "admin",
    User = "user",
    Manager = "manager"
}
```

Now:

```ts
console.log(Role.Admin);
```

produces:

```text
admin
```

String values are often easier to understand when the actual value matters.

For example:

```ts
enum OrderStatus {
    Pending = "pending",
    Shipped = "shipped",
    Delivered = "delivered"
}
```

Now I have a clearly defined set of order statuses.

---

# 20. Using Enums as Types

An enum can also be used as a type:

```ts
enum Role {
    Admin = "admin",
    User = "user",
    Manager = "manager"
}

let role: Role = Role.Admin;
```

I can also use it in a function:

```ts
function printRole(role: Role): void {
    console.log(role);
}

printRole(Role.Admin);
```

Now the function expects a value from the `Role` enum.

This makes the relationship between the function and the allowed role values clear.

---

# 21. Array vs Tuple vs Enum

Now I can compare the three concepts.

### Array

```ts
let names: string[] = ["Vivek", "Rahul", "Aman"];
```

I have a **collection**.

```text
Array → Collection
```

### Tuple

```ts
let user: [number, string] = [101, "Vivek"];
```

I have a **fixed positional structure**.

```text
Tuple → Structure
```

### Enum

```ts
enum Role {
    Admin = "admin",
    User = "user",
    Manager = "manager"
}
```

I have **predefined named choices**.

```text
Enum → Choices
```

The simplest mental model:

```text
Array  → Collection
Tuple  → Fixed Structure
Enum   → Fixed Choices
```

---

# 22. When Should I Use Which One?

Instead of memorizing definitions, I can ask myself three questions.

### Question 1

> Do I have multiple values forming a collection?

Use an array.

```ts
let userIds: number[] = [101, 102, 103];
```

### Question 2

> Does each position in this small structure have a specific meaning?

A tuple may make sense.

```ts
let user: [number, string] = [101, "Vivek"];
```

### Question 3

> Do I have a predefined set of named choices?

An enum may make sense.

```ts
enum Role {
    Admin = "admin",
    User = "user"
}
```

So my decision process becomes:

```text
Collection?
    ↓
Array

Fixed positional structure?
    ↓
Tuple

Fixed named choices?
    ↓
Enum
```

---

# 23. Everything Together

Now I can combine the three concepts:

```ts
enum Role {
    Admin = "admin",
    User = "user"
}

let userIds: number[] = [101, 102, 103];

let user: [number, string, Role] = [
    101,
    "Vivek",
    Role.Admin
];
```

Now I can understand why each feature is being used.

### `userIds`

```ts
number[]
```

This is an array because I have a collection of IDs.

### `user`

```ts
[number, string, Role]
```

This is a tuple because each position has a meaning:

```text
position 0 → user ID
position 1 → username
position 2 → role
```

### `Role`

```ts
enum Role
```

This defines the available role choices.

So:

```text
User IDs
   ↓
Array

User information
   ↓
Tuple

User role
   ↓
Enum
```

---

# 24. How This Fits My Backend Goal

My goal is not to become a TypeScript type-system expert.

My goal is:

> **Learn enough TypeScript that it does not become an obstacle while I am learning backend development.**

These concepts will appear when working with things like:

```text
arrays of users
arrays of IDs
arrays of products
fixed data structures
roles
statuses
permissions
```

I don't need to force an array, tuple, or enum into every situation.

I just need to recognize:

```text
"This is a collection."

"This is a fixed structure."

"This is a fixed set of choices."
```

Once I can recognize the problem, the syntax becomes much easier.

---

# 25. Common Mistakes

## Mistake 1 — Typing Everything Manually

If TypeScript can already infer:

```ts
let names = ["Vivek", "Rahul"];
```

I don't always need:

```ts
let names: string[] = ["Vivek", "Rahul"];
```

Explicit types are useful when they improve clarity or are actually needed.

---

## Mistake 2 — Confusing a Tuple with a Union Array

These are different:

```ts
let values: (number | string)[] = [101, "Vivek"];
```

and:

```ts
let user: [number, string] = [101, "Vivek"];
```

The first means:

```text
number or string can appear in the array
```

The second means:

```text
position 0 → number
position 1 → string
```

---

## Mistake 3 — Using Tuples for Large Collections

A tuple is meant for a fixed structure.

I shouldn't try to represent a list of many users as a tuple.

That's what arrays are for.

---

## Mistake 4 — Thinking Enums Are Arrays

An enum is not simply an array of values.

It represents a set of **named members**:

```ts
enum Role {
    Admin,
    User
}
```

The important part is:

```text
Role.Admin
Role.User
```

---

# 26. My Mental Model

I want to remember this lesson through the problem I am solving.

```text
I have many values
       ↓
     Array
       ↓
   string[]
   number[]
   Array<T>
```

```text
I have a small fixed structure
       ↓
     Tuple
       ↓
[number, string, boolean]
```

```text
I have predefined named choices
       ↓
      Enum
       ↓
Admin / User / Manager
```

The shortest version:

```text
Array  → Collection
Tuple  → Fixed Structure
Enum   → Fixed Choices
```

---

# 27. Self-Test

Before moving to the next lesson, I should be able to answer these without looking at my notes:

1. What does `string[]` mean?
2. What is the difference between `string[]` and `Array<string>`?
3. How does TypeScript infer an array type?
4. What problem does a tuple solve?
5. Why does position matter in a tuple?
6. What is the difference between `(number | string)[]` and `[number, string]`?
7. What problem do enums solve?
8. What is the difference between numeric and string enums?
9. When should I use an array?
10. When should I use a tuple?
11. When should I use an enum?
12. Can I explain Array, Tuple, and Enum in my own words?

If I can answer these naturally, I have understood the concepts instead of just memorizing the syntax.

---

# 28. Final Recap

### Array

```ts
let names: string[] = ["Vivek", "Rahul"];
```

Used when I have a **collection of values**.

### `Array<T>`

```ts
let names: Array<string> = ["Vivek", "Rahul"];
```

Another syntax for a typed array.

### Tuple

```ts
let user: [number, string] = [101, "Vivek"];
```

Used when I have a **fixed structure where position matters**.

### Enum

```ts
enum Role {
    Admin = "admin",
    User = "user"
}
```

Used when I have a **predefined set of named choices**.

The main thing I want to remember is:

```text
Array
  → "I have a collection."

Tuple
  → "I have a fixed structure."

Enum
  → "I have a fixed set of named choices."
```

I don't need to master advanced TypeScript yet.

I just need these fundamentals to become natural enough that when I start writing Node.js + TypeScript code, I can focus on backend development instead of getting stuck on TypeScript syntax.

**Next: Lesson 07 — Functions in TypeScript**
