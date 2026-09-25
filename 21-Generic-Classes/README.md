# Lesson 21 — Generic Classes

## Why Am I Learning This?

In the previous lessons, I learned how Generics allow me to write functions that can work with different types.

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here, `T` is a placeholder for a type.

```ts
getValue("Vivek");  // T = string
getValue(20);       // T = number
```

Now I want to use the same Generic concept with **classes**.

A Generic Class allows me to create **one class that can work with different types** instead of creating a separate class for every type.

---

# What Am I Going To Learn?

In this lesson, I am going to learn:

1. What a Generic Class is
2. What `<T>` means in a class
3. How `T` works with properties
4. How `T` works with constructors
5. How `T` works with methods
6. How the actual type is decided
7. How Generic Classes work with objects
8. How Generics provide type safety
9. How TypeScript can infer the Generic type

---

# 1. The Problem

Suppose I want a class that stores a string.

```ts
class StringStorage {

    item: string;

    constructor(item: string) {
        this.item = item;
    }
}
```

If I want to store a number, I would need another class:

```ts
class NumberStorage {

    item: number;

    constructor(item: number) {
        this.item = item;
    }
}
```

Both classes are doing almost the same thing.

The only difference is the type:

```text
StringStorage → string
NumberStorage → number
```

Instead of creating multiple classes, I can use a Generic Class.

---

# 2. Creating a Generic Class

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
class Storage<T>
```

Here, `T` is a **Generic Type Parameter**.

I am basically saying:

```text
"I don't know the type yet.

I will decide the type
when I create the object."
```

So `T` is a placeholder for the actual type.

---

# 3. How Does `T` Work Inside the Class?

Look at the class again:

```ts
class Storage<T> {

    item: T;

    constructor(item: T) {
        this.item = item;
    }
}
```

`T` is being used in both the property and constructor.

### Property

```ts
item: T;
```

The property will have whatever type `T` becomes.

### Constructor

```ts
constructor(item: T)
```

The constructor also expects that same type.

So the flow is:

```text
<T>
 ↓
Type Placeholder
 ↓
Used by property
 ↓
Used by constructor
```

---

# 4. Using the Class With a String

Now I create an object:

```ts
const nameStorage = new Storage<string>("Vivek");
```

Here:

```ts
Storage<string>
```

means:

```text
T = string
```

So TypeScript can treat the class like:

```ts
item: string;

constructor(item: string)
```

The flow is:

```text
Storage<T>
   ↓
Storage<string>
   ↓
T becomes string
```

Now `nameStorage.item` is a string.

---

# 5. Using the Same Class With Other Types

I can use the exact same class with a number:

```ts
const ageStorage = new Storage<number>(20);
```

Here:

```text
T = number
```

I can also use it with a boolean:

```ts
const loginStorage = new Storage<boolean>(true);
```

Here:

```text
T = boolean
```

So I have:

```text
Storage<string>
Storage<number>
Storage<boolean>
```

But I only created one class:

```ts
Storage<T>
```

That's the main benefit of a Generic Class.

---

# 6. Using `T` With Methods

I can also use `T` as the return type of a method.

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

The method returns the same type that the class was created with.

For example:

```ts
const nameStorage = new Storage<string>("Vivek");

const name = nameStorage.getItem();
```

Here:

```text
T = string
```

So:

```ts
getItem(): T
```

becomes:

```ts
getItem(): string
```

Similarly:

```ts
const ageStorage = new Storage<number>(20);
```

means:

```text
T = number
```

So `getItem()` returns a number.

---

# 7. Understanding the Type Flow

Suppose I write:

```ts
const nameStorage = new Storage<string>("Vivek");

const name = nameStorage.getItem();
```

The complete flow is:

```text
Storage<T>
    ↓
Storage<string>
    ↓
T = string
    ↓
item: string
    ↓
getItem(): string
    ↓
name: string
```

This is why TypeScript knows the exact type of `name`.

---

# 8. Generic Class With an Object

`T` does not have to be a primitive type.

It can also represent an object type.

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

```text
T = User
```

So:

```ts
item: T;
```

effectively becomes:

```ts
item: User;
```

And:

```ts
getItem(): T
```

effectively becomes:

```ts
getItem(): User;
```

Now TypeScript knows that the returned value has:

```ts
name
age
```

So I can write:

```ts
const user = userStorage.getItem();

console.log(user.name);
console.log(user.age);
```

---

# 9. Type Safety

Generic Classes also give me type safety.

Suppose:

```ts
const nameStorage = new Storage<string>("Vivek");
```

This is valid:

```ts
nameStorage.item = "Rahul";
```

But this is not:

```ts
// nameStorage.item = 20;
```

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

---

# 10. Generic Class vs `any`

I could use `any` instead:

```ts
class Storage {

    item: any;

    constructor(item: any) {
        this.item = item;
    }
}
```

But now TypeScript loses the useful type information.

For example:

```ts
const storage = new Storage("Vivek");

storage.item = 20;
storage.item = true;
```

TypeScript allows these because `item` is `any`.

With Generics:

```ts
const storage = new Storage<string>("Vivek");
```

TypeScript remembers:

```text
T = string
```

So the class remains reusable while still maintaining type safety.

---

# 11. Type Inference

I don't always need to explicitly write the Generic type.

TypeScript can often infer it from the value.

Instead of:

```ts
const nameStorage = new Storage<string>("Vivek");

const ageStorage = new Storage<number>(20);
```

I can write:

```ts
const nameStorage = new Storage("Vivek");

const ageStorage = new Storage(20);
```

TypeScript can understand:

```text
"Vivek" → T = string

20 → T = number
```

So both approaches are possible.

Explicit:

```ts
new Storage<string>("Vivek");
```

Inferred:

```ts
new Storage("Vivek");
```

---

# 12. Complete Example

Now I can put the main concepts together:

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

One class:

```text
Storage<T>
```

can work with:

```text
string
number
User
```

---

# 13. Execution Flow

Let's understand this line:

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

So TypeScript knows:

```text
userStorage → Storage<User>
```

Therefore:

```ts
userStorage.getItem().name
```

is valid.

---

# 14. Connection With the Previous Lesson

In the previous lesson, I learned Generic Functions:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here:

```text
T belongs to the function
```

Now:

```ts
class Storage<T> {
    item: T;
}
```

Here:

```text
T belongs to the class
```

The Generic concept is still the same.

The difference is where I am using it.

```text
Generic Function
      ↓
<T> belongs to the function

Generic Class
      ↓
<T> belongs to the class
```

---

# 15. Why This Is Useful for Backend Development

Later in backend development, I will work with different types of data:

```text
User
Product
Order
API Response
Database Data
```

The same reusable class structure can potentially work with all of them:

```ts
Storage<User>
Storage<Product>
Storage<Order>
```

I don't need to create a completely different class for every type.

The main idea is:

```text
Reusable Code
      +
Type Information
      +
Type Safety
```

---

# 16. Mental Model

The easiest way for me to remember Generic Classes is:

```text
class Storage<T>
       ↓
Type Placeholder
       ↓
Create Object
       ↓
Give Actual Type
       ↓
T becomes that type
       ↓
That type flows through the class
       ↓
Properties + Constructor + Methods
       ↓
Stay type-safe
```

For example:

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

# Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a Generic Class?
2. What does `<T>` mean in `class Storage<T>`?
3. When does `T` get its actual type?
4. What does `Storage<string>` mean?
5. What does `Storage<User>` mean?
6. How does `T` work with a class property?
7. How does `T` work with a constructor?
8. How does `T` work with a method?
9. Why does `nameStorage.item = 20` give an error when `T = string`?
10. How can TypeScript infer `T` automatically?
11. Why is a Generic Class better than using `any` here?

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

Then I can use it with different types:

```ts
const nameStorage = new Storage<string>("Vivek");

const ageStorage = new Storage<number>(20);

const userStorage = new Storage<User>({
    name: "Vivek",
    age: 20
});
```

The main thing I need to remember:

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
