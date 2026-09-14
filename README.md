# TypeScript Logs

This repository contains my personal notes, examples, and practice code while learning **TypeScript**.

I am not trying to master every advanced feature of TypeScript right now.

My main goal is to learn enough TypeScript so that I can comfortably use it while building **Node.js and backend applications**.

---

## My Learning Goal

I am learning TypeScript because I want to use it with my backend stack.

My overall path is:

```text
TypeScript
    ↓
Node.js + TypeScript
    ↓
Express + TypeScript
    ↓
MongoDB + TypeScript
    ↓
REST APIs
    ↓
Authentication
    ↓
Validation
    ↓
Real Backend Projects
```

So I am focusing on the TypeScript concepts that I will actually need while developing backend applications.

I will learn advanced TypeScript later when I have a real reason to use it.

---

# TypeScript Learning Roadmap

## Phase 1 — Foundations

These lessons build my basic understanding of TypeScript.

```text
01 -- Introduction to TypeScript
02 -- TypeScript Setup and Compiler
03 -- Type Annotations and Type Inference
04 -- Union Types and Type Narrowing
05 -- Type Assertions and Special Types
```

### What I learn here

* What TypeScript is and why it exists
* TypeScript vs JavaScript
* TypeScript compiler
* `tsconfig.json`
* Type annotations
* Type inference
* Basic types
* Union types
* Type narrowing
* Type assertions
* `any`
* `unknown`
* `void`
* `never`

---

# Phase 2 — Core TypeScript

Now I start working with the types and structures that I will commonly use in real applications.

```text
06 -- Arrays, Tuples and Enums
07 -- Functions in TypeScript
08 -- Object Types
09 -- Type Aliases
10 -- Interfaces
11 -- Optional, Readonly and Index Signatures
```

### What I learn here

* Typed arrays
* Tuples
* Enums
* Function parameters
* Function return types
* Optional parameters
* Function types
* Object types
* Nested objects
* Type aliases
* Interfaces
* Optional properties
* `readonly`
* Index signatures

This phase is especially important because backend applications work heavily with **objects, functions, API data, and structured data**.

---

# Phase 3 — Important TypeScript Features

After understanding the basics, I learn a few features that make TypeScript much more useful for real applications.

```text
12 -- Generics
13 -- Utility Types
14 -- Classes in TypeScript
```

### What I learn here

#### Generics

* Why generics exist
* Generic functions
* Generic types
* Generic interfaces
* `<T>`
* Basic generic constraints
* Writing reusable type-safe code

#### Utility Types

* `Partial<T>`
* `Required<T>`
* `Readonly<T>`
* `Pick<T, K>`
* `Omit<T, K>`
* `Record<K, T>`

#### Classes

* Classes
* Constructors
* `public`
* `private`
* `protected`
* `readonly`
* `extends`
* `implements`

I don't need to become an advanced TypeScript type-system expert here.

I just want to understand the features that I am likely to encounter in real backend projects.

---

# Phase 4 — Preparing for Backend

Once I understand the core TypeScript features, I connect TypeScript with the Node.js environment.

```text
15 -- Modules and TypeScript Project Structure
16 -- TypeScript with Node.js
```

### What I learn here

* `import` / `export`
* ES Modules
* TypeScript project structure
* `src` and `dist`
* `tsconfig.json` in a real project
* Compiling TypeScript
* Running compiled JavaScript with Node.js
* Development workflow
* Node.js type definitions
* `@types/node`
* Environment variables
* Basic backend project structure

After this phase, I should be comfortable enough to start building backend applications with TypeScript.

---

# What I Am NOT Learning Yet

I don't need to learn the entire TypeScript type system before starting backend development.

For now, I am intentionally skipping advanced topics such as:

* Conditional Types
* Mapped Types
* Template Literal Types
* Advanced Type Guards
* Function Overloads
* Indexed Access Types
* Complex Generic Patterns
* Advanced Type-Level Programming
* Deep declaration-file internals

These are not prerequisites for me to start building a TypeScript backend.

I can learn them later when a real project gives me a reason to use them.

---

# My Stopping Point

For now, **Lesson 16 is my stopping point for dedicated TypeScript learning**.

After that, I want to learn TypeScript through my backend development instead of continuing with increasingly advanced TypeScript theory.

My next learning path will be:

```text
TypeScript
    ↓
Node.js + TypeScript
    ↓
Express + TypeScript
    ↓
MongoDB + TypeScript
    ↓
REST API
    ↓
Authentication
    ↓
Validation
    ↓
Error Handling
    ↓
Backend Projects
```

---

# My Approach

I don't want to learn TypeScript just by memorizing syntax.

For every concept, I want to understand:

```text
What is it?
    ↓
Why does it exist?
    ↓
What problem does it solve?
    ↓
How does TypeScript understand it?
    ↓
Where will I actually use it?
```

My goal is not:

> "I have mastered TypeScript."

My goal is:

> "I understand TypeScript well enough that it does not become an obstacle while I build backend applications."

---

# Progress

* [x] 01 — Introduction to TypeScript
* [x] 02 — TypeScript Setup and Compiler
* [x] 03 — Type Annotations and Type Inference
* [x] 04 — Union Types and Type Narrowing
* [x] 05 — Type Assertions and Special Types
* [ ] 06 — Arrays, Tuples and Enums
* [ ] 07 — Functions in TypeScript
* [ ] 08 — Object Types
* [ ] 09 — Type Aliases
* [ ] 10 — Interfaces
* [ ] 11 — Optional, Readonly and Index Signatures
* [ ] 12 — Generics
* [ ] 13 — Utility Types
* [ ] 14 — Classes in TypeScript
* [ ] 15 — Modules and TypeScript Project Structure
* [ ] 16 — TypeScript with Node.js

---

## Repository Structure

```text
TypeScript_Logs/
│
├── README.md
│
├── 01-Introduction/
├── 02-TypeScript-Setup-and-Compiler/
├── 03-Type-Annotations-and-Inference/
├── 04-Union-Types-and-Type-Narrowing/
├── 05-Type-Assertions-and-Special-Types/
│
├── 06-Arrays-Tuples-and-Enums/
├── 07-Functions/
├── 08-Object-Types/
├── 09-Type-Aliases/
├── 10-Interfaces/
├── 11-Optional-Readonly-and-Index-Signatures/
│
├── 12-Generics/
├── 13-Utility-Types/
├── 14-Classes/
│
├── 15-Modules-and-Project-Structure/
└── 16-TypeScript-with-Node/
```

This repository is my **TypeScript learning log**. I will keep adding notes, examples, experiments, and practice code as I progress.
