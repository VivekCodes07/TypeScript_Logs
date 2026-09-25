# 21 — Generic Classes

## Why Am I Learning This?

In the previous lesson, I learned about Generics with functions and arrow functions.

I learned that:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here, `T` is a placeholder for a type.

For example:

```ts
getValue("Vivek");
```

means:

```text
T = string
```

And:

```ts
getValue(20);
```

means:

```text
T = number
```

Now I want to use the same idea with **classes**.

A Generic Class allows me to create one class that can work with different types.

---

# What I Am Going To Study

In this lesson, I am going to learn:

* What a Generic Class is
* What `<T>` means in a class
* How `T` is used with class properties
* How `T` is used with constructors
* How `T` is used with methods
* How the actual type is decided
* How the same class can work with different types
* How a Generic Class can work with objects

---

# 1. First Understand the Problem

Suppose I want a class that stores a value.

I could create a class for a string:

```ts
class StringStorage {

    item: string;

    constructor(item: string) {
        this.item = item;
    }
}
```

Then if I want to store a number, I would need another class:

```ts
class NumberStorage {

    item: number;

    constructor(item: number) {
        this.item = item;
    }
}
```

Both classes are doing almost the same thing.

The only difference is the type.

```text
StringStorage
    ↓
item is string

NumberStorage
    ↓
item is number
```

Instead of creating multiple classes, I can use **Generics**.

---

# 2. Creating a Generic Class

I can create one class:

```ts
class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }
}
```

The important part is:

```ts
Storage<T>
```

Here, `T` is a **Generic Type Parameter**.

It means:

```text
I don't know the actual type yet.

I will decide the type
when I create the object.
```

So `T` is just a placeholder.

---

# 3. Understanding `T` Inside the Class

Look at the class again:

```ts
class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }
}
```

There are two important uses of `T`.

First:

```ts
item: T;
```

This means the `item` property will have whatever type `T` becomes.

Second:

```ts
constructor(item: T)
```

This means the constructor accepts the same type.

So:

```text
<T>
 ↓
Type Placeholder
 ↓
Used by the property
 ↓
Used by the constructor
```

---

# 4. Using the Class With a String

Now I can create an object:

```ts
const nameStorage = new Storage<string>("Vivek");
```

Look at:

```ts
Storage<string>
```

Here I am telling TypeScript:

```text
T = string
```

So this:

```ts
item: T;
```

becomes:

```ts
item: string;
```

And:

```ts
constructor(item: T)
```

becomes:

```ts
constructor(item: string)
```

So I can think of it like this:

```text
Storage<T>
    ↓
Storage<string>
    ↓
T becomes string
```

Now:

```ts
console.log(nameStorage.item);
```

prints:

```text
Vivek
```

---

# 5. Using the Same Class With a Number

I can use the exact same class for a number:

```ts
const ageStorage = new Storage<number>(20);
```

Now:

```ts
Storage<number>
```

means:

```text
T = number
```

So the class now works like:

```text
item: number
```

I didn't create another class.

I just used the same Generic Class with a different type.

---

# 6. Using the Same Class With Boolean

I can also use the same class with a boolean:

```ts
const loginStorage = new Storage<boolean>(true);
```

Now:

```text
T = boolean
```

So I have:

```ts
Storage<string>
Storage<number>
Storage<boolean>
```

All three are using the same class:

```ts
Storage<T>
```

The only thing changing is the type of `T`.

---

# 7. The Main Idea

This is the most important part of this lesson.

When I write:

```ts
const nameStorage = new Storage<string>("Vivek");
```

I am saying:

```text
T = string
```

When I write:

```ts
const ageStorage = new Storage<number>(20);
```

I am saying:

```text
T = number
```

When I write:

```ts
const loginStorage = new Storage<boolean>(true);
```

I am saying:

```text
T = boolean
```

So:

```text
Storage<T>
    ↓
    T is a placeholder
    ↓
I create an object
    ↓
I provide the actual type
    ↓
T becomes that type
```

---

# 8. Adding a Method

Now I can add a method to get the stored value.

```ts
class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}
```

Look at:

```ts
getItem(): T
```

The method also uses `T`.

This means the method returns the same type that the class is working with.

---

# 9. Calling the Method

Now:

```ts
const nameStorage = new Storage<string>("Vivek");

const name = nameStorage.getItem();
```

Because:

```ts
nameStorage
```

is:

```ts
Storage<string>
```

TypeScript knows:

```ts
getItem(): string
```

So:

```ts
name
```

is a `string`.

Similarly:

```ts
const ageStorage = new Storage<number>(20);

const age = ageStorage.getItem();
```

Here:

```text
Storage<number>
      ↓
T = number
      ↓
getItem(): number
```

So `age` is a `number`.

---

# 10. Generic Class With an Object

So far, I used:

```text
string
number
boolean
```

But `T` can also represent an object type.

For example:

```ts
type User = {
    name: string;
    age: number;
};
```

Now I can create:

```ts
const userStorage = new Storage<User>({
    name: "Vivek",
    age: 20
});
```

Here:

```ts
Storage<User>
```

means:

```text
T = User
```

So inside the class:

```ts
item: T;
```

becomes:

```ts
item: User;
```

And:

```ts
getItem(): T
```

becomes:

```ts
getItem(): User
```

---

# 11. Accessing the User

Now I can get the stored user:

```ts
const user = userStorage.getItem();
```

TypeScript knows that `user` is a `User`.

So I can access:

```ts
console.log(user.name);
console.log(user.age);
```

TypeScript understands:

```text
user.name
    ↓
string

user.age
    ↓
number
```

This is where Generic Classes become really useful.

The class is reusable, but TypeScript still remembers the exact type.

---

# 12. Type Safety

Suppose I have:

```ts
const nameStorage = new Storage<string>("Vivek");
```

Then:

```ts
nameStorage.item = "Rahul";
```

is valid.

But:

```ts
nameStorage.item = 20;
```

will give a TypeScript error.

Why?

Because:

```text
nameStorage
     ↓
Storage<string>
     ↓
T = string
     ↓
item must be string
```

So TypeScript prevents me from putting a number into a string storage.

This is the main benefit of using Generics.

---

# 13. Generic Class vs `any`

I could avoid the error by using `any`:

```ts
class Storage {

    item: any;

    constructor(item: any) {
        this.item = item;
    }
}
```

But now TypeScript does not know what type the value should be.

I could do:

```ts
const storage = new Storage("Vivek");

storage.item = 20;
storage.item = true;
```

Everything is allowed.

With Generics:

```ts
const storage = new Storage<string>("Vivek");
```

TypeScript knows:

```text
T = string
```

and protects the value.

So:

```text
Generic
    ↓
Reusable
    +
Type Safe
```

---

# 14. Type Inference

I don't always have to write the Generic type manually.

TypeScript can often figure it out from the value.

For example:

```ts
const nameStorage = new Storage("Vivek");

const ageStorage = new Storage(20);

const loginStorage = new Storage(true);
```

TypeScript can understand:

```text
"Vivek"
   ↓
T = string

20
   ↓
T = number

true
   ↓
T = boolean
```

So this:

```ts
new Storage<string>("Vivek");
```

can often be written as:

```ts
new Storage("Vivek");
```

TypeScript infers the type.

---

# 15. Complete Example

Now I can put everything together:

```ts
type User = {
    name: string;
    age: number;
};

class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}

const nameStorage = new Storage<string>("Vivek");

const ageStorage = new Storage<number>(20);

const userStorage = new Storage<User>({
    name: "Vivek",
    age: 20
});

console.log(nameStorage.getItem());

console.log(ageStorage.getItem());

console.log(userStorage.getItem().name);
console.log(userStorage.getItem().age);
```

Now I have one class:

```ts
Storage<T>
```

working with:

```text
string
number
User
```

---

# 16. Execution Flow

Let's understand this:

```ts
const userStorage = new Storage<User>({
    name: "Vivek",
    age: 20
});
```

Step by step:

```text
Storage<T>
    ↓
Create object
    ↓
Storage<User>
    ↓
T becomes User
    ↓
item becomes User
    ↓
constructor accepts User
    ↓
getItem() returns User
```

So after creating the object:

```ts
userStorage
```

TypeScript knows:

```text
userStorage → Storage<User>
```

That's why TypeScript knows that:

```ts
userStorage.getItem().name
```

is valid.

---

# 17. Mental Model

I can remember Generic Classes like this:

```text
class Storage<T>
       ↓
      <T>
       ↓
Type Placeholder
       ↓
Create Object
       ↓
Give Actual Type
       ↓
T becomes that type
       ↓
Class uses that type everywhere
```

Example:

```text
Storage<string>
      ↓
T = string

Storage<number>
      ↓
T = number

Storage<User>
      ↓
T = User
```

One class.

Different types.

Type safety maintained.

---

# 18. Connection With Previous Lesson

In the previous lesson, I learned:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here `T` belonged to the function.

Now:

```ts
class Storage<T> {
    item: T;
}
```

Here `T` belongs to the class.

The basic Generic idea has not changed.

Only where I am using it has changed.

```text
Generic Function
       ↓
<T> belongs to the function

Generic Class
       ↓
<T> belongs to the class
```

---

# 19. Why This Matters for Backend Development

Later, when I build backend applications, I will work with different types of data.

For example:

```text
User
Product
Order
```

The same Generic Class can potentially be reused with all of them.

For example:

```ts
Storage<User>
Storage<Product>
Storage<Order>
```

I don't need to create a completely different class just because the data type changed.

The main goal of Generics is:

```text
Write reusable code
without losing type safety
```

---

# Common Mistakes

## 1. Thinking `T` is a real type

`T` is just a placeholder.

```ts
class Storage<T>
```

does not mean `T` is always a string.

The actual type is decided when I use the class.

---

## 2. Thinking Every Object Has the Same `T`

These are different:

```ts
Storage<string>
Storage<number>
Storage<User>
```

Each object can have a different `T`.

---

## 3. Using `any` Instead of Generics

`any` removes most of the type protection.

Generics let me keep the code reusable while TypeScript still knows the actual type.

---

# Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a Generic Class?
2. What does `<T>` mean in `class Storage<T>`?
3. When does `T` get its actual type?
4. What does `Storage<string>` mean?
5. What does `Storage<User>` mean?
6. How can a class property use `T`?
7. How can a class method use `T`?
8. Why does `nameStorage.item = 20` give an error when `T = string`?
9. Can TypeScript infer the Generic type automatically?
10. Why are Generic Classes useful?

---

# Key Takeaway

A Generic Class lets me create **one class that can work with different types**.

The basic pattern is:

```ts
class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }

    getItem(): T {
        return this.item;
    }
}
```

Then I can use the same class with different types:

```ts
const nameStorage = new Storage<string>("Vivek");

const ageStorage = new Storage<number>(20);

const userStorage = new Storage<User>({
    name: "Vivek",
    age: 20
});
```

The main thing I need to remember is:

```text
<T>
 ↓
Type Placeholder
 ↓
Actual type is decided when I create the object
 ↓
That type flows through the class
 ↓
Properties and methods stay type-safe
```

**One class → different types → type safety.**
