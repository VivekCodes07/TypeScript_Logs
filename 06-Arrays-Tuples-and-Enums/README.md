# 06 — Arrays, Tuples and Enums

## 1. Why Am I Learning This?

So far, I have mainly worked with individual values:

```ts
let username: string = "Vivek";
let age: number = 20;
let isLoggedIn: boolean = true;
```

But real applications don't work with only one value at a time.

In backend development, I will deal with things like:

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

Now I have a new question:

> How do I tell TypeScript what kind of data this collection should contain?

And another question:

> What if the data has a fixed structure where each position has a different meaning?

And finally:

> What if I have a fixed set of possible values such as `admin`, `user`, or `manager`?

These problems lead me to three important TypeScript features:

```text
Arrays
   ↓
Tuples
   ↓
Enums
```

The goal of this lesson is to understand **what problem each one solves and when I should use it.**

---

# 2. First, How Are Arrays Different in TypeScript?

In JavaScript, I can create an array very easily:

```ts
let names = ["Vivek", "Rahul", "Aman"];
```

JavaScript does not require me to specify what type of values the array contains.

TypeScript can understand the type automatically:

```text
names
  ↓
string[]
```

So TypeScript knows that the array contains strings.

That means this is fine:

```ts
names.push("Karan");
```

But this should not be allowed:

```ts
names.push(100);
```

Why?

Because I originally created an array of strings.

This gives me the first important idea:

> A typed array tells TypeScript what kind of values are allowed inside the array.

---

# 3. Creating Typed Arrays

The most common syntax is:

```ts
let names: string[] = ["Vivek", "Rahul", "Aman"];
```

The important part is:

```ts
string[]
```

This means:

> An array containing strings.

Similarly:

```ts
let ages: number[] = [18, 20, 22];

let isActive: boolean[] = [true, false, true];
```

So I can think of it like this:

```text
string[]   → array of strings
number[]   → array of numbers
boolean[]  → array of booleans
```

The syntax is simply:

```text
type[]
```

---

# 4. Why Does the Array Type Matter?

Suppose I am creating an array of product prices:

```ts
let prices: number[] = [100, 200, 300];
```

Now imagine somewhere later I accidentally do:

```ts
prices.push("500");
```

This is a mistake.

A price should be a number.

TypeScript can catch this mistake while I am writing the code.

That's the important benefit.

Without a type:

```text
I can accidentally put the wrong data inside.
```

With a type:

```text
TypeScript knows what belongs there.
        ↓
TypeScript can warn me about incorrect values.
```

This becomes especially useful in backend applications where arrays may contain IDs, database records, prices, or other structured data.

---

# 5. TypeScript Can Infer Array Types

I don't always have to write the type manually.

For example:

```ts
let names = ["Vivek", "Rahul", "Aman"];
```

TypeScript already has enough information to understand:

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

This connects directly to what I learned in Lesson 03 about **type inference**.

So I should not think:

> "I must manually type every array."

Instead:

> "If TypeScript already knows the type, inference can do the work for me."

---

# 6. What If an Array Contains More Than One Type?

Now things become slightly more interesting.

Suppose I have:

```ts
let values = [10, "Vivek", true];
```

There are three different types here:

```text
number
string
boolean
```

Sometimes mixed values are intentional.

TypeScript can represent an array containing multiple allowed types using a union:

```ts
let values: (number | string | boolean)[] = [10, "Vivek", true];
```

Now the rule is:

> Every element must be either a number, string, or boolean.

For example:

```ts
values.push(50);
values.push("Hello");
values.push(false);
```

are allowed.

But:

```ts
values.push({ name: "Vivek" });
```

is not.

This is useful because it shows me something important:

> A union array and a tuple are not the same thing.

That difference will become important next.

---

# 7. Why Do I Need Tuples?

Consider this data:

```ts
let user = [101, "Vivek", true];
```

I could describe it as:

```ts
let user: (number | string | boolean)[] = [101, "Vivek", true];
```

But this only tells TypeScript:

> The array can contain numbers, strings, and booleans.

It does **not** clearly describe what each position means.

But maybe I know that:

```text
position 0 → user ID
position 1 → username
position 2 → account status
```

Now I want to describe the exact structure.

This is where a **tuple** becomes useful.

---

# 8. Understanding Tuples

A tuple allows me to specify the type of each position.

```ts
let user: [number, string, boolean] = [101, "Vivek", true];
```

Now TypeScript understands:

```text
position 0 → number
position 1 → string
position 2 → boolean
```

So the tuple:

```ts
[number, string, boolean];
```

is describing a specific structure.

This is the main idea I need to remember:

> A tuple is an array-like structure where the type and meaning of each position can be defined.

---

# 9. Why Does Position Matter in a Tuple?

Look at this:

```ts
let user: [number, string] = [101, "Vivek"];
```

I have defined:

```text
0 → number
1 → string
```

So this is correct:

```ts
[101, "Vivek"];
```

But this is incorrect:

```ts
["Vivek", 101];
```

Even though both values exist and both types are present.

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

So the tuple gives me more structure than a normal union array.

---

# 10. Tuple vs Union Array

This is an important distinction.

Consider:

```ts
let values: (number | string)[] = [101, "Vivek"];
```

This means:

> This array can contain numbers or strings.

The positions do not have fixed meanings.

I could have:

```ts
[101, "Vivek"];
```

or:

```ts
["Vivek", 101];
```

Both follow the general rule.

Now look at:

```ts
let user: [number, string] = [101, "Vivek"];
```

This means:

> Position 0 is a number and position 1 is a string.

So:

```text
Union Array
→ allowed types matter

Tuple
→ allowed types + positions matter
```

This is one of the most important differences in this lesson.

---

# 11. Accessing Tuple Values

Because TypeScript knows the position types, it can also understand what I get back.

```ts
let user: [number, string] = [101, "Vivek"];

let id = user[0];
let username = user[1];
```

TypeScript knows:

```text
user[0] → number
user[1] → string
```

Why?

Because I already defined the tuple:

```ts
[number, string];
```

So TypeScript can use that information when I access the values.

---

# 12. Tuple Destructuring

I can also destructure a tuple:

```ts
let user: [number, string] = [101, "Vivek"];

let [id, username] = user;
```

Now TypeScript understands:

```text
id
↓
number

username
↓
string
```

This is useful when a function returns a small fixed group of values.

For example, conceptually:

```text
return
[
    userId,
    username
]
```

A tuple allows me to describe exactly what that returned structure contains.

---

# 13. Tuples Should Not Replace Normal Arrays

I need to be careful here.

A tuple is useful when the structure itself has meaning.

For example:

```ts
let user: [number, string] = [101, "Vivek"];
```

makes sense because:

```text
ID
Username
```

are two different pieces of information.

But if I have:

```ts
let users: string[] = ["Vivek", "Rahul", "Aman"];
```

I don't need a tuple.

This is a collection.

So I should ask myself:

> Is this data a collection, or is it a small fixed structure?

```text
Collection
    ↓
Array

Fixed structure
    ↓
Tuple
```

---

# 14. Now I Have Another Problem: Fixed Choices

So far I can represent:

```text
Collections → Arrays
Fixed structures → Tuples
```

But backend applications often have another type of data.

For example, a user's role might be:

```text
admin
user
manager
```

A user's account status might be:

```text
active
inactive
blocked
```

An order might have:

```text
pending
shipped
delivered
cancelled
```

These aren't really collections.

They aren't tuples.

They are **fixed sets of possible choices**.

I want my code to represent that idea clearly.

This leads me to enums.

---

# 15. Understanding Enums

An enum allows me to define named members that represent a set of values.

```ts
enum Role {
  Admin,
  User,
  Manager,
}
```

Now I can use:

```ts
let role: Role = Role.Admin;
```

Instead of treating the role as just some random value, I have defined a specific group:

```text
Role
 ├── Admin
 ├── User
 └── Manager
```

So the main idea is:

> An enum gives names to a predefined set of values.

---

# 16. Numeric Enums

By default, enum members receive numeric values.

```ts
enum Role {
  Admin,
  User,
  Manager,
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

will produce:

```text
0
```

For this lesson, I don't need to focus heavily on the internal numbering.

What matters is understanding that:

```ts
Role.Admin;
```

is a named enum member.

---

# 17. String Enums

I can also explicitly give enum members string values.

```ts
enum Role {
  Admin = "admin",
  User = "user",
  Manager = "manager",
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

This is easier to understand when the actual values are meaningful strings.

For example:

```ts
enum OrderStatus {
  Pending = "pending",
  Shipped = "shipped",
  Delivered = "delivered",
}
```

Now I have a clear set of possible order statuses.

---

# 18. Using Enums as Types

An enum can also be used as a type.

```ts
enum Role {
  Admin = "admin",
  User = "user",
  Manager = "manager",
}

let role: Role = Role.Admin;
```

Now `role` is typed using the `Role` enum.

I can also use it in a function:

```ts
function printRole(role: Role): void {
  console.log(role);
}
```

Then:

```ts
printRole(Role.Admin);
```

This makes the relationship between the function and the allowed role values clear.

---

# 19. Array vs Tuple vs Enum

Now I want to make the difference very clear.

### Array

```ts
let names: string[] = ["Vivek", "Rahul", "Aman"];
```

I have a collection.

```text
Array
→ many values
```

### Tuple

```ts
let user: [number, string] = [101, "Vivek"];
```

I have a fixed structure.

```text
Tuple
→ specific value at a specific position
```

### Enum

```ts
enum Role {
  Admin,
  User,
  Manager,
}
```

I have predefined named choices.

```text
Enum
→ fixed set of named values
```

The simplest mental model:

```text
Array  → Collection
Tuple  → Structure
Enum   → Choices
```

---

# 20. When Should I Use Which One?

Instead of memorizing definitions, I can ask myself a question.

### Question 1

> Do I have multiple values of the same general type?

Use an array.

```ts
let userIds: number[] = [101, 102, 103];
```

---

### Question 2

> Does each position in this small structure have a specific meaning?

A tuple may make sense.

```ts
let user: [number, string] = [101, "Vivek"];
```

---

### Question 3

> Do I have a predefined set of named choices?

An enum may make sense.

```ts
enum Role {
  Admin = "admin",
  User = "user",
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

# 21. Everything Together

Now I can combine the three concepts in a small example.

```ts
enum Role {
  Admin = "admin",
  User = "user",
}

let userIds: number[] = [101, 102, 103];

let user: [number, string, Role] = [101, "Vivek", Role.Admin];
```

Now I can understand exactly why each feature is being used.

### `userIds`

```ts
number[]
```

This is an array because I have a collection of IDs.

### `user`

```ts
[number, string, Role];
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

So everything fits together:

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

# 22. How This Fits My Backend Goal

My goal is not to become a TypeScript type-system expert.

My goal is:

> Learn enough TypeScript that it does not become an obstacle while I am learning backend development.

These concepts will help me understand common TypeScript code when I start working with Node.js and Express.

For example, backend code may contain:

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

# 23. A Small Backend-Style Example

Suppose I am working with users.

```ts
enum Role {
  Admin = "admin",
  User = "user",
}

let userIds: number[] = [101, 102, 103];

let user: [number, string, Role] = [101, "Vivek", Role.Admin];
```

Now I can read this code naturally:

```text
userIds
→ collection of user IDs

user
→ fixed structure containing:
   ID
   username
   role

Role
→ predefined role choices
```

This is the kind of understanding I want before moving into Node.js + TypeScript.

---

# 24. Common Mistakes I Should Avoid

## Mistake 1 — Typing everything manually

If TypeScript can already infer:

```ts
let names = ["Vivek", "Rahul"];
```

I don't always need:

```ts
let names: string[] = ["Vivek", "Rahul"];
```

I should use explicit types when they actually improve clarity or are needed.

---

## Mistake 2 — Confusing a tuple with a union array

These are different:

```ts
let values: (number | string)[] = [101, "Vivek"];
```

and:

```ts
let user: [number, string] = [101, "Vivek"];
```

The first says:

```text
number or string can appear in the array
```

The second says:

```text
position 0 → number
position 1 → string
```

---

## Mistake 3 — Using tuples for large collections

A tuple is meant for a fixed structure.

I shouldn't try to represent a list of 50 users as a tuple.

That's what arrays are for.

---

## Mistake 4 — Thinking enums are collections

An enum is not simply:

> an array of values.

It represents a set of named members.

```ts
enum Role {
  Admin,
  User,
}
```

The important part is the named choices:

```text
Role.Admin
Role.User
```

---

## Mistake 5 — Memorizing syntax without understanding the problem

I don't want to memorize:

```text
[]
<T>
[]
enum
```

without understanding why they exist.

Instead:

```text
I need a collection
    ↓
Array

I need a fixed structure
    ↓
Tuple

I need named choices
    ↓
Enum
```

That mental decision is more useful than memorizing syntax.

---

# 25. My Mental Model

I want to remember this lesson in terms of the **problem I am solving**.

```text
I have many values
        ↓
Array
        ↓
string[]
number[]
Array<T>


I have a small fixed structure
        ↓
Tuple
        ↓
[number, string, boolean]


I have predefined named choices
        ↓
Enum
        ↓
Admin / User / Manager
```

The shortest version:

```text
Array  → Collection

Tuple  → Fixed structure

Enum   → Fixed choices
```

---

# 26. Final Flow

When I encounter some data, I can think:

```text
What am I trying to represent?
              ↓
       A collection?
              ↓
             Yes
              ↓
            Array
              ↓
--------------------------------
              ↓
   A fixed structure where
      position matters?
              ↓
             Yes
              ↓
            Tuple
              ↓
--------------------------------
              ↓
   A fixed set of named
          choices?
              ↓
             Yes
              ↓
            Enum
```

This is the actual flow I want to remember.

I am not learning three unrelated TypeScript features.

I am learning three different ways to describe data:

```text
Collection
    ↓
Array

Structure
    ↓
Tuple

Choices
    ↓
Enum
```

---

# 27. Self-Test

Before moving to the next lesson, I should be able to explain these without looking at my notes:

1. What problem do typed arrays solve?
2. What does `string[]` mean?
3. What does `Array<string>` mean?
4. Why can TypeScript infer the type of an array?
5. What problem does a tuple solve?
6. Why does position matter in a tuple?
7. What is the difference between `(number | string)[]` and `[number, string]`?
8. What problem do enums solve?
9. What is the difference between a numeric enum and a string enum?
10. When should I use an array?
11. When should I use a tuple?
12. When should I use an enum?
13. Can I explain the difference between Array, Tuple, and Enum in my own words?
14. Can I explain why these concepts will be useful when I start backend development?

If I can answer these naturally, I have understood the lesson instead of just memorizing its syntax.

---

# 28. Final Recap

In this lesson, I learned how TypeScript can describe different kinds of data structures.

### Typed Arrays

```ts
let names: string[] = ["Vivek", "Rahul"];
```

Used when I have a collection of values.

### `Array<T>`

```ts
let names: Array<string> = ["Vivek", "Rahul"];
```

Another syntax for describing a typed array.

### Tuples

```ts
let user: [number, string] = [101, "Vivek"];
```

Used when I have a fixed structure where position matters.

### Enums

```ts
enum Role {
  Admin = "admin",
  User = "user",
}
```

Used when I have a predefined set of named choices.

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

I just need these fundamentals to become natural enough that when I start writing Node.js + TypeScript code, I can focus on learning backend development instead of getting stuck on the TypeScript syntax.

**Next: Lesson 07 — Functions in TypeScript**
