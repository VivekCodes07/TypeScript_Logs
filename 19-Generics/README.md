# 19 — Generics

## Why Am I Learning This?

So far, I have been working with specific types.

For example:

```ts
function getName(name: string): string {
    return name;
}
```

This works well when I know that the function should only work with strings.

But what if I want the same function to work with:

```text
string
number
boolean
objects
arrays
```

I could create separate functions for each type:

```ts
function getString(value: string): string {
    return value;
}

function getNumber(value: number): number {
    return value;
}
```

But the logic is basically the same.

The only thing changing is the type.

I could also use `any`:

```ts
function getValue(value: any): any {
    return value;
}
```

But I already learned that `any` can remove TypeScript's type safety.

So I need a way to make my code:

```text
Reusable
   +
Flexible
   +
Type Safe
```

This is where **Generics** come in.

```text
Normal Type
    ↓
Works with a specific type

Generic
    ↓
Works with different types
    ↓
Still keeps track of the actual type
```

---

# What I Am Going To Study

In this lesson I will understand:

* What problem generics solve
* What a generic is
* The `<T>` syntax
* Anatomy of a generic function
* Generic functions
* Generic type inference
* How TypeScript remembers the actual type
* Explicitly providing a generic type
* Generics with objects
* Generics with arrays
* Multiple generic type parameters
* Generics vs `any`
* Generics vs `unknown`
* Where generics are useful in backend development

I don't need advanced generic patterns right now.

I mainly want to understand **what generics are doing and why I would use them**.

---

# 1. The Problem Without Generics

Suppose I want a function that simply returns the value I give it.

For a string:

```ts
function getString(value: string): string {
    return value;
}
```

For a number:

```ts
function getNumber(value: number): number {
    return value;
}
```

For a boolean:

```ts
function getBoolean(value: boolean): boolean {
    return value;
}
```

Now I have:

```text
getString()
getNumber()
getBoolean()
```

All three functions are doing basically the same thing.

I don't want to write the same logic again and again just because the type is different.

I want **one function that can work with different types while still keeping type safety**.

---

# 2. Using `any`

One option is:

```ts
function getValue(value: any): any {
    return value;
}
```

Now I can pass different values:

```ts
getValue("Vivek");
getValue(20);
getValue(true);
```

This looks flexible.

But I lose useful type information.

For example:

```ts
const value = getValue(20);
```

Because the return type is `any`, TypeScript does not properly know that `value` is a number.

I could accidentally do:

```ts
value.toUpperCase();
```

and `any` does not give me the same type safety that a proper `number` type would.

So:

```text
any
 ↓
Accepts different types
 ↓
But type information can be lost
```

I don't want that.

I want flexibility **without throwing away TypeScript's type checking**.

---

# 3. What Do I Actually Want?

Before learning the syntax, I want to understand the problem I am trying to solve.

If I give a function a string:

```text
string
  ↓
function
  ↓
string
```

If I give it a number:

```text
number
  ↓
function
  ↓
number
```

If I give it a boolean:

```text
boolean
  ↓
function
  ↓
boolean
```

The exact type can change.

But the **relationship between the input and output stays the same**.

```text
Whatever type goes in
          ↓
      Same type
          ↓
     Comes back out
```

This is exactly where generics become useful.

---

# 4. What Is a Generic?

A **generic** allows me to write reusable code that can work with different types while preserving the actual type being used.

The basic syntax is:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

The important part is:

```ts
<T>
```

`T` is called a **generic type parameter**.

I can think of `T` as a temporary type placeholder.

```text
T
↓
Some type that will be decided later
```

It does not mean that TypeScript has no idea about the type.

It means:

> "I will decide what this type is when I use this function."

---

# 5. Anatomy of a Generic Function

This is the part I really want to understand.

Look at:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

I can break it into parts:

```text
function getValue<T>(value: T): T
        │       │       │       │
        │       │       │       └── Return type
        │       │       └────────── Parameter type
        │       └────────────────── Generic type parameter
        └────────────────────────── Function name
```

Let's understand each part.

### `getValue`

```ts
getValue
```

This is simply the function name.

Nothing special here.

---

### `<T>`

```ts
getValue<T>
```

This is where I introduce the generic type parameter.

I am basically telling TypeScript:

> "This function is going to use a type called `T`, but the actual type will be decided when I use the function."

So:

```text
<T>
 ↓
Create a generic type parameter named T
```

`T` is not the actual type yet.

It is just a name representing the type.

---

### `value: T`

```ts
value: T
```

Now I am using `T` as the parameter type.

This means:

> "Whatever type `T` becomes, the parameter must have that type."

If I call:

```ts
getValue("Vivek");
```

then:

```text
T = string
```

So conceptually:

```ts
value: string
```

If I call:

```ts
getValue(20);
```

then:

```text
T = number
```

So conceptually:

```ts
value: number
```

---

### `): T`

```ts
): T
```

This tells TypeScript that the function returns the same type represented by `T`.

So:

```text
Input
  ↓
  T
  ↓
Output
```

If `T` is `string`:

```text
string → string
```

If `T` is `number`:

```text
number → number
```

If `T` is an object:

```text
object → same object type
```

This is the important part.

`T` is creating a **relationship between the input and output types**.

---

# 6. Putting the Anatomy Together

So when I see:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

I can read it like this:

```text
function getValue
       ↓
"This is my function"

<T>
       ↓
"I am introducing a generic type called T"

value: T
       ↓
"The input uses type T"

): T
       ↓
"The output also uses type T"
```

So the complete mental model is:

```text
             T
             ↓
      ┌─────────────┐
      │    Input    │
      └──────┬──────┘
             ↓
       Same Type
             ↓
      ┌─────────────┐
      │   Output    │
      └─────────────┘
```

This is what makes a generic different from simply accepting `any`.

---

# 7. Generic Function

Now let's actually use the generic function.

```ts
function getValue<T>(value: T): T {
    return value;
}
```

### With a String

```ts
const name = getValue("Vivek");
```

TypeScript sees:

```text
"Vivek"
   ↓
T = string
```

So the function is effectively working like:

```text
string → string
```

---

### With a Number

```ts
const age = getValue(20);
```

Now:

```text
20
↓
T = number
```

So:

```text
number → number
```

---

### With a Boolean

```ts
const isLoggedIn = getValue(true);
```

Now:

```text
true
 ↓
T = boolean
```

So:

```text
boolean → boolean
```

I have written only **one function**, but it works with different types.

---

# 8. How TypeScript Figures Out `T`

Most of the time, I don't have to manually tell TypeScript what `T` is.

This is called **generic type inference**.

Suppose I write:

```ts
const age = getValue(20);
```

TypeScript looks at the argument:

```text
20
 ↓
number
```

So it determines:

```text
T = number
```

Then:

```text
parameter type = number
return type    = number
age            = number
```

The complete flow is:

```text
getValue(20)
     ↓
TypeScript sees 20
     ↓
20 is a number
     ↓
T = number
     ↓
Return type = number
     ↓
age = number
```

So I can safely do:

```ts
age.toFixed();
```

because TypeScript knows that `age` is a number.

---

# 9. Generics Preserve Type Information

Consider:

```ts
const name = getValue("Vivek");
```

TypeScript knows:

```text
T = string
```

Therefore:

```text
name = string
```

So:

```ts
name.toUpperCase();
```

is type-safe.

Similarly:

```ts
const age = getValue(20);
```

gives:

```text
T = number
```

and:

```ts
age.toFixed();
```

works.

The generic function didn't just accept different types.

It **preserved the type information**.

---

# 10. Generic vs `any`

This is one of the most important comparisons in this lesson.

### Using `any`

```ts
function getValue(value: any): any {
    return value;
}
```

The type relationship is lost.

```text
any
 ↓
"Don't worry about the type."
```

### Using a Generic

```ts
function getValue<T>(value: T): T {
    return value;
}
```

The type relationship is preserved.

```text
T
 ↓
Input type
 ↓
Same type
 ↓
Output type
```

So my mental model is:

```text
any
 ↓
"I don't care about the type."

generic
 ↓
"I don't know the exact type yet,
but keep track of it."
```

---

# 11. Explicitly Providing the Generic Type

Usually TypeScript can infer the type automatically.

```ts
const name = getValue("Vivek");
```

But I can also explicitly provide the type:

```ts
const name = getValue<string>("Vivek");
```

Here I am directly telling TypeScript:

```text
T = string
```

Similarly:

```ts
const age = getValue<number>(20);
```

Now:

```text
T = number
```

So I can use:

```ts
getValue("Vivek");
```

or:

```ts
getValue<string>("Vivek");
```

Both are valid.

If TypeScript can clearly infer the type, I usually don't need to manually provide it.

---

# 12. Generics With Objects

Generics become even more useful when I start working with objects.

Suppose I have a function that returns the data I give it:

```ts
function getData<T>(data: T): T {
    return data;
}
```

Now I can pass an object:

```ts
const user = getData({
    id: 101,
    name: "Vivek",
    age: 20
});
```

TypeScript looks at the object and understands its structure.

Conceptually:

```text
{
    id: number,
    name: string,
    age: number
}
       ↓
       T
```

So when the object comes back:

```ts
user.id
user.name
user.age
```

TypeScript still knows their types.

```text
user.id   → number
user.name → string
user.age  → number
```

I can think of the flow as:

```text
Object
  ↓
TypeScript sees its structure
  ↓
T becomes that object type
  ↓
Function returns T
  ↓
Object structure is preserved
```

This is useful because I don't have to use `any` just because the function can receive different object shapes.

---

# 13. Generics With Arrays

Now I want to use generics with arrays.

Suppose I want a function that returns the first item from an array.

I want it to work with:

```text
number[]
string[]
boolean[]
objects[]
```

I can write one generic function:

```ts
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

The important part here is:

```ts
items: T[]
```

This means:

> "I am receiving an array containing values of type `T`."

And:

```ts
): T
```

means:

> "I am returning one value of type `T`."

So the anatomy is:

```text
getFirst<T>
        ↓
Introduce generic type T

items: T[]
        ↓
Array containing values of type T

): T
        ↓
Return one value of type T
```

The relationship becomes:

```text
Array of T
    ↓
   T[]
    ↓
Get one item
    ↓
    T
```

---

# 14. Using the Generic Array Function

### With Numbers

```ts
const number = getFirst([10, 20, 30]);

console.log(number);
```

TypeScript sees:

```text
[10, 20, 30]
      ↓
   number[]
      ↓
   T = number
      ↓
return type = number
```

So:

```text
number → number
```

I can safely do:

```ts
number.toFixed();
```

---

### With Strings

I can use the exact same function:

```ts
const name = getFirst(["Vivek", "Rahul", "Aman"]);

console.log(name);
```

Now TypeScript determines:

```text
["Vivek", "Rahul", "Aman"]
          ↓
       string[]
          ↓
       T = string
          ↓
    return type = string
```

So:

```text
name → string
```

I can safely do:

```ts
name.toUpperCase();
```

---

### With Objects

The same function can also work with an array of objects:

```ts
const user = getFirst([
    { id: 1, name: "Vivek" },
    { id: 2, name: "Rahul" }
]);
```

Now `T` represents the object type.

So I can do:

```ts
console.log(user.id);
console.log(user.name);
```

TypeScript still knows:

```text
user.id   → number
user.name → string
```

The flow is:

```text
Array of Objects
       ↓
      T[]
       ↓
Get first object
       ↓
       T
       ↓
Object type is preserved
```

This is where I can really see the benefit of generics.

I wrote **one function**, but it works with:

```text
number[]
string[]
object[]
```

while keeping the correct type information.

---

# 15. Generics With More Than One Type

Sometimes a function needs to work with two different types at the same time.

For example:

```ts
function pair<T, U>(first: T, second: U) {
    return {
        first,
        second
    };
}
```

Here I have two generic type parameters:

```text
T
U
```

Now:

```ts
const result = pair("Vivek", 20);
```

TypeScript understands:

```text
T = string
U = number
```

So:

```text
result.first  → string
result.second → number
```

I can also do:

```ts
const result = pair(true, "Admin");
```

Now:

```text
T = boolean
U = string
```

The important thing is that TypeScript keeps track of each type separately.

---

# 16. Why Is It Called `T`?

I will commonly see:

```ts
<T>
```

`T` is not a special TypeScript keyword.

It is simply a common naming convention for a generic type parameter.

For example, this also works:

```ts
function getValue<Type>(value: Type): Type {
    return value;
}
```

But developers commonly use:

```text
T → Type
```

because it is short and easy to recognize.

Later I may see:

```text
T → Type
U → another Type
K → Key
V → Value
```

I don't need to memorize all of these right now.

The important thing is understanding what the generic type parameter is doing.

---

# 17. Generic Type Parameters Are Not Runtime Values

One thing I need to remember is that `T` is part of TypeScript's type system.

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

`T` helps TypeScript check my code.

It is not a normal JavaScript variable that exists at runtime.

The flow is:

```text
TypeScript
    ↓
T helps with type checking
    ↓
Code is compiled
    ↓
JavaScript runs
    ↓
T is not runtime data
```

So I should think of `T` as something that helps the compiler understand my types.

---

# 18. Why Not Just Use `unknown`?

I already learned about `unknown`, so I should understand how it differs from generics.

### `unknown`

I use `unknown` when I genuinely don't know the type of a value yet.

```text
unknown
   ↓
"I don't know the type yet."
   ↓
Check / narrow it
   ↓
Use it safely
```

### Generic

I use a generic when I want my code to work with different types while preserving the actual type being used.

```text
generic
   ↓
"I want this code to work with different types."
   ↓
"Keep track of whichever type is being used."
```

So:

```text
unknown
    ↓
Type is not known yet

generic
    ↓
Type is flexible but preserved
```

They solve different problems.

---

# 19. Where Will I Use Generics?

Generics are useful whenever I want to create reusable code.

Common places include:

```text
Functions
Arrays
Classes
Data Structures
Utility Functions
API Responses
Backend Services
```

This becomes especially important in larger TypeScript projects.

I will see generics more as I work with:

```text
Node.js
Express
MongoDB
APIs
Services
Database Responses
```

---

# 20. Backend Connection

Suppose I have an API response.

The structure might always be:

```text
success
data
```

But the data can be different:

```text
User
Product
Order
Payment
```

Instead of creating separate response structures for everything, I can create a reusable generic structure:

```ts
interface ApiResponse<T> {
    success: boolean;
    data: T;
}
```

Now I can use it with different data.

For example:

```ts
const userResponse: ApiResponse<string> = {
    success: true,
    data: "Vivek"
};
```

Or:

```ts
const ageResponse: ApiResponse<number> = {
    success: true,
    data: 20
};
```

The structure stays the same.

Only `T` changes.

```text
Same Structure
      ↓
Different Data
      ↓
Generic
      ↓
Reusable + Type Safe
```

This is the kind of pattern that will become useful when I start building backend applications.

---

# 21. Generic vs `any` vs `unknown`

This is a comparison I want to remember:

| Type      | What I am saying                                           |
| --------- | ---------------------------------------------------------- |
| `any`     | "Don't worry about checking this type."                    |
| `unknown` | "I don't know the type yet."                               |
| Generic   | "The type can change, but keep track of which type it is." |

Mental model:

```text
any
 ↓
"Don't check it."

unknown
 ↓
"I don't know it yet."

generic
 ↓
"I want different types,
but I still want TypeScript
to remember which type I'm using."
```

---

# 22. Execution Flow

When I write:

```ts
const age = getValue(20);
```

I can think through it step by step:

```text
Call getValue()
       ↓
Pass 20
       ↓
TypeScript sees that 20 is a number
       ↓
T becomes number
       ↓
Parameter becomes number
       ↓
Return type becomes number
       ↓
age becomes number
```

For:

```ts
const name = getValue("Vivek");
```

the flow is:

```text
Pass "Vivek"
       ↓
TypeScript sees string
       ↓
T becomes string
       ↓
Return type becomes string
       ↓
name becomes string
```

So the simplest flow is:

```text
Argument
   ↓
TypeScript determines T
   ↓
T is used for the input
   ↓
T is used for the output
   ↓
Type information is preserved
```

---

# 23. My Mental Model for Generics

I want to remember generics like this:

```text
          Generic
             ↓
      Type Placeholder
             ↓
      I use the function
             ↓
   TypeScript determines T
             ↓
       T becomes the type
             ↓
 Type information is preserved
```

Or even simpler:

```text
Input Type
    ↓
    T
    ↓
Output Type
```

The exact type can change.

The relationship stays the same.

---

# 24. What I Need To Remember

### Generic Function

```ts
function getValue<T>(value: T): T {
    return value;
}
```

### Generic Array Function

```ts
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

### Type Inference

```ts
const age = getValue(20);
```

```text
T = number
```

### Explicit Type

```ts
const age = getValue<number>(20);
```

```text
T = number
```

### Multiple Generic Types

```ts
function pair<T, U>(first: T, second: U) {
    return { first, second };
}
```

### Main Difference

```text
any
 ↓
Flexible but type information can be lost

generic
 ↓
Flexible + type information preserved
```

---

# Self-Test

Before moving to the next lesson, I should be able to answer these without looking at my notes:

1. What problem do generics solve?
2. Why would I use a generic instead of `any`?
3. What does `<T>` mean?
4. What is a generic type parameter?
5. What does `value: T` mean?
6. What does `): T` mean?
7. How does TypeScript determine the type of `T`?
8. What happens when `T` becomes `number`?
9. Can I explicitly provide the generic type?
10. Can generics work with objects?
11. Can generics work with arrays?
12. What does `T[]` mean?
13. Can I use more than one generic type parameter?
14. What is the difference between `unknown` and a generic?
15. Does `T` exist as a normal runtime JavaScript value?
16. Where might I use generics in backend development?

If I can write this without looking:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

and explain **why it is better than using `any` in this situation**, I understand the basic idea of generics.

---

# Key Takeaway

I don't want to use `any` just because I want my code to accept different types.

Instead:

```text
Different Types
      ↓
    Generic
      ↓
Reusable Code
      ↓
Type Information Preserved
      ↓
Type Safety
```

The main thing I want to remember:

> **Generics let me write reusable code that works with different types while still keeping track of the actual type being used.**

My simplest mental model is:

```text
any
 ↓
"I don't care about the type."

unknown
 ↓
"I don't know the type yet."

generic
 ↓
"I want different types,
but I still want TypeScript
to remember which type I'm using."
```

So when I see:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

I should immediately understand:

```text
<T>
 ↓
Generic type parameter

value: T
 ↓
Input uses that type

): T
 ↓
Output uses that same type
```

That is the core idea of **Generics**.
