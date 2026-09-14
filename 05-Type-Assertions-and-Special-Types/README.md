# 05 — Type Assertions and Special Types

In this lesson, I am learning about some TypeScript types and features that become important when TypeScript **doesn't know exactly what type of value I have**.

The main topics are:

* Type Assertions
* `as` syntax
* `any`
* `unknown`
* `void`
* `never`
* Type Assertion vs Type Narrowing

---

# 1. The Main Problem

Before understanding these concepts individually, I want to understand the problem they solve.

Normally, TypeScript knows the type of my variable:

```ts
let username: string = "Vivek";
```

TypeScript knows:

```text
username → string
```

So it allows:

```ts
console.log(username.toUpperCase());
```

But sometimes TypeScript doesn't know the exact type.

For example:

```ts
let value: unknown = "Hello";
```

Now TypeScript only knows:

```text
value → unknown
```

It does **not** know whether `value` is:

```text
string
number
boolean
object
array
...
```

So TypeScript will not allow me to use it as if it were a specific type.

This is where concepts like **`unknown`, type narrowing, and type assertions** become important.

---

# 2. `any`

Let's start with `any` because it is the easiest to understand.

When I write:

```ts
let value: any = "Hello";
```

I am basically telling TypeScript:

> "I don't want you to check this value."

Now I can do almost anything:

```ts
value = 100;
value = true;

value.toUpperCase();
value.foo.bar();
value();
```

TypeScript won't complain about these operations.

### The Problem with `any`

Consider:

```ts
let age: any = 20;

age.toUpperCase();
```

TypeScript allows it.

But JavaScript will fail at runtime because a number doesn't have a `toUpperCase()` method.

So:

```text
any
↓
TypeScript stops protecting me.
```

### My Rule for `any`

I should avoid using `any` unless I have a specific reason.

If I genuinely don't know the type, I should usually prefer:

```ts
unknown
```

---

# 3. `unknown`

`unknown` also means:

> "I don't know the type of this value."

For example:

```ts
let value: unknown = "Hello";
```

The difference from `any` is extremely important.

With `any`:

```ts
let value: any = "Hello";

value.toUpperCase();
```

TypeScript says:

```text
"Okay, I'll trust you."
```

With `unknown`:

```ts
let value: unknown = "Hello";

value.toUpperCase(); // ❌
```

TypeScript says:

```text
"I don't know whether this is a string.
Prove it first."
```

This is why `unknown` is safer.

---

# 4. Using `unknown` Safely

If I have an `unknown` value, I first check what it actually is.

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

The important part is:

```ts
typeof value === "string"
```

This is a real check performed while the program is running.

After this check, TypeScript understands:

```text
Inside this block:

value → string
```

So this works:

```ts
value.toUpperCase();
```

This process is called:

# Type Narrowing

---

# 5. Type Narrowing

Type narrowing means:

> I perform a check, and TypeScript uses that check to understand the more specific type.

For example:

```ts
let value: unknown = "Vivek";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

Before the check:

```text
value → unknown
```

After the check:

```text
value → string
```

So I can think of narrowing like this:

```text
unknown
   ↓
   ↓ typeof check
   ↓
string
```

### Another Example

```ts
let value: unknown = 100;

if (typeof value === "number") {
    console.log(value.toFixed(2));
}
```

Before the check:

```text
value → unknown
```

After:

```text
value → number
```

Now TypeScript allows number methods.

### The Important Idea

Type narrowing is based on **evidence**.

I check the value first.

```text
"I checked it."
       ↓
TypeScript understands the type.
```

---

# 6. Type Assertions

Now comes type assertion.

Sometimes **I already know something about a value**, but TypeScript doesn't know it.

For example:

```ts
let value: unknown = "Hello TypeScript";
```

TypeScript sees:

```text
value → unknown
```

But I know:

```text
value → string
```

I can tell TypeScript this using a type assertion:

```ts
let text = value as string;
```

The syntax is:

```ts
value as Type
```

So:

```ts
value as string
```

means:

> "Treat this value as a string from the TypeScript type-system perspective."

Now I can write:

```ts
console.log(text.length);
console.log(text.toUpperCase());
```

---

# 7. Type Assertion Does NOT Convert the Value

This is one of the most important things I learned.

Consider:

```ts
let value: unknown = "100";

let number = value as number;
```

It may look like I converted `"100"` into `100`.

But I did **not**.

The actual runtime value is still:

```text
"100"
```

It is still a string.

Type assertion only changes what **TypeScript believes** about the value.

It does not perform a JavaScript conversion.

### Type Assertion

```ts
value as number
```

means:

```text
"TypeScript, treat this as a number."
```

### Type Conversion

Something like:

```ts
Number("100")
```

actually converts the value.

```text
"100"
  ↓
Number("100")
  ↓
100
```

So I should never confuse:

```ts
value as number
```

with:

```ts
Number(value)
```

They do completely different things.

---

# 8. Type Assertion vs Type Narrowing

This is where the two concepts can become confusing.

Both can help TypeScript understand a more specific type.

But they work differently.

## Type Assertion

I tell TypeScript:

```ts
let value: unknown = "Hello";

let text = value as string;
```

I am saying:

> "I know this is a string. Trust me."

There is no runtime check here.

---

## Type Narrowing

I check the value:

```ts
let value: unknown = "Hello";

if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

I am saying:

> "Check whether this is a string."

TypeScript sees the check and narrows the type.

---

## The Difference

```text
TYPE ASSERTION

I tell TypeScript:
"I know the type."

        ↓

value as string
```

```text
TYPE NARROWING

I check the value:
"Let's find out the type."

        ↓

typeof value === "string"
```

So I should remember:

```text
Assertion → I tell
Narrowing  → I check
```

### Which One Is Safer?

Type narrowing is generally safer because it is based on an actual runtime check.

For example:

```ts
if (typeof value === "string") {
    // TypeScript knows it is a string here.
}
```

With an assertion:

```ts
let text = value as string;
```

I am responsible for being correct.

If I'm wrong, TypeScript won't save me.

---

# 9. `as` Syntax

The syntax I will mainly use is:

```ts
const value = something as string;
```

For example:

```ts
let data: unknown = "Vivek";

let username = data as string;

console.log(username.toUpperCase());
```

There is another syntax:

```ts
let username = <string>data;
```

But I will mainly use:

```ts
data as string
```

because the angle-bracket syntax can conflict with **JSX**.

So the syntax I want to remember is:

```ts
value as Type
```

---

# 10. `void`

Now let's move away from `unknown` and assertions.

`void` is commonly used with functions that **do not return a useful value**.

For example:

```ts
function greet(): void {
    console.log("Hello");
}
```

When I call:

```ts
greet();
```

the function runs.

It prints:

```text
Hello
```

But it doesn't give me a useful value back.

So:

```text
void
↓
The function finishes,
but doesn't return a useful value.
```

Another example:

```ts
function printName(name: string): void {
    console.log(name);
}
```

The function performs an action but doesn't return a value that I need to use.

---

# 11. `never`

`never` is different from `void`.

`never` means:

> This function never successfully reaches a normal return.

For example:

```ts
function throwError(message: string): never {
    throw new Error(message);
}
```

The function throws an error and stops.

It never reaches:

```ts
return;
```

Another example:

```ts
function infiniteLoop(): never {
    while (true) {
    }
}
```

This function keeps running forever.

It never reaches the end.

---

# 12. `void` vs `never`

This difference is important.

### `void`

The function **finishes normally**.

```ts
function greet(): void {
    console.log("Hello");
}
```

Flow:

```text
Start
  ↓
Print "Hello"
  ↓
Function finishes
```

### `never`

The function **does not finish normally**.

```ts
function throwError(): never {
    throw new Error("Something went wrong");
}
```

Flow:

```text
Start
  ↓
Throw error
  ↓
Function stops
```

So I remember:

```text
void
→ Function finishes normally
→ No useful value is returned


never
→ Function never reaches a normal return
```

---

# 13. Everything Together

Now I can connect all the concepts.

Suppose I have:

```ts
let value: unknown = "Vivek";
```

TypeScript says:

```text
"I don't know what this is."
```

### Option 1 — Narrow the Type

I check it:

```ts
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

I'm giving TypeScript actual evidence.

```text
unknown
   ↓
typeof check
   ↓
string
```

### Option 2 — Assert the Type

I already know what it is:

```ts
let username = value as string;
```

I'm telling TypeScript:

```text
"I know this is a string."
```

### Option 3 — Use `any`

I could do:

```ts
let value: any = "Vivek";
```

Now TypeScript basically says:

```text
"Do whatever you want."
```

But I lose type safety.

---

# 14. The Mental Model I Want to Remember

This is the simplest way I want to remember these concepts:

```text
any
↓
"Don't check me."

unknown
↓
"You don't know my type yet.
Check me before using me."

Type Narrowing
↓
"Let's check what type I actually have."

Type Assertion
↓
"I already know the type.
Trust what I'm telling you."

void
↓
"The function finishes,
but doesn't return a useful value."

never
↓
"The function never reaches
a normal return."
```

---

# 15. Quick Comparison

| Concept        | What I am basically saying                                   |
| -------------- | ------------------------------------------------------------ |
| `any`          | "Don't check this value."                                    |
| `unknown`      | "The type is unknown, so check it before using it."          |
| Type Narrowing | "I checked the value, so TypeScript can determine its type." |
| Type Assertion | "I know the type, so treat it as this type."                 |
| `void`         | "This function finishes without returning a useful value."   |
| `never`        | "This function never reaches a normal return."               |

---

# What I Learned

The biggest thing I learned from this lesson is that **TypeScript's types don't automatically change JavaScript values at runtime**.

For example:

```ts
let value: unknown = "100";

let number = value as number;
```

This does **not** convert `"100"` into `100`.

The runtime value is still:

```text
"100"
```

I also learned the difference between `any` and `unknown`:

```text
any
→ TypeScript trusts me.

unknown
→ TypeScript makes me check first.
```

I learned that **type narrowing** and **type assertion** are not the same:

```text
Type Narrowing
→ I check the value.

Type Assertion
→ I tell TypeScript the type.
```

When possible, I should prefer narrowing because it is based on an actual check.

Finally:

```text
void
→ Function finishes normally without a useful return value.

never
→ Function never reaches a normal return.
```

The most important mental model from this lesson is:

```text
Don't know the type?
        ↓
     unknown
        ↓
   Check the value
        ↓
  Type Narrowing

Already know the type?
        ↓
  Type Assertion
        ↓
   value as Type

Don't want type checking?
        ↓
       any

Function finishes with no useful value?
        ↓
       void

Function never normally returns?
        ↓
      never
```
