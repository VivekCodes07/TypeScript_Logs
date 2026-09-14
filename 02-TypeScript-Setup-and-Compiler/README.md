# Lesson 2 — TypeScript Setup and Compiler

## What am I learning in this lesson?

In Lesson 1, I understood what TypeScript is and why it exists.

Now I want to understand how TypeScript actually works when I write and run code.

I want to know:

* How to install TypeScript
* What `tsc` is
* What happens when I compile a `.ts` file
* What `tsconfig.json` does
* The difference between compile time and runtime
* What TypeScript does internally at a basic level
* What file actually gets executed
* The complete execution flow from `.ts` file to running program

The most important thing in this lesson is understanding this:

> **TypeScript checks and generates. JavaScript runs.**

---

# 1. Before starting: What am I actually setting up?

When I write a file like:

```typescript
const message: string = "Hello TypeScript";
```

I am writing TypeScript.

The file will usually have the extension:

```text
.ts
```

For example:

```text
index.ts
```

But JavaScript runtimes such as Node.js normally execute JavaScript.

So my TypeScript code needs to go through the TypeScript compiler first.

The complete idea is:

```text
I write TypeScript
        ↓
TypeScript Compiler checks it
        ↓
JavaScript is generated
        ↓
JavaScript Runtime runs it
```

This is the main flow I need to understand.

---

# 2. Installing TypeScript

TypeScript is available as an npm package.

I can install it globally using:

```bash
npm install -g typescript
```

After installing it, I can check whether it is available:

```bash
tsc --version
```

Here:

```text
tsc
```

means:

```text
TypeScript Compiler
```

So when I run a command starting with `tsc`, I am asking the TypeScript compiler to do something.

---

# 3. What exactly is `tsc`?

`tsc` is the command-line TypeScript compiler.

Suppose I have this file:

```text
index.ts
```

Inside it:

```typescript
const age: number = 20;

console.log(age);
```

Now I run:

```bash
tsc index.ts
```

I can think of this command as saying:

> "TypeScript compiler, take this file, understand it, check it, and generate JavaScript from it."

The flow is:

```text
index.ts
    ↓
tsc index.ts
    ↓
TypeScript Compiler
    ↓
index.js
```

---

# 4. The complete flow: From my code to execution

This is the most important part of this lesson.

Suppose I write:

```typescript
const age: number = 20;

console.log(age);
```

inside:

```text
index.ts
```

Now the complete process is:

```text
STEP 1: I write the code

index.ts
    ↓

const age: number = 20;
console.log(age);


STEP 2: I run the compiler

tsc index.ts
    ↓


STEP 3: TypeScript reads and understands my code

Parser
    ↓
Understands the structure of the program


STEP 4: TypeScript checks the types

age → number
20  → number

Everything is valid.
    ↓


STEP 5: TypeScript generates JavaScript

index.js
    ↓

const age = 20;
console.log(age);


STEP 6: JavaScript runtime executes the JavaScript

node index.js
    ↓


STEP 7: My program runs

20
```

So the complete flow is:

```text
index.ts
    ↓
tsc
    ↓
Parse
    ↓
Type Check
    ↓
Transform
    ↓
Emit JavaScript
    ↓
index.js
    ↓
Node.js / Browser
    ↓
JavaScript Executes
```

---

# 5. Compile time vs runtime

This is where I need to be very clear.

There are two different phases.

## Compile Time

This is when TypeScript processes my code.

For example:

```typescript
let age: number = "20";
```

I run:

```bash
tsc index.ts
```

TypeScript sees:

```text
age should contain → number
I gave it          → string
```

So TypeScript reports an error.

This is happening during the TypeScript checking process.

This phase is:

```text
COMPILE TIME
```

---

## Runtime

Runtime starts when the JavaScript program actually executes.

For example:

```javascript
console.log("Hello");
```

When Node.js runs:

```bash
node index.js
```

Node.js executes the JavaScript.

This phase is:

```text
RUNTIME
```

So I need to separate these clearly:

```text
COMPILE TIME
────────────────────────

TypeScript
    ↓
Parse
    ↓
Type Check
    ↓
Generate JavaScript


RUNTIME
────────────────────────

JavaScript
    ↓
Node.js / Browser
    ↓
Program Executes
```

---

# 6. One important rule: `tsc` does not run my program

This is something I should never confuse.

When I run:

```bash
tsc index.ts
```

I am **not executing my TypeScript program**.

I am asking TypeScript to process the code and generate JavaScript.

Then I run the JavaScript separately:

```bash
node index.js
```

So:

```text
tsc
 ↓
Checks + Generates
```

while:

```text
node
 ↓
Executes
```

The full process is:

```text
index.ts
    ↓
tsc index.ts
    ↓
index.js is generated
    ↓
node index.js
    ↓
Program executes
```

My simple mental rule is:

> **`tsc` creates the JavaScript. Node.js runs the JavaScript.**

---

# 7. What happens to TypeScript types?

Suppose I write:

```typescript
const username: string = "Vivek";
const age: number = 20;
```

The TypeScript compiler uses this information while checking my code.

It understands:

```text
username → string
age      → number
```

But the JavaScript runtime does not need this syntax.

The generated JavaScript looks like:

```javascript
const username = "Vivek";
const age = 20;
```

Notice that this:

```typescript
: string
: number
```

is gone.

So:

```text
TypeScript Source

const age: number = 20;
          ↓
          ↓ tsc
          ↓

JavaScript Output

const age = 20;
```

This is why I need to remember:

> **Normal TypeScript type information is mainly used at compile time and does not exist as TypeScript type annotations in the emitted JavaScript.**

This concept is called **type erasure**.

---

# 8. What is happening inside the compiler?

I don't need to understand every internal detail of the TypeScript compiler right now.

But I should understand the basic flow.

When I run:

```bash
tsc index.ts
```

I can think about it like this:

```text
My Source Code
     ↓
Scanner / Parser
     ↓
AST
     ↓
Type Checker
     ↓
Diagnostics
     ↓
Transformer
     ↓
Emitter
     ↓
JavaScript Output
```

Let's understand this simply.

---

## Step 1: Source Code

This is the code I write:

```typescript
const age: number = 20;
```

It starts as text inside my:

```text
.ts
```

file.

---

## Step 2: Parser

The compiler needs to understand the structure of my code.

It does not just treat this as random text:

```typescript
const age: number = 20;
```

It understands that there is:

```text
Variable Declaration
        ↓
Name → age
        ↓
Type Annotation → number
        ↓
Value → 20
```

---

## Step 3: AST

The compiler represents the structure of my code internally.

A simplified representation is:

```text
Variable Declaration
├── Name: age
├── Type: number
└── Value: 20
```

This kind of structured representation is called an:

```text
AST
Abstract Syntax Tree
```

I don't need to manually create ASTs right now.

I just need to understand that the compiler works with the **structure of my code**, not just raw text.

---

## Step 4: Type Checking

Now TypeScript analyzes whether the types make sense.

For:

```typescript
const age: number = 20;
```

it sees:

```text
Expected → number
Received → number
```

So there is no problem.

But:

```typescript
const age: number = "20";
```

becomes:

```text
Expected → number
Received → string
```

So TypeScript reports an error.

---

## Step 5: Diagnostics

If TypeScript finds a problem, it gives me information about it.

For example:

```text
Type 'string' is not assignable to type 'number'.
```

These compiler messages are called **diagnostics**.

So:

```text
Type Checking
     ↓
Problem found?
     ↓
Yes
     ↓
Diagnostic / Error Message
```

---

## Step 6: Transformation

Depending on my TypeScript code and compiler settings, TypeScript may need to transform code before generating JavaScript.

For example, TypeScript-specific syntax such as type annotations needs to be removed because normal JavaScript does not understand it.

```typescript
const age: number = 20;
```

becomes:

```javascript
const age = 20;
```

The exact transformations can also depend on my compiler configuration.

---

## Step 7: Emit

Finally, TypeScript can generate output files.

Generating the output is called:

```text
Emit
```

So if TypeScript creates:

```text
index.js
```

it has **emitted JavaScript**.

The internal flow I should remember is:

```text
Source Code
     ↓
Parse
     ↓
AST
     ↓
Type Check
     ↓
Diagnostics
     ↓
Transform
     ↓
Emit
     ↓
JavaScript
```

---

# 9. What is `tsconfig.json`?

Until now, I have been compiling a specific file:

```bash
tsc index.ts
```

That works for a small experiment.

But a real project can contain many files:

```text
src/
├── index.ts
├── user.ts
├── auth.ts
└── database.ts
```

I don't want to manually configure TypeScript every time.

I need a place where I can tell TypeScript:

> "These are the rules for this project."

That place is:

```text
tsconfig.json
```

It is the configuration file for my TypeScript project.

---

# 10. Creating `tsconfig.json`

I can generate a TypeScript configuration file using:

```bash
tsc --init
```

This creates:

```text
tsconfig.json
```

Now my project can look like:

```text
02_Setup_And_Compiler/
│
├── index.ts
├── tsconfig.json
└── README.md
```

The configuration file can control things such as:

* JavaScript target version
* Module system
* Type checking rules
* Source directory
* Output directory
* Which files are included
* Which files are excluded

---

# 11. How does `tsconfig.json` change the flow?

Without a project configuration, I might run:

```bash
tsc index.ts
```

and compile one file directly.

With `tsconfig.json`, I can define the project rules and run:

```bash
tsc
```

Now the flow becomes:

```text
I run:

tsc
    ↓
TypeScript looks for tsconfig.json
    ↓
Reads my compiler settings
    ↓
Finds the project files
    ↓
Parses the files
    ↓
Builds the program
    ↓
Type checks everything
    ↓
Reports diagnostics
    ↓
Transforms code if needed
    ↓
Emits JavaScript
```

So `tsconfig.json` tells TypeScript **how my project should be handled**.

---

# 12. A simple `tsconfig.json`

For now, I don't need to understand every option.

A simple idea looks like:

```json
{
    "compilerOptions": {
        "target": "ES2020",
        "module": "NodeNext",
        "strict": true
    }
}
```

Let's understand the basic meaning.

---

## `target`

```json
"target": "ES2020"
```

This tells TypeScript what JavaScript language level I want the output to target.

My mental flow:

```text
My TypeScript Code
        ↓
Compiler
        ↓
JavaScript suitable for my target
```

---

## `module`

```json
"module": "NodeNext"
```

This controls how TypeScript handles modules and module-related output/behavior.

This becomes important when I start using:

```typescript
import
export
```

I will understand this much more deeply when I work with modules and real TypeScript projects.

---

## `strict`

```json
"strict": true
```

This enables stricter type checking.

My approach should be:

> If TypeScript reports an error, I should first understand why it is complaining instead of immediately disabling strict checking.

The goal is not to fight TypeScript.

The goal is to use its errors to understand potential problems in my code.

---

# 13. Source code and output code

In a real project, I will usually separate what I write from what gets generated.

For example:

```text
Project
│
├── src/
│   └── index.ts
│
├── dist/
│   └── index.js
│
└── tsconfig.json
```

The flow is:

```text
src/index.ts
       ↓
TypeScript Compiler
       ↓
dist/index.js
       ↓
Node.js executes it
```

This makes the separation clear:

```text
src/
↓
My source code


dist/
↓
Generated JavaScript
```

---

# 14. The complete project execution flow

Now I can connect everything together.

Suppose I have:

```text
Project
│
├── tsconfig.json
│
├── src/
│   └── index.ts
│
└── dist/
    └── index.js
```

Inside:

```text
src/index.ts
```

I write:

```typescript
const name: string = "Vivek";

console.log(`Hello, ${name}`);
```

Now I run:

```bash
tsc
```

Here is what happens:

```text
STEP 1
──────

tsc starts


STEP 2
──────

tsc finds tsconfig.json


STEP 3
──────

tsc reads the compiler settings


STEP 4
──────

tsc finds the TypeScript source files


STEP 5
──────

Source code is parsed

index.ts
    ↓
AST


STEP 6
──────

TypeScript checks the types

name → string
"Vivek" → string

Valid


STEP 7
──────

TypeScript transforms/removes TypeScript-only syntax


STEP 8
──────

JavaScript is emitted

dist/index.js


STEP 9
──────

I run:

node dist/index.js


STEP 10
───────

Node.js executes the JavaScript


STEP 11
───────

Output:

Hello, Vivek
```

This is the complete flow I need to visualize.

---

# 15. The most important diagram from this lesson

```text
                         COMPILE TIME

┌───────────────────────────────────────────────────────┐
│                                                       │
│                     index.ts                          │
│                         ↓                             │
│                  TypeScript Compiler                  │
│                         ↓                             │
│                      Parse                            │
│                         ↓                             │
│                       AST                             │
│                         ↓                             │
│                   Type Checking                       │
│                         ↓                             │
│                    Diagnostics                        │
│                         ↓                             │
│                   Transformation                      │
│                         ↓                             │
│                  Emit JavaScript                      │
│                         ↓                             │
│                     index.js                          │
│                                                       │
└───────────────────────────────────────────────────────┘
                          ↓

                         RUNTIME

┌───────────────────────────────────────────────────────┐
│                                                       │
│                     index.js                          │
│                         ↓                             │
│                Node.js / JavaScript Runtime           │
│                         ↓                             │
│                JavaScript Executes                    │
│                         ↓                             │
│                    Program Output                     │
│                                                       │
└───────────────────────────────────────────────────────┘
```

This is the main execution flow I want to remember.

---

# 16. What I should not confuse

## `tsc` vs Node.js

```text
tsc
↓
Checks and generates JavaScript
```

```text
Node.js
↓
Executes JavaScript
```

---

## Compile time vs runtime

```text
Compile Time
↓
TypeScript understands and checks my code
```

```text
Runtime
↓
JavaScript actually executes
```

---

## `.ts` vs `.js`

```text
.ts
↓
My TypeScript source code
```

```text
.js
↓
JavaScript that the runtime executes
```

---

# 17. My mental model

If I forget everything else, I want to remember this:

```text
I WRITE

index.ts
    ↓

I COMPILE

tsc
    ↓

TYPESCRIPT DOES

Parse
    ↓
Understand Structure
    ↓
Type Check
    ↓
Report Errors
    ↓
Transform
    ↓
Emit JavaScript

    ↓

I GET

index.js
    ↓

I RUN

node index.js
    ↓

JAVASCRIPT EXECUTES
```

The shortest version is:

> **I write TypeScript → TypeScript checks and generates JavaScript → JavaScript runtime executes it.**

---

# 18. Quick self-test

Before moving to the next lesson, I should be able to answer these myself.

### 1. What is `tsc`?

It is the TypeScript compiler command.

### 2. Does `tsc` execute my program?

No. It processes TypeScript, performs compiler work such as type checking, and can emit JavaScript.

### 3. What actually runs my program?

A JavaScript runtime such as Node.js or a browser runs the JavaScript.

### 4. What happens when I run `tsc`?

At a high level:

```text
Parse
↓
Understand the program
↓
Type Check
↓
Report diagnostics
↓
Transform if needed
↓
Emit JavaScript
```

### 5. What is an AST?

An Abstract Syntax Tree is a structured representation of the syntax of my code that the compiler can work with.

### 6. What are diagnostics?

Messages from the compiler about errors or other issues it detects.

### 7. What does emit mean?

Generating output files, such as JavaScript files.

### 8. What is `tsconfig.json`?

It is the configuration file that tells TypeScript how to handle my project.

### 9. What is the difference between compile time and runtime?

Compile time is when TypeScript processes and checks the code. Runtime is when the resulting JavaScript actually executes.

### 10. What is the complete flow?

```text
.ts
 ↓
tsc
 ↓
Parse + Type Check + Transform
 ↓
Emit
 ↓
.js
 ↓
Node.js / Browser
 ↓
Execution
```

---

# 19. What I learned from this lesson

In Lesson 1, I understood **why TypeScript exists**.

In this lesson, I understood **how TypeScript fits into the actual execution process**.

The biggest thing I learned is:

> **TypeScript itself is part of my development and compilation process. The JavaScript output is what the runtime executes.**

My complete mental model is:

```text
I write TypeScript
        ↓
TypeScript Compiler reads my project
        ↓
Parses the code
        ↓
Builds a structured representation
        ↓
Checks the types
        ↓
Reports problems
        ↓
Transforms the code
        ↓
Emits JavaScript
        ↓
JavaScript Runtime executes it
```

So whenever I learn a new TypeScript feature from now on, I should ask myself:

> **Does this exist at compile time, runtime, or both?**

That question will help me understand TypeScript much more deeply.

---

# Next Lesson

## Lesson 3 — Primitive Types and Type Inference

Now that I understand how TypeScript is processed, I can start learning the type system itself.

In the next lesson, I will understand:

* `string`
* `number`
* `boolean`
* Explicit type annotations
* Type inference
* How TypeScript decides what type a value has
* What happens when I try to assign the wrong type
* When I should write a type myself
* When I should let TypeScript infer the type
* The compile-time flow of type inference
* Common mistakes
