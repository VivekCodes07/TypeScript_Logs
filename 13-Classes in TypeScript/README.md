# 13 — Classes in TypeScript

Classes are used to create objects that contain both **data and behavior**.

I have already learned classes in JavaScript, so in this lesson I want to understand what changes when I use classes with TypeScript.

The main difference is that **TypeScript adds type safety on top of the JavaScript class system.**

---

## Why Am I Learning This?

I already know that JavaScript provides classes.

For example:

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
```

JavaScript allows me to create and initialize properties directly through the constructor.

Now I want to understand how TypeScript handles the same thing.

In TypeScript, I can explicitly define:

* What properties a class has
* What type those properties should contain
* What parameters the constructor accepts
* What type a method returns
* How objects are created from the class

Classes are also the foundation for the next few lessons:

```text
Classes
   ↓
Public / Private
   ↓
Getters / Setters
   ↓
Protected
   ↓
Interfaces
   ↓
Abstract Classes
```

---

# What I Am Going to Study

In this lesson I will learn:

* What a class is
* Why classes are useful
* Class properties
* Constructors
* Creating objects from classes
* The `this` keyword
* Class methods
* Multiple objects from one class
* Type safety inside classes
* JavaScript classes vs TypeScript classes
* Class vs object
* How classes can be useful in backend development

---

# 1. What Is a Class?

A **class is a blueprint for creating objects.**

Suppose I want to create multiple users.

Every user might have:

* `name`
* `email`
* `age`

Instead of defining these properties separately for every user, I can create one class:

```typescript
class User {
    name: string;
    email: string;
    age: number;
}
```

The class describes what a `User` object should contain.

---

# 2. Class vs Object

This is one of the most important things to understand.

A **class is the blueprint**.

An **object is the actual thing created from that blueprint.**

```text
Class
  ↓
Blueprint

Object
  ↓
Actual instance created from the blueprint
```

For example:

```typescript
class User {
    name: string;
    age: number;
}
```

This defines the class.

To create an object:

```typescript
const user1 = new User();
```

Now `user1` is an object created from the `User` class.

---

# 3. Creating an Object from a Class

The `new` keyword is used to create an object from a class.

```typescript
class User {
    name: string;
    age: number;
}

const user1 = new User();

user1.name = "Vivek";
user1.age = 20;
```

The flow is:

```text
User class
   ↓
new User()
   ↓
New object created
   ↓
user1 stores the object
```

---

# 4. Constructor

A **constructor is a special method that runs when an object is created.**

For example:

```typescript
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

Now I can create the object like this:

```typescript
const user1 = new User("Vivek", 20);
```

The constructor receives:

```text
"Vivek"
20
```

and initializes the object's properties.

---

# 5. JavaScript vs TypeScript Class Properties

Since I have already studied JavaScript classes, this difference is important for me.

## JavaScript

In JavaScript, I can write:

```javascript
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const user = new User("Vivek", 20);
```

I did not have to separately declare:

```text
name
age
```

before the constructor.

The constructor directly creates and initializes these properties through `this`.

---

## What Changes in TypeScript?

In TypeScript, I normally declare the class properties and their types:

```typescript
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

Here:

```typescript
name: string;
age: number;
```

tell TypeScript:

> This class has these properties and these are their types.

Then the constructor gives those properties their actual values:

```typescript
this.name = name;
this.age = age;
```

So there are two separate ideas:

```text
Property declaration
        ↓
Tell TypeScript what exists and its type

Constructor
        ↓
Initialize the property with an actual value
```

---

# 6. Why Do I Need Both?

This was confusing to me because in JavaScript I was used to:

```javascript
constructor(name, age) {
    this.name = name;
    this.age = age;
}
```

In TypeScript, I can explicitly tell the type system about the class structure:

```typescript
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

Think about it like this:

```text
name: string
   ↓
What property exists?
What type should it have?
```

```text
this.name = name
   ↓
What actual value does it receive?
```

TypeScript uses the property declaration for type checking.

JavaScript ultimately runs the generated JavaScript code, where the constructor assignment initializes the property at runtime.

---

# 7. TypeScript Can Also Infer Class Property Types

I don't always have to explicitly write the type when TypeScript can infer it from an initializer.

For example:

```typescript
class User {
    name = "Vivek";
    age = 20;
}
```

TypeScript can infer:

```text
name → string
age  → number
```

But when the values are coming from constructor parameters, explicitly declaring the property types makes the class structure clear:

```typescript
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

---

# 8. What Is `this`?

Inside a class, `this` refers to the **current object**.

Example:

```typescript
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Here:

```typescript
this.name
```

means:

> The `name` property belonging to the current object.

If I create:

```typescript
const user1 = new User("Vivek");
```

then `this` refers to `user1` while its constructor is running.

If I create another object:

```typescript
const user2 = new User("Rahul");
```

then `this` refers to `user2` while its constructor is running.

---

# 9. Class Methods

A class can also contain functions.

Functions inside a class are called **methods**.

```typescript
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): void {
        console.log(`Hello ${this.name}`);
    }
}
```

Now I can use the method through the object:

```typescript
const user1 = new User("Vivek");

user1.greet();
```

Output:

```text
Hello Vivek
```

---

# 10. Data + Behavior

A class can combine **data and behavior**.

```text
Data
 ↓
Properties

Behavior
 ↓
Methods
```

For example:

```typescript
class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    showBalance(): void {
        console.log(this.balance);
    }
}
```

Here:

```text
balance
   ↓
Data
```

```text
showBalance()
   ↓
Behavior
```

This is one of the main ideas behind classes.

---

# 11. Multiple Objects from One Class

One class can be used to create many objects.

```typescript
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const user1 = new User("Vivek");
const user2 = new User("Rahul");
const user3 = new User("Aman");
```

All three objects come from the same class:

```text
User
│
├── user1 → Vivek
├── user2 → Rahul
└── user3 → Aman
```

The class is shared as the blueprint, while each object has its own data.

---

# 12. Type Safety in Classes

One of the biggest benefits of using TypeScript is that I can define types for class properties and constructor parameters.

```typescript
class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}
```

This is valid:

```typescript
const product = new Product("Laptop", 60000);
```

But this is incorrect:

```typescript
const product = new Product("Laptop", "60000");
```

because:

```text
price → number
```

but:

```text
"60000" → string
```

TypeScript can catch this before the code runs.

---

# 13. Class vs Object Type

I have already learned object types:

```typescript
type User = {
    name: string;
    age: number;
};
```

This describes the **shape of an object**.

A class can also describe data, but it can additionally contain:

* Constructors
* Methods
* Behavior
* Access control
* Inheritance

So my mental model is:

```text
Object Type
    ↓
Describes structure
```

```text
Class
    ↓
Creates objects
    ↓
Contains data + behavior
```

An object type tells me what an object should look like.

A class gives me a blueprint from which I can create objects.

---

# 14. Classes and Backend Development

Classes are not required for every Node.js backend.

A lot of backend code can be written using:

* Functions
* Objects
* Interfaces
* Type aliases

But classes are still important because I will encounter them in:

* Services
* Controllers
* Libraries
* Frameworks
* Database-related code
* Object-oriented application designs

I don't need to use classes everywhere.

I need to understand them well enough to **write, read, and work with class-based TypeScript code.**

---

# 15. Common Mistakes

## Mistake 1 — Confusing a Class with an Object

```typescript
class User {
}
```

This defines the class.

It does not create a user object yet.

I still need:

```typescript
const user = new User();
```

---

## Mistake 2 — Forgetting `new`

For a normal class object:

```typescript
const user = new User();
```

The `new` keyword creates an instance of the class.

---

## Mistake 3 — Forgetting `this`

Inside a class:

```typescript
this.name
```

refers to the property belonging to the current object.

---

## Mistake 4 — Giving the Wrong Type

If I write:

```typescript
class User {
    age: number;
}
```

then `age` should contain a number.

I should not assign:

```typescript
user.age = "twenty";
```

because the property expects a number.

---

# JavaScript to TypeScript Mental Model

I already know this from JavaScript:

```text
constructor
    ↓
this.property = value
```

TypeScript adds type information:

```text
property: type
    ↓
What kind of data is allowed?
```

Then:

```text
constructor
    ↓
this.property = value
    ↓
What actual value does it get?
```

So TypeScript is not replacing the JavaScript class system.

It is adding **type information and compile-time checking** on top of JavaScript.

---

# Execution Flow

When I write:

```typescript
const user = new User("Vivek", 20);
```

I should think:

```text
User class
   ↓
new User(...)
   ↓
Constructor runs
   ↓
Constructor receives "Vivek" and 20
   ↓
this refers to the new object
   ↓
Properties are initialized
   ↓
Object is created
   ↓
user stores the reference
```

---

# The Complete Picture

```text
Class
   ↓
Blueprint
   ↓
Defines properties + methods
   ↓
new
   ↓
Object / Instance
   ↓
Constructor initializes data
   ↓
Object can use class methods
```

Another way I remember it:

```text
Class
   ↓
Data + Behavior
   ↓
Reusable blueprint
   ↓
Multiple objects
```

---

# What I Should Remember

```text
class
   ↓
Defines a reusable blueprint
```

```text
constructor
   ↓
Initializes an object
```

```text
this
   ↓
Refers to the current object
```

```text
property
   ↓
Stores object data
```

```text
method
   ↓
Defines object behavior
```

```text
new
   ↓
Creates an object / instance
```

The most important idea for me:

> A class is a reusable blueprint that combines data and behavior, and TypeScript adds type safety to that JavaScript class system.

---

# Quick Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a class?
2. What is an object?
3. What is the difference between a class and an object?
4. Why do we use `new`?
5. What does a constructor do?
6. What does `this` refer to?
7. What is a method?
8. Why do I declare property types in TypeScript?
9. How is a TypeScript class different from a JavaScript class?
10. Can one class create multiple objects?
11. Why is `this.name = name` needed in the constructor?
12. Why are classes useful to understand for backend development?

If I can explain these in my own words, I am ready for the next lesson.

---

# What's Next?

The next lesson is:

```text
14 - Public and Private
```

There I will learn how TypeScript controls who can access and modify the properties and methods of a class.

The flow will be:

```text
Classes
   ↓
Public / Private
   ↓
Getters / Setters
   ↓
Protected
   ↓
Interfaces
   ↓
Abstract Classes
```

This is where TypeScript classes start becoming much more powerful for designing real applications.
