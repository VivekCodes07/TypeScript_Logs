# 07 — Functions in TypeScript

## 1. Why Am I Learning Functions in TypeScript?

I already know how functions work in JavaScript.

But now I am using TypeScript, so I need to understand how to tell TypeScript:

* What type of values a function accepts
* What type of value it returns
* Which parameters are optional
* Which parameters have default values
* How to describe a function itself as a type
* How arrow functions work with types
* How rest parameters are typed

This becomes very important in backend development because I will constantly create functions for:

* Processing requests
* Validating data
* Finding users
* Creating orders
* Returning responses
* Working with databases

So the goal is not just to learn function syntax again.

The goal is to understand **how TypeScript adds type safety to functions.**

---

# 2. The Main Problem

In JavaScript, I can write:

```ts
function add(a, b) {
    return a + b;
}
```

JavaScript does not tell me what `a` and `b` are supposed to be.

I could pass:

```ts
add(10, 20);
add("10", "20");
add(true, false);
```

Some of these may not behave the way I intended.

With TypeScript, I can describe the function:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

Now TypeScript knows:

```text
a → number
b → number
return value → number
```

This is the main idea of typed functions.

---

# 3. Typing Function Parameters

The basic syntax is:

```ts
function functionName(parameter: type) {
}
```

For example:

```ts
function greet(name: string) {
    console.log("Hello", name);
}

greet("Vivek");
```

If I do:

```ts
greet(100);
```

TypeScript gives an error because the function expects a `string`.

I can type multiple parameters:

```ts
function add(a: number, b: number) {
    return a + b;
}
```

Now both parameters must be numbers.

---

# 4. Typing the Return Value

I can also tell TypeScript what the function should return.

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

The `: number` after `)` describes the return type.

So I can read this as:

```text
add()
  ↓
takes two numbers
  ↓
returns a number
```

Another example:

```ts
function getUsername(): string {
    return "Vivek";
}
```

The function must return a string.

---

# 5. Do I Always Need to Write the Return Type?

No.

TypeScript can often infer the return type.

For example:

```ts
function add(a: number, b: number) {
    return a + b;
}
```

TypeScript can understand that the return type is:

```ts
number
```

because `a + b` produces a number.

So this:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

and this:

```ts
function add(a: number, b: number) {
    return a + b;
}
```

both work.

For learning and important functions, explicitly writing the return type can make the function easier for me to understand.

---

# 6. What Happens If I Return the Wrong Type?

Suppose I say:

```ts
function getAge(): number {
    return "20";
}
```

TypeScript will complain.

Why?

Because I told TypeScript:

```text
This function returns a number.
```

But I actually returned:

```text
string
```

So TypeScript catches the mismatch before I run the code.

This is one of the main benefits of TypeScript functions.

---

# 7. Optional Parameters

Sometimes a parameter does not have to be provided.

For example:

```ts
function greet(name: string, age?: number) {
    console.log(name);
}
```

Here:

```ts
name → required
age → optional
```

So both are valid:

```ts
greet("Vivek");

greet("Vivek", 20);
```

The `?` means that the parameter may or may not exist.

I should remember:

```ts
age?: number
```

is basically saying:

```text
age can be a number,
but it can also be undefined.
```

So if I actually want to use it, I may need to check it.

```ts
function greet(name: string, age?: number) {

    if (age !== undefined) {
        console.log(name, age);
    } else {
        console.log(name);
    }
}
```

---

# 8. Default Parameters

Sometimes I want a parameter to have a default value.

```ts
function greet(name: string, age: number = 20) {
    console.log(name, age);
}
```

Now I can call:

```ts
greet("Vivek");
```

and TypeScript/JavaScript uses:

```text
age = 20
```

I can also provide the value:

```ts
greet("Vivek", 21);
```

Then:

```text
age = 21
```

The important difference is:

```text
Optional parameter
→ value may be undefined

Default parameter
→ missing value gets a default value
```

---

# 9. Optional vs Default Parameters

I should not confuse these two.

### Optional parameter

```ts
function greet(name: string, age?: number) {
}
```

If I don't provide `age`:

```text
age → undefined
```

### Default parameter

```ts
function greet(name: string, age: number = 20) {
}
```

If I don't provide `age`:

```text
age → 20
```

Mental model:

```text
?       → maybe there is a value

= value → use this value if nothing is provided
```

---

# 10. Function Types

So far I have been typing the parameters and return value of a function.

But I can also describe the **function itself as a type**.

For example:

```ts
let add: (a: number, b: number) => number;
```

This means:

```text
add must be a function
that takes two numbers
and returns a number
```

Now I can assign a function:

```ts
let add: (a: number, b: number) => number;

add = function (a, b) {
    return a + b;
};
```

I can also use an arrow function:

```ts
let multiply: (a: number, b: number) => number;

multiply = (a, b) => {
    return a * b;
};
```

The important part is:

```ts
(a: number, b: number) => number
```

This describes the **shape of the function**.

---

# 11. Arrow Functions in TypeScript

Arrow functions work almost the same way as in JavaScript.

I just add types to the parameters.

```ts
const add = (a: number, b: number): number => {
    return a + b;
};
```

I can also let TypeScript infer the return type:

```ts
const add = (a: number, b: number) => {
    return a + b;
};
```

For a simple one-line function:

```ts
const square = (num: number): number => num * num;
```

So the basic structure is:

```text
(parameter: type) => return type
```

---

# 12. Rest Parameters

Sometimes I don't know how many values will be passed to a function.

JavaScript gives me rest parameters:

```ts
function addAll(...numbers) {
}
```

In TypeScript, I need to type them.

```ts
function addAll(...numbers: number[]): number {

    let total = 0;

    for (let number of numbers) {
        total += number;
    }

    return total;
}
```

Now I can pass any number of numbers:

```ts
addAll(10, 20);

addAll(10, 20, 30);

addAll(10, 20, 30, 40);
```

The important thing is:

```ts
...numbers: number[]
```

means:

```text
numbers is an array of numbers
```

---

# 13. Functions Can Accept Objects Too

Since I have already learned object types, I can use them with functions.

For example:

```ts
function printUser(user: {
    id: number;
    name: string;
}) {
    console.log(user.id);
    console.log(user.name);
}
```

Now the function expects an object with:

```text
id   → number
name → string
```

I can call:

```ts
printUser({
    id: 101,
    name: "Vivek"
});
```

This is very similar to what I will do later in backend code when functions receive user data, request data, product data, etc.

---

# 14. Functions With No Useful Return Value

Sometimes a function performs an action but does not return a useful value.

For example:

```ts
function printMessage(message: string): void {
    console.log(message);
}
```

Here the function performs an action and finishes.

It doesn't return a useful value.

This connects with what I learned in Lesson 05 about `void`.

```text
void
→ function finishes normally
→ no useful return value
```

---

# 15. Function Type vs Function Return Type

These can look confusing at first.

### Return type

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

Here:

```ts
: number
```

means:

```text
The function returns a number.
```

### Function type

```ts
let add: (a: number, b: number) => number;
```

Here:

```ts
(a: number, b: number) => number
```

describes the whole function:

```text
parameters → return type
```

Mental model:

```text
function declaration
→ tells me how the function works

function type
→ describes what kind of function can be stored here
```

---

# 16. Everything Together

Now I can combine the concepts:

```ts
function calculateTotal(
    price: number,
    quantity: number = 1,
    discount?: number
): number {

    let total = price * quantity;

    if (discount !== undefined) {
        total = total - discount;
    }

    return total;
}
```

Here I have:

```text
price
→ required number

quantity
→ number with a default value

discount
→ optional number

return
→ number
```

This is the kind of function structure I will see frequently in real applications.

---

# 17. How This Fits My Backend Goal

Functions are everywhere in backend development.

For example, later I might have:

```ts
function createUser(name: string, email: string) {
    // create user
}
```

Or:

```ts
function calculateOrderTotal(price: number, quantity: number) {
    return price * quantity;
}
```

Or:

```ts
function validateEmail(email: string): boolean {
    // validation logic
}
```

TypeScript allows me to make the expected input and output clear.

So when I work with:

```text
Node.js
    ↓
Express
    ↓
Controllers
    ↓
Services
    ↓
Database
```

I will be writing and passing functions everywhere.

---

# 18. Common Mistakes

### Mistake 1: Forgetting parameter types

```ts
function add(a, b) {
    return a + b;
}
```

When I know the expected types, I should type them:

```ts
function add(a: number, b: number): number {
    return a + b;
}
```

### Mistake 2: Confusing `?` with default values

```ts
age?: number
```

and:

```ts
age: number = 20
```

do not mean the same thing.

### Mistake 3: Thinking TypeScript changes JavaScript function behavior

TypeScript adds type checking.

It does not create a completely different function system.

### Mistake 4: Using `any` everywhere

I could do:

```ts
function add(a: any, b: any) {
    return a + b;
}
```

But now I lose much of the type safety I am trying to get from TypeScript.

### Mistake 5: Over-typing everything

I don't need to manually specify every type when TypeScript can safely infer it.

The goal is useful type safety, not writing types everywhere just for the sake of it.

---

# 19. My Mental Model

I want to remember functions like this:

```text
Parameters
    ↓
What does the function receive?

Parameter types
    ↓
What kind of values are allowed?

Optional parameter
    ↓
This value may not be provided.

Default parameter
    ↓
Use this value when nothing is provided.

Return type
    ↓
What does the function give back?

Function type
    ↓
What kind of function can be stored here?

Rest parameter
    ↓
I can receive multiple values as an array.
```

---

# 20. Final Flow

When I see a TypeScript function, I should be able to read it from left to right:

```ts
function greet(name: string, age?: number): string {
    return `Hello ${name}`;
}
```

I read it as:

```text
function greet
      ↓
takes name → string
      ↓
takes age → optional number
      ↓
returns → string
```

For an arrow function:

```ts
const add = (a: number, b: number): number => {
    return a + b;
};
```

I read it as:

```text
add
 ↓
takes two numbers
 ↓
returns a number
```

That is the main idea of typed functions.

---

# 21. Self-Test

Before moving to the next lesson, I should be able to answer:

1. How do I type a function parameter?
2. How do I specify a function's return type?
3. Can TypeScript infer a function's return type?
4. What does `?` mean on a function parameter?
5. What is the difference between an optional and a default parameter?
6. How do I type an arrow function?
7. What is a function type?
8. What does `(a: number, b: number) => number` mean?
9. How do I type a rest parameter?
10. What is the purpose of `void` in a function?
11. Why is function typing useful in backend development?

If I can explain these without memorizing the syntax blindly, I understand the lesson.

---

# 22. Final Recap

The main things I learned:

```text
Parameter type
→ controls what the function accepts

Return type
→ describes what the function returns

Optional parameter
→ value may be missing

Default parameter
→ missing value gets a default

Function type
→ describes the complete function shape

Arrow function
→ normal JS arrow function with TypeScript types

Rest parameter
→ multiple arguments collected into a typed array

void
→ function finishes without returning a useful value
```

The main goal is:

```text
JavaScript Functions
        ↓
Add TypeScript Types
        ↓
Type-safe Inputs
        ↓
Type-safe Outputs
        ↓
Safer Backend Functions
```

I don't need to memorize every function-related feature right now.

I need to be comfortable reading and writing typed functions because functions will be one of the most common things I use when I move into Node.js and Express.
