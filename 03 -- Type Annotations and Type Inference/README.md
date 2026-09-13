# Lesson 3 — Type Annotations and Type Inference

## What am I learning in this lesson?

In this lesson, I am learning how TypeScript understands the **type of a value**.

I will learn:

* Primitive types in TypeScript
* Type annotations
* Type inference
* Explicit types vs inferred types
* How TypeScript decides a variable's type
* Type inference with functions
* What happens during compilation
* `let` vs `const` and literal types
* When I should annotate a type and when I should let TypeScript infer it

---

# 1. Primitive Types

TypeScript provides the same basic primitive values that JavaScript has, while allowing me to describe their types.

The most common primitive types are:

```ts
let name: string = "Vivek";
let age: number = 20;
let isStudent: boolean = true;
```

Other primitive types include:

```ts
let value: undefined = undefined;
let empty: null = null;
let bigNumber: bigint = 1000000000000n;
let id: symbol = Symbol("id");
```

For now, the most important ones are:

```text
string
number
boolean
```

---

# 2. Type Annotation

A **type annotation** is when I explicitly tell TypeScript what type a variable should have.

```ts
let username: string = "Vivek";
let age: number = 20;
let isLoggedIn: boolean = true;
```

The basic syntax is:

```ts
let variableName: type = value;
```

For example:

```ts
let marks: number = 85;
```

I am telling TypeScript:

> `marks` should contain a number.

So this is invalid:

```ts
let marks: number = "85";
```

TypeScript catches the mistake during development.

---

# 3. Type Inference

TypeScript does not always need me to explicitly write the type.

It can often **infer** the type from the value I assign.

```ts
let name = "Vivek";
let age = 20;
let isStudent = true;
```

TypeScript understands this as:

```text
name       → string
age        → number
isStudent  → boolean
```

So I can write:

```ts
let age = 20;
```

instead of:

```ts
let age: number = 20;
```

Both are type-safe.

---

# 4. TypeScript Is Not Guessing

It may look like TypeScript is guessing the type.

It is not.

It analyzes the code and uses the information available to determine the type.

For example:

```ts
let score = 95;
```

TypeScript sees:

```text
95
↓
number value
↓
score is number
```

Therefore:

```ts
score = "95";
```

produces an error.

The important idea is:

> Type inference is TypeScript automatically determining a type from the code I have already written.

---

# 5. Explicit Type vs Inferred Type

Both of these are valid:

### Explicit type

```ts
let age: number = 20;
```

### Inferred type

```ts
let age = 20;
```

In the second example, TypeScript automatically understands:

```text
age → number
```

So I don't need to repeat information that is already obvious.

---

# 6. Why Type Inference Is Useful

Imagine I have many variables:

```ts
let username = "Vivek";
let age = 20;
let college = "CGC";
let isStudent = true;
let marks = 85;
```

If I explicitly annotate everything:

```ts
let username: string = "Vivek";
let age: number = 20;
let college: string = "CGC";
let isStudent: boolean = true;
let marks: number = 85;
```

Nothing is wrong with this.

But the types are already obvious from the values.

Inference keeps the code cleaner:

```ts
let username = "Vivek";
let age = 20;
let college = "CGC";
let isStudent = true;
let marks = 85;
```

This is one of the major benefits of TypeScript:

> I get type safety without always having to write the types myself.

---

# 7. Type Inference With Functions

TypeScript can also infer the return type of a function.

```ts
function add(a: number, b: number) {
    return a + b;
}
```

I did not write:

```ts
function add(a: number, b: number): number
```

But TypeScript can understand that the function returns a `number`.

The flow is:

```text
a → number
b → number

a + b
   ↓
number

function result → number
```

So this is also valid:

```ts
const result = add(10, 20);
```

TypeScript understands:

```text
result → number
```

---

# 8. What Happens Internally?

When TypeScript sees:

```ts
let age = 20;
```

it analyzes the code during compilation.

A simplified flow is:

```text
TypeScript Code
      ↓
   TypeScript
      ↓
Analyze the variable
      ↓
20 is a number
      ↓
age is inferred as number
      ↓
Check future usage
      ↓
Generate JavaScript
```

The important point is that **type checking happens before the JavaScript runs**.

---

# 9. Type Inference Happens Before Runtime

Consider:

```ts
let age = 20;

age = "twenty";
```

TypeScript reports an error before the program runs.

This happens during:

```text
Compile Time
    ↓
TypeScript checks types
    ↓
Error detected
    ↓
JavaScript generation can be blocked
```

JavaScript itself does not understand TypeScript types.

After compilation, the type information is removed.

For example:

```ts
let age: number = 20;
```

roughly becomes:

```js
let age = 20;
```

The `number` annotation does not exist at runtime.

This is called **type erasure**.

---

# 10. `let` vs `const`

There is an interesting difference between `let` and `const`.

With:

```ts
let age = 20;
```

TypeScript usually understands:

```text
age → number
```

because the variable can later change:

```ts
age = 21;
```

But with:

```ts
const age = 20;
```

TypeScript knows that `age` cannot be reassigned.

It can therefore preserve more specific information about the value.

This is related to **literal types**.

For example:

```ts
const role = "admin";
```

TypeScript can understand that the value is specifically:

```text
"admin"
```

rather than simply:

```text
string
```

This becomes more important later when learning about literal types and unions.

---

# 11. Should I Always Write Types?

No.

I should not write types just for the sake of writing types.

If the type is obvious:

```ts
const name = "Vivek";
const age = 20;
```

Inference is usually enough.

But sometimes the type is not obvious:

```ts
let username: string;
let userId: number;
```

Here, an annotation communicates my intention.

Another important case is when I want to restrict what a variable can contain:

```ts
let status: "success" | "error";
```

This is something inference alone cannot express in the same way.

---

# 12. My Rule for Type Inference

My basic rule is:

```text
If the type is obvious → let TypeScript infer it.

If the type needs to be communicated or restricted → annotate it.
```

### Let TypeScript infer

```ts
const name = "Vivek";
const age = 20;
const isStudent = true;
```

### Use an annotation

```ts
let username: string;
let userId: number;

let status: "success" | "error";
```

The goal is not to write the maximum number of type annotations.

The goal is to write **clear and type-safe code**.

---

# 13. Complete Flow

When I write:

```ts
const age = 20;
```

the complete mental model is:

```text
I write TypeScript
      ↓
const age = 20
      ↓
TypeScript analyzes the value
      ↓
20 is a number
      ↓
TypeScript infers the type
      ↓
age → number
      ↓
Type checking happens
      ↓
TypeScript generates JavaScript
      ↓
JavaScript runs
```

So TypeScript is helping me **before the program reaches runtime**.

---

# Things I Should Remember

* TypeScript has primitive types such as `string`, `number`, and `boolean`.
* A type annotation explicitly tells TypeScript the expected type.
* Type inference allows TypeScript to determine the type automatically.
* TypeScript is not randomly guessing; it analyzes the code.
* Function return types can also be inferred.
* Type checking happens during development/compilation, not at runtime.
* TypeScript types are removed when JavaScript is generated.
* I don't need to annotate every obvious variable.
* I should use annotations when they communicate an important constraint or intention.

---

# Quick Self-Test

### 1. What type does TypeScript infer?

```ts
let age = 20;
```

**Answer:**

```text
number
```

### 2. What is the difference?

```ts
let age: number = 20;
```

and

```ts
let age = 20;
```

The first explicitly declares the type.

The second lets TypeScript infer the type.

### 3. Can JavaScript see TypeScript's types at runtime?

No.

TypeScript's type information is removed during compilation.

---

# What I Learned From This Lesson

In this lesson, I learned that TypeScript does not require me to manually specify the type of every value.

It can analyze my code and infer types automatically.

The main idea I want to remember is:

> **TypeScript should handle obvious types for me, while I use explicit types when they add meaning, safety, or restrictions.**

This keeps my code both **type-safe and readable**.

---

# Next Lesson

## `any`, `unknown`, `void`, and `never`

Next, I will learn about some special TypeScript types and, most importantly, understand why `any` can be dangerous while `unknown` provides safer type handling.
