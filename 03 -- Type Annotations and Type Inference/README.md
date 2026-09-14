# Lesson 3 — Type Annotations and Type Inference

## What am I learning in this lesson?

In this lesson, I am learning how TypeScript understands the **type of a value** and how it uses that information to protect my code.

I will learn:

* Primitive types in TypeScript
* Type annotations
* Type inference
* Explicit types vs inferred types
* How TypeScript decides a variable's type
* How TypeScript locks the type of a variable
* Type inference with functions
* What happens during compilation
* `let` vs `const` and literal types
* The danger of uninitialized variables
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

I should remember:

```text
"20"  → string
20    → number

"true" → string
true   → boolean
```

The quotes make a difference.

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

So this is valid:

```ts
let marks: number = 85;
```

But this is invalid:

```ts
let marks: number = "85";
```

TypeScript catches the mistake during compile-time checking.

The important part is:

```text
: number
```

This is the **type annotation**.

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

This automatic process is called **Type Inference**.

---

# 4. TypeScript Is Not Guessing

It may look like TypeScript is simply guessing the type.

It is not.

TypeScript analyzes the code and uses the information available to determine the type.

For example:

```ts
let score = 95;
```

TypeScript sees the value:

```text
95
 ↓
number
```

So it understands:

```text
score → number
```

But there is an important mechanical detail I need to understand.

## Type Locking

When I declare a variable like this:

```ts
let score = 95;
```

TypeScript immediately analyzes the value `95`.

At that point, it determines:

```text
95 → number
```

and the variable's allowed type becomes:

```text
score → number
```

I can think of this as **Type Locking**.

The variable is not locked to the exact value `95` because it is a `let` variable.

It is locked to the **general data type**:

```text
number
```

So this is allowed:

```ts
score = 100;
score = 50;
score = 99.5;
```

because all of them are numbers.

But this is not:

```ts
score = "95";
```

because `"95"` is a string.

The mental model is:

```text
let score = 95
       ↓
TypeScript sees 95
       ↓
95 is a number
       ↓
score → number
       ↓
Type is now locked
       ↓
Future assignments must be compatible with number
```

So TypeScript is not repeatedly guessing the type every time I assign something.

It establishes the variable's type from the available information and then uses that type to check future usage.

---

# 5. Why Does TypeScript Lock the Type?

This type locking exists to protect me from accidentally changing the kind of data stored in a variable.

Suppose I write:

```ts
let age = 20;
```

TypeScript understands:

```text
age → number
```

Later I accidentally write:

```ts
age = "twenty";
```

If TypeScript allowed this silently, I could end up with code that expects `age` to behave like a number but actually contains a string.

For example:

```ts
let age = 20;

age = "twenty";

console.log(age.toFixed(2));
```

JavaScript would eventually encounter a problem because strings don't have the same methods as numbers.

TypeScript catches the problem earlier.

The flow is:

```text
Initial value
     ↓
TypeScript determines the type
     ↓
Variable gets a type boundary
     ↓
Future assignments are checked
     ↓
Wrong type?
     ↓
Compile-time error
```

This is one of the core reasons TypeScript is useful.

---

# 6. Explicit Type vs Inferred Type

Both of these are valid:

### Explicit Type

```ts
let age: number = 20;
```

Here, I explicitly tell TypeScript:

```text
age → number
```

### Inferred Type

```ts
let age = 20;
```

Here, I give TypeScript enough information:

```text
20
 ↓
number
 ↓
age → number
```

So:

```text
Type Annotation
→ I tell TypeScript the type.

Type Inference
→ TypeScript determines the type from the code.
```

---

# 7. Why Type Inference Is Useful

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

This gives me:

> Type safety without unnecessary repetition.

---

# 8. Type Inference With Functions

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

function result
  ↓
number
```

So this is valid:

```ts
const result = add(10, 20);
```

TypeScript understands:

```text
result → number
```

This is another example of inference.

---

# 9. What Happens Internally?

When TypeScript sees:

```ts
let age = 20;
```

it analyzes the code during compilation.

A simplified flow is:

```text
TypeScript Code
      ↓
TypeScript Parser
      ↓
AST
      ↓
Type Checker
      ↓
Analyzes the variable
      ↓
Sees the value 20
      ↓
Determines → number
      ↓
Locks age to number
      ↓
Checks future usage
      ↓
Generate JavaScript
```

The important point is:

> Type inference is part of TypeScript's compile-time analysis.

It happens before my JavaScript program runs.

---

# 10. `let` vs `const`

There is an important difference between `let` and `const` when TypeScript performs inference.

## `let`

Consider:

```ts
let age = 20;
```

TypeScript generally infers:

```text
age → number
```

Why?

Because `let` allows the variable to be reassigned:

```ts
age = 21;
age = 30;
age = 40;
```

The exact value can change.

So TypeScript locks the variable to the **general data type**:

```text
number
```

The mental model is:

```text
let
 ↓
Value can change
 ↓
Type remains compatible
 ↓
number
```

So:

```ts
let age = 20;

age = 21;       // valid
age = 100;      // valid
age = "hello";  // error
```

The value can change, but the type cannot arbitrarily change.

---

## `const`

Now consider:

```ts
const age = 20;
```

`const` cannot be reassigned:

```ts
age = 21; // error
```

Because the value itself cannot change, TypeScript can preserve more specific information.

It can infer:

```text
age → 20
```

rather than simply:

```text
age → number
```

This `20` is called a **Literal Type**.

The mental model is:

```text
const
 ↓
Value cannot change
 ↓
TypeScript can preserve the exact value
 ↓
20
```

Another example:

```ts
const role = "admin";
```

TypeScript can understand:

```text
role → "admin"
```

rather than just:

```text
role → string
```

So the important difference is:

```text
let
 ↓
General data type
 ↓
number

const
 ↓
Exact unchangeable value
 ↓
20
```

This becomes more important when I learn **Literal Types** and **Union Types**.

---

# 11. The Uninitialized Variable Trap

This is a very important case that I should not overlook.

Consider:

```ts
let a;
```

I declared a variable, but I did not give TypeScript an initial value.

There is no value for TypeScript to analyze.

Compare:

```ts
let age = 20;
```

Here TypeScript sees:

```text
20
 ↓
number
 ↓
age → number
```

But with:

```ts
let a;
```

there is no useful value from which TypeScript can infer the intended type.

In common TypeScript configurations, this can cause the variable to be inferred as:

```text
any
```

This is dangerous because `any` effectively disables type checking for that value.

---

## Why `any` Is Dangerous Here

Suppose:

```ts
let a;
```

and TypeScript treats `a` as `any`.

Now I can do:

```ts
a = 20;
a = "hello";
a = true;
a = [];
a = {};
```

TypeScript may allow all of these because `any` tells TypeScript to stop enforcing normal type safety for that value.

I could even write:

```ts
a.randomMethod();
```

and TypeScript may not complain.

But at runtime:

```text
a.randomMethod()
       ↓
JavaScript tries to execute it
       ↓
randomMethod does not exist
       ↓
Runtime error
```

This is exactly the kind of bug TypeScript is supposed to help me prevent.

---

## The Difference

With initialization:

```ts
let age = 20;
```

I give TypeScript information:

```text
20
 ↓
number
 ↓
age → number
```

Without initialization:

```ts
let age;
```

there is no value from which TypeScript can determine my intended type.

So I should be careful with uninitialized variables.

If I know the type, I should explicitly communicate it:

```ts
let age: number;
```

Now TypeScript knows:

```text
age → number
```

and I cannot later assign a string:

```ts
age = 20;       // valid
age = "twenty"; // error
```

The important lesson is:

> If I don't give TypeScript a value from which it can infer the type, I should provide the type myself when the variable needs a specific type.

---

# 12. Type Inference Happens Before Runtime

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
TypeScript analyzes the code
    ↓
Infers age → number
    ↓
Checks future assignment
    ↓
"twenty" → string
    ↓
Type mismatch
    ↓
Error
```

JavaScript itself does not understand TypeScript's type annotations.

After compilation, TypeScript type information is removed.

For example:

```ts
let age: number = 20;
```

roughly becomes:

```js
let age = 20;
```

The `number` annotation does not exist at runtime.

This is called **Type Erasure**.

---

# 13. TypeScript Types Are Compile-Time Information

This distinction is extremely important.

TypeScript:

```text
Compile Time
     ↓
Analyzes types
     ↓
Checks my code
     ↓
Reports errors
     ↓
Generates JavaScript
```

JavaScript:

```text
Runtime
   ↓
JavaScript executes
   ↓
Node.js / Browser
```

So when I write:

```ts
let age: number = 20;
```

the `number` part is useful to TypeScript during compilation.

It does not become a runtime feature.

Conceptually:

```text
TypeScript
    ↓
Type information
    ↓
Used for checking
    ↓
Type erasure
    ↓
JavaScript
    ↓
Runtime
```

---

# 14. Should I Always Write Types?

No.

I should not write types just for the sake of writing types.

If the type is obvious:

```ts
const name = "Vivek";
const age = 20;
```

Inference is usually enough.

But sometimes the type is not obvious or I want to communicate a specific restriction.

For example:

```ts
let username: string;
let userId: number;
```

Here the annotation communicates my intention.

Another example:

```ts
let status: "success" | "error";
```

Here I am explicitly restricting the variable to specific allowed values.

So I should use annotations when they provide useful information or enforce a constraint.

---

# 15. My Rule for Type Inference

My basic rule is:

```text
If the type is obvious
        ↓
Let TypeScript infer it.

If the type needs to be communicated,
restricted, or isn't available for inference
        ↓
Use an annotation.
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

The goal is not:

> Write as many types as possible.

The goal is:

> Write clear and type-safe code.

---

# 16. Complete Type Locking Flow

When I write:

```ts
let age = 20;
```

I should mentally understand what happens:

```text
I write:
let age = 20
      ↓
TypeScript analyzes the declaration
      ↓
It sees the value 20
      ↓
20 is a number
      ↓
age is inferred as number
      ↓
age's allowed type is locked to number
      ↓
Future assignments are checked
      ↓
age = 21
      ↓
21 is a number
      ↓
Allowed

But:

age = "hello"
      ↓
"hello" is a string
      ↓
String is not assignable to number
      ↓
Compile-time error
```

This is the core mechanical idea behind Type Inference.

---

# 17. Complete Flow

The complete mental model for this lesson is:

```text
I write TypeScript
      ↓
TypeScript Parser
      ↓
AST
      ↓
Type Checker
      ↓
Analyze the variable
      ↓
Is there an initial value?
      ↓
   ┌───────────────┐
   │               │
  Yes              No
   │               │
   ↓               ↓
Analyze value    No useful value
   │               │
   ↓               ↓
Infer type       May become any
   │               │
   ↓               ↓
Type is locked   Type safety weakened
   │
   ↓
Check future usage
   ↓
TypeScript reports errors
   ↓
JavaScript generated
   ↓
JavaScript runs
```

The most important path is:

```text
Value
  ↓
TypeScript analyzes it
  ↓
Type is inferred
  ↓
Type is locked
  ↓
Future usage is checked
```

---

# Things I Should Remember

* TypeScript has primitive types such as `string`, `number`, and `boolean`.
* A type annotation explicitly tells TypeScript the expected type.
* Type inference allows TypeScript to determine a type automatically.
* TypeScript is not randomly guessing; it analyzes the code.
* When an initialized `let` variable is inferred, its allowed type is established from the initial value.
* `let` generally locks to a **general data type**, such as `number`.
* `const` can preserve the **exact literal value**, such as `20` or `"admin"`.
* A variable's value can change with `let`, but its type still has to remain compatible.
* TypeScript can infer function return types.
* Type checking happens during compile-time analysis.
* TypeScript type annotations are erased when JavaScript is generated.
* An uninitialized variable such as `let a;` gives TypeScript no initial value from which to infer the intended type.
* In common configurations, such a variable can become `any`, which weakens or disables type safety.
* If I know an uninitialized variable should have a specific type, I should annotate it.
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

---

### 2. What is the difference?

```ts
let age: number = 20;
```

and:

```ts
let age = 20;
```

**Answer:**

The first explicitly tells TypeScript:

```text
age → number
```

The second gives TypeScript a value from which it can infer:

```text
20
 ↓
number
 ↓
age → number
```

---

### 3. Can JavaScript see TypeScript's types at runtime?

**Answer:**

No.

TypeScript's type information is used during compile-time checking and is removed when JavaScript is generated.

For example:

```ts
let age: number = 20;
```

becomes roughly:

```js
let age = 20;
```

So the JavaScript runtime does not see the `: number` annotation.

---

### 4. What happens when I write this?

```ts
let a;
```

**Answer:**

TypeScript has no initial value from which to infer the intended type.

In common configurations, this can cause `a` to be inferred as `any`.

That is dangerous because `any` weakens type checking and can allow invalid operations to slip through until runtime.

If I know the intended type, I should write:

```ts
let a: number;
```

---

# What I Learned From This Lesson

In this lesson, I learned that TypeScript does not require me to manually specify the type of every variable.

When I write:

```ts
let age = 20;
```

TypeScript analyzes the initial value:

```text
20
 ↓
number
 ↓
age → number
```

It then uses that type information to check how I use `age` later.

The important concept I want to remember is **Type Locking**:

```text
Initial value
     ↓
TypeScript determines the type
     ↓
Variable's allowed type is established
     ↓
Future assignments must match that type
```

With `let`, the variable can change its **value**, but not freely change its **type**.

With `const`, TypeScript can often preserve the **exact literal value** because the variable cannot be reassigned.

I also learned why uninitialized variables can be dangerous:

```ts
let a;
```

There is no initial value for TypeScript to use for normal inference, and in common configurations this can lead to `any`.

So my main takeaway is:

> **Type Annotation means I explicitly tell TypeScript the type.**

> **Type Inference means TypeScript determines the type from the information in my code.**

> **Type Locking means the inferred type becomes the boundary that future assignments must respect.**

And the complete mental model is:

```text
Value
  ↓
TypeScript analyzes it
  ↓
Type is inferred
  ↓
Type is locked
  ↓
Future usage is checked
  ↓
JavaScript is generated
  ↓
JavaScript runs
```

---

# Next Lesson

## Lesson 4 — Union Types and Type Narrowing

In the next lesson, I will learn how a single variable can safely represent more than one possible type.

I will learn:

* What Union Types are
* How the `|` operator works
* Why a value can have multiple possible types
* What Type Narrowing means
* How `typeof` helps narrow primitive types
* How `in` can narrow object types
* How `instanceof` works with classes
* How equality checks can narrow types
* Why Type Narrowing makes Union Types safe
* The difference between Union Types and `any`
* What TypeScript knows before and after narrowing
* What happens internally during narrowing
* The complete compile-time and runtime flow
