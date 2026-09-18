# 08 — Object Types

## 1. Why Am I Learning This?

So far, I have learned how to give types to simple values like:

```ts
let username: string = "Vivek";
let age: number = 20;
let isActive: boolean = true;
```

I have also learned arrays, tuples, and enums.

But in real applications, I will rarely work with only separate variables.

For example, a user in a backend application can look like this:

```ts
const user = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com",
    isActive: true
};
```

This is an **object** containing multiple related pieces of data.

JavaScript allows me to create this object easily, but TypeScript can go one step further:

> I can describe exactly what properties this object should have and what types those properties should contain.

This becomes extremely important in backend development because I will constantly work with things like:

* users
* products
* orders
* requests
* responses
* database documents
* configuration objects

So in this lesson, I want to understand how TypeScript describes and checks the **shape of an object**.

---

# 2. What Am I Going to Study?

In this lesson, I am going to learn:

* How to type an object
* Object properties and their types
* How TypeScript checks an object's shape
* Nested objects
* Optional properties
* `readonly` properties
* Accessing typed object properties
* Modifying object properties
* What happens when I add the wrong property
* What happens when I use the wrong type
* How object types connect to backend data
* The difference between an object type and an actual object

The main goal is:

> I should be able to look at an object and understand how TypeScript can describe its structure.

---

# 3. First Understand the Problem

Suppose I create a user object:

```ts
const user = {
    id: 101,
    name: "Vivek",
    isActive: true
};
```

TypeScript already knows the types:

```text
id        → number
name      → string
isActive  → boolean
```

This is another example of **type inference**.

But what if I want to explicitly tell TypeScript what this object should look like?

I can write:

```ts
const user: {
    id: number;
    name: string;
    isActive: boolean;
} = {
    id: 101,
    name: "Vivek",
    isActive: true
};
```

Now I have explicitly described the object's type.

---

# 4. What Does Object Type Actually Mean?

When I write:

```ts
const user: {
    id: number;
    name: string;
    isActive: boolean;
}
```

I am not creating an object yet.

I am describing the **shape** that an object must follow.

I can think of it like a blueprint:

```text
Object Type

user
├── id       → number
├── name     → string
└── isActive → boolean
```

Then the actual object provides the values:

```ts
const user = {
    id: 101,
    name: "Vivek",
    isActive: true
};
```

So:

```text
Object Type
     ↓
Describes the structure

Object
     ↓
Contains the actual data
```

This distinction is important.

---

# 5. Typing Object Properties

I can give each property its own type.

```ts
const student: {
    name: string;
    age: number;
    course: string;
} = {
    name: "Vivek",
    age: 20,
    course: "CSE"
};
```

Here TypeScript knows:

```text
name   → string
age    → number
course → string
```

If I accidentally write:

```ts
age: "20"
```

TypeScript will complain because `"20"` is a string, not a number.

This is the main benefit of object typing.

---

# 6. TypeScript Checks the Object's Shape

The structure of an object is often called its **shape**.

For example:

```ts
const user: {
    id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};
```

The expected shape is:

```text
{
    id: number
    name: string
}
```

If I forget a required property:

```ts
const user: {
    id: number;
    name: string;
} = {
    id: 101
};
```

TypeScript gives an error because `name` is required.

If I give the wrong type:

```ts
const user: {
    id: number;
    name: string;
} = {
    id: "101",
    name: "Vivek"
};
```

TypeScript also gives an error.

So I can remember:

> Object typing makes TypeScript check whether my object follows the expected structure.

---

# 7. Accessing Object Properties

Once an object is typed, TypeScript knows the type of each property.

```ts
const user: {
    id: number;
    name: string;
    isActive: boolean;
} = {
    id: 101,
    name: "Vivek",
    isActive: true
};

console.log(user.id);
console.log(user.name);
console.log(user.isActive);
```

TypeScript understands:

```text
user.id       → number
user.name     → string
user.isActive → boolean
```

So I also get type safety when using the properties.

For example:

```ts
user.name.toUpperCase();
```

works because `name` is a string.

---

# 8. Changing Object Properties

If a property is not `readonly`, I can normally change its value.

```ts
let user: {
    name: string;
    age: number;
} = {
    name: "Vivek",
    age: 20
};

user.name = "Rahul";
user.age = 21;
```

But I still have to respect the property's type.

This is valid:

```ts
user.age = 21;
```

This is not:

```ts
user.age = "21";
```

Because `age` was defined as a number.

So object typing does not mean:

> "The object can never change."

It means:

> "The object can change, but the values must follow the defined types."

---

# 9. Nested Objects

Objects can contain other objects.

For example, a user can have an address:

```ts
const user: {
    name: string;
    age: number;
    address: {
        city: string;
        pincode: number;
    };
} = {
    name: "Vivek",
    age: 20,
    address: {
        city: "Mohali",
        pincode: 140301
    }
};
```

Now TypeScript understands the complete structure:

```text
user
├── name
├── age
└── address
    ├── city
    └── pincode
```

I can access nested properties like this:

```ts
console.log(user.address.city);
console.log(user.address.pincode);
```

This is very common in backend data.

For example:

```text
User
 ├── name
 ├── email
 └── address
      ├── city
      └── pincode
```

---

# 10. Optional Properties

Sometimes a property may or may not exist.

For example, not every user may have a phone number.

I can mark a property as optional using `?`.

```ts
const user: {
    name: string;
    email: string;
    phone?: string;
} = {
    name: "Vivek",
    email: "vivek@example.com"
};
```

Here:

```ts
phone?: string;
```

means:

> `phone` can exist, but it is not required.

Both of these are valid:

```ts
const user1: {
    name: string;
    phone?: string;
} = {
    name: "Vivek"
};
```

```ts
const user2: {
    name: string;
    phone?: string;
} = {
    name: "Vivek",
    phone: "9876543210"
};
```

So:

```text
property: string
     ↓
required

property?: string
     ↓
optional
```

---

# 11. Why Optional Properties Matter

Backend data is not always complete.

For example, when a new user registers:

```text
name
email
password
```

may exist immediately.

But things like:

```text
profilePicture
phone
address
bio
```

may be added later.

So making everything required would sometimes be incorrect.

Optional properties allow me to represent objects where some information may be missing.

---

# 12. `readonly` Properties

Sometimes I want a property to be available but not changeable after the object is created.

For example, a user ID usually should not be changed accidentally.

I can use `readonly`:

```ts
const user: {
    readonly id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};
```

I can read the ID:

```ts
console.log(user.id);
```

But I cannot change it:

```ts
user.id = 102;
```

TypeScript will give an error.

So:

```text
readonly
    ↓
I can read the property
but I cannot reassign it
```

---

# 13. `readonly` Does Not Mean Everything Is Immutable

This is important.

If I write:

```ts
const user: {
    readonly id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};
```

Only `id` is readonly.

I can still change:

```ts
user.name = "Rahul";
```

So `readonly` applies to the specific property where I use it.

---

# 14. `const` vs `readonly`

These two concepts can look similar, but they are different.

`const` applies to the variable:

```ts
const user = {
    name: "Vivek"
};
```

I cannot make `user` point to another object.

But I can still change:

```ts
user.name = "Rahul";
```

`readonly` applies to an object property:

```ts
const user: {
    readonly id: number;
} = {
    id: 101
};
```

Now TypeScript prevents:

```ts
user.id = 102;
```

So my mental model is:

```text
const
↓
The variable cannot be reassigned

readonly
↓
The specific property cannot be reassigned
```

---

# 15. Object Type Inference

I do not always need to explicitly write the object type.

TypeScript can infer it:

```ts
const user = {
    id: 101,
    name: "Vivek",
    isActive: true
};
```

TypeScript understands:

```text
id        → number
name      → string
isActive  → boolean
```

This is usually cleaner when the object is simple and its type is obvious.

So I have two approaches:

### Type Inference

```ts
const user = {
    id: 101,
    name: "Vivek"
};
```

### Explicit Object Type

```ts
const user: {
    id: number;
    name: string;
} = {
    id: 101,
    name: "Vivek"
};
```

Both are valid.

The important thing is understanding what TypeScript is doing.

---

# 16. Object Types in Functions

Object types become even more useful when objects are passed into functions.

For example:

```ts
function printUser(user: {
    name: string;
    age: number;
}): void {
    console.log(user.name);
    console.log(user.age);
}
```

Now the function expects an object with:

```text
name → string
age  → number
```

I can call it like this:

```ts
printUser({
    name: "Vivek",
    age: 20
});
```

But this would be incorrect:

```ts
printUser({
    name: "Vivek",
    age: "20"
});
```

Because the function expects `age` to be a number.

This is one of the places where object typing becomes very useful in backend development.

---

# 17. Why This Matters for Backend Development

Imagine my backend receives user data:

```ts
const user = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};
```

Later, I might have objects representing:

```text
User
Product
Order
Cart
Payment
Request
Response
```

Each one has a specific structure.

For example:

```text
Product
├── id       → number
├── name     → string
├── price    → number
└── inStock  → boolean
```

TypeScript lets me describe that structure and catch mistakes before the code runs.

This is why object types are an important step before moving deeper into:

```text
Type Aliases
      ↓
Interfaces
      ↓
Generics
      ↓
Node.js + TypeScript
      ↓
Express + TypeScript
```

---

# 18. Everything Together

Here is a small example using the concepts I learned:

```ts
const user: {
    readonly id: number;
    name: string;
    email: string;
    age: number;
    phone?: string;
    address: {
        city: string;
        pincode: number;
    };
} = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com",
    age: 20,
    address: {
        city: "Mohali",
        pincode: 140301
    }
};

console.log(user.name);
console.log(user.address.city);

user.name = "Rahul";

// user.id = 102; // Error because id is readonly
```

This one object contains:

```text
readonly property
required properties
optional property
nested object
different property types
```

So this is basically the kind of structure I will start seeing frequently in backend code.

---

# 19. Common Mistakes

### Mistake 1 — Wrong property type

```ts
const user: {
    age: number;
} = {
    age: "20"
};
```

`"20"` is a string, not a number.

---

### Mistake 2 — Forgetting a required property

```ts
const user: {
    name: string;
    age: number;
} = {
    name: "Vivek"
};
```

`age` is required.

---

### Mistake 3 — Thinking `?` means the property must exist

```ts
phone?: string;
```

does **not** mean:

> phone must be a string.

It means:

> phone may exist, and if it exists, it must be a string.

---

### Mistake 4 — Thinking `readonly` means the entire object is frozen

```ts
readonly id: number;
```

Only `id` is protected from reassignment.

Other properties can still change.

---

### Mistake 5 — Confusing `const` with `readonly`

```ts
const user = {
    name: "Vivek"
};

user.name = "Rahul";
```

This is allowed.

`const` does not make object properties readonly.

---

# 20. My Mental Model

When I see an object type:

```ts
const user: {
    id: number;
    name: string;
    phone?: string;
} = {
    id: 101,
    name: "Vivek"
};
```

I should read it like this:

```text
user
 │
 ├── id
 │    └── required number
 │
 ├── name
 │    └── required string
 │
 └── phone
      └── optional string
```

And I should remember:

```text
Object Type
    ↓
Describes the shape of an object

property: type
    ↓
Required property

property?: type
    ↓
Optional property

readonly property: type
    ↓
Property cannot be reassigned
```

---

# 21. Final Flow

The complete idea is:

```text
Object
   ↓
Contains related data
   ↓
Each property has a type
   ↓
TypeScript checks the object's shape
   ↓
Nested objects can describe deeper structures
   ↓
? makes a property optional
   ↓
readonly prevents property reassignment
   ↓
Objects can be safely passed to functions
   ↓
This becomes useful for backend data
```

---

# 22. Self-Test

Before moving to the next lesson, I should be able to answer these myself:

1. What is an object type in TypeScript?
2. What does "shape of an object" mean?
3. How do I explicitly type an object?
4. What happens if I give a property the wrong type?
5. What is the difference between a required and optional property?
6. What does `?` mean?
7. What does `readonly` do?
8. What is the difference between `const` and `readonly`?
9. How do I type a nested object?
10. How can I type an object passed into a function?
11. When can TypeScript infer an object's type automatically?
12. Why are object types important for backend development?

If I can explain these in my own words, I have understood the main purpose of Object Types.

---

# 23. Final Recap

The main thing I am learning here is not just syntax.

I am learning how to tell TypeScript:

> "This object has this structure, and these properties have these types."

The important syntax is:

```ts
property: type
```

```ts
property?: type
```

```ts
readonly property: type
```

And objects can contain other objects:

```ts
address: {
    city: string;
    pincode: number;
}
```

My mental model:

```text
Object Type
    ↓
Describes object structure
    ↓
Properties have types
    ↓
Properties can be required / optional / readonly
    ↓
TypeScript checks the structure
    ↓
Safer objects
    ↓
Better backend code
```

The next important step is learning how to **reuse these object type definitions** instead of writing the same structure again and again.

That is where **Type Aliases** come in.
