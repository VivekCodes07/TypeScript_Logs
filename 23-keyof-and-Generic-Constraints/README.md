# Lesson 23 — `keyof` and Generic Constraints

## Why Am I Learning This?

In the previous lessons, I learned about Generics and Generic Constraints.

I learned that:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

`T` is a placeholder for a type.

I also learned that I can restrict a generic type:

```ts
function printName<T extends HasName>(value: T) {
    console.log(value.name);
}
```

Now I want to understand something more specific:

**How can I make sure that a key I pass to a function actually belongs to an object?**

For example:

```ts
const user = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};
```

I may want a function where I can say:

```ts
getProperty(user, "name");
```

But I don't want this to be allowed:

```ts
getProperty(user, "password");
```

because `password` is not a property of `user`.

This is where `keyof` and generic constraints become useful.

---

# 1. First Understand Object Keys

Let's start without Generics.

```ts
type User = {
    name: string;
    age: number;
    email: string;
};
```

The keys of `User` are:

```text
name
age
email
```

So we can think of the object like this:

```text
User
 │
 ├── name
 ├── age
 └── email
```

These are the **keys** of the type.

---

# 2. What Does `keyof` Do?

`keyof` means:

```text
"Give me the keys of this type."
```

For example:

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UserKeys = keyof User;
```

Now TypeScript treats `UserKeys` as:

```ts
"name" | "age" | "email"
```

So mentally:

```text
keyof User
     ↓
"name" | "age" | "email"
```

This is the first important thing to understand.

`keyof` does not give me the values.

It gives me the **property names**.

---

# 3. Let's See It Directly

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

type UserKeys = keyof User;

const key1: UserKeys = "name";
const key2: UserKeys = "age";
const key3: UserKeys = "email";
```

All three are valid because they are keys of `User`.

But:

```ts
const key4: UserKeys = "password";
```

is invalid.

Why?

Because:

```text
keyof User
     ↓
"name" | "age" | "email"
```

and `"password"` is not part of that list.

---

# 4. The Most Important Mental Model for `keyof`

Whenever I see:

```ts
keyof SomeType
```

I should think:

```text
Give me all valid property names of SomeType.
```

For example:

```ts
keyof User
```

means:

```text
"name" | "age" | "email"
```

And:

```ts
keyof Product
```

would mean something like:

```text
"title" | "price" | "category"
```

depending on the properties of `Product`.

---

# 5. Using `keyof` in a Function

Now I can use this idea in a function.

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

function printKey(key: keyof User): void {
    console.log(key);
}

printKey("name");
printKey("age");
printKey("email");
```

This works because:

```ts
keyof User
```

is:

```ts
"name" | "age" | "email"
```

So this is invalid:

```ts
printKey("password");
```

because `"password"` is not a key of `User`.

---

# 6. But There Is a Problem

Our function only works with `User`.

```ts
function printKey(key: keyof User) {
    console.log(key);
}
```

What if I have another object?

```ts
type Product = {
    title: string;
    price: number;
};
```

Now the keys are:

```ts
keyof Product
```

which means:

```text
"title" | "price"
```

I would need another function:

```ts
function printProductKey(key: keyof Product) {
    console.log(key);
}
```

That starts becoming repetitive.

I want one function that can work with different objects.

This is where Generics come in.

---

# 7. First Understand `T`

I already learned Generics in the previous lessons.

For example:

```ts
function getValue<T>(value: T): T {
    return value;
}
```

Here:

```text
T = type of the value
```

So:

```ts
getValue("Vivek");
```

makes TypeScript understand:

```text
T = string
```

And:

```ts
getValue(20);
```

makes TypeScript understand:

```text
T = number
```

The same idea will be used here.

---

# 8. What Does `T` Represent in Our Object Example?

Consider:

```ts
const user = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};
```

If I have:

```ts
function getProperty<T>(object: T) {
    return object;
}
```

and call:

```ts
getProperty(user);
```

TypeScript can infer:

```text
T = type of user
```

So conceptually:

```text
T
↓
{
    name: string;
    age: number;
    email: string;
}
```

This is extremely important.

When I write:

```ts
getProperty(user, "name");
```

I am not manually passing `T`.

I am passing the actual object:

```text
user
```

and TypeScript figures out that:

```text
T = User
```

automatically.

---

# 9. So What Is `K`?

Now I need another generic type.

I already know:

```text
T = object type
```

But I also need to represent:

```text
which key am I using?
```

For that, I can use another generic:

```ts
K
```

So my mental model becomes:

```text
T = object type
K = key type
```

For example:

```ts
getProperty(user, "name");
```

conceptually becomes:

```text
T = User
K = "name"
```

Again, I am not manually passing `T` and `K`.

TypeScript infers them from the arguments.

---

# 10. Now Introduce `keyof T`

We already know:

```ts
keyof User
```

means:

```text
"name" | "age" | "email"
```

But now our function should work with any object.

So instead of writing:

```ts
keyof User
```

we can write:

```ts
keyof T
```

because `T` represents whichever object we are working with.

For example:

```text
T = User

keyof T
   ↓
"name" | "age" | "email"
```

If:

```text
T = Product

keyof T
   ↓
"title" | "price"
```

This is why `T` is important.

---

# 11. Now Introduce `K extends keyof T`

We now know:

```text
T = object type
K = key type
keyof T = all keys of that object
```

So I can say:

```ts
K extends keyof T
```

This means:

```text
K must be one of the keys of T.
```

It does NOT mean:

```text
K must be the same as T.
```

It means:

```text
T = object
K = one valid key from that object
```

---

# 12. Build the Function Slowly

Instead of jumping directly into the final syntax, let's build it.

First:

```ts
function getProperty<T>(object: T) {
    return object;
}
```

Here:

```text
T = object type
```

Now I want a key:

```ts
function getProperty<T, K>(object: T, key: K) {
    return object;
}
```

Now I have:

```text
T = object type
K = key type
```

But there is a problem.

`K` can currently be anything.

For example, TypeScript could allow:

```ts
getProperty(user, "password");
```

I don't want that.

So I add the constraint:

```ts
K extends keyof T
```

Now:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
) {
    return object[key];
}
```

Now the relationship is:

```text
T
↓
object type

keyof T
↓
all keys of that object

K
↓
one key

K extends keyof T
↓
K must be a valid key of T
```

---

# 13. Let's Use the Function

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

const user: User = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};

function getProperty<T, K extends keyof T>(
    object: T,
    key: K
) {
    return object[key];
}

console.log(getProperty(user, "name"));
console.log(getProperty(user, "age"));
console.log(getProperty(user, "email"));
```

When I write:

```ts
getProperty(user, "name");
```

TypeScript understands:

```text
T = User

keyof T
↓
"name" | "age" | "email"

K = "name"
```

When I write:

```ts
getProperty(user, "age");
```

TypeScript understands:

```text
T = User

K = "age"
```

And this is invalid:

```ts
getProperty(user, "password");
```

because:

```text
"password"
```

is not inside:

```text
"name" | "age" | "email"
```

---

# 14. Important: Am I Passing `T`?

This was confusing to me at first.

When I write:

```ts
getProperty(user, "name");
```

I might think:

```text
Where am I passing T?
```

The answer is:

**I am not manually passing `T`.**

I am passing:

```ts
user
```

and TypeScript looks at `user` and infers its type.

So:

```ts
getProperty(user, "name");
```

is conceptually understood as:

```text
object = user
T = User

key = "name"
K = "name"
```

So the actual values I pass are:

```text
user
"name"
```

`T` and `K` are generic type information that TypeScript works out.

I could explicitly provide them:

```ts
getProperty<User, "name">(user, "name");
```

but normally I don't need to.

TypeScript can infer them.

---

# 15. One Key — Complete Flow

Let's slow this down one more time.

```ts
getProperty(user, "name");
```

### Step 1

TypeScript sees:

```ts
user
```

So:

```text
T = User
```

### Step 2

TypeScript calculates:

```ts
keyof T
```

which becomes:

```text
"name" | "age" | "email"
```

### Step 3

TypeScript sees:

```ts
"name"
```

So:

```text
K = "name"
```

### Step 4

It checks:

```text
Is "name" inside keyof User?
```

Yes.

So the call is valid.

---

# 16. What If I Want Two Keys?

Now that I understand one key, I can extend the same idea.

Suppose I want:

```ts
getTwoProperties(user, "name", "age");
```

I now have:

```text
T  = object type
K1 = first key
K2 = second key
```

So:

```ts
function getTwoProperties<
    T,
    K1 extends keyof T,
    K2 extends keyof T
>(
    object: T,
    key1: K1,
    key2: K2
) {
    return {
        first: object[key1],
        second: object[key2]
    };
}
```

Here:

```text
T
↓
object type

K1
↓
first key

K2
↓
second key

K1 extends keyof T
↓
first key must belong to T

K2 extends keyof T
↓
second key must belong to T
```

Now:

```ts
const result = getTwoProperties(
    user,
    "name",
    "age"
);
```

TypeScript conceptually understands:

```text
T  = User
K1 = "name"
K2 = "age"
```

So:

```text
user
  ↓
T = User

"name"
  ↓
K1 = "name"

"age"
  ↓
K2 = "age"
```

Both keys are checked against the same object.

This is why I need `T`.

Without `T`, TypeScript would not know **which object's keys** `K1` and `K2` are supposed to belong to.

---

# 17. Now What Is `T[K]`?

There is one more important piece.

We already know:

```text
T = object type
K = key
```

Now:

```ts
T[K]
```

means:

```text
Give me the type of property K inside T.
```

For example:

```ts
type User = {
    name: string;
    age: number;
};
```

Then:

```ts
T = User
K = "name"
```

So:

```ts
T[K]
```

becomes:

```ts
User["name"]
```

which is:

```text
string
```

If:

```text
K = "age"
```

then:

```ts
User["age"]
```

becomes:

```text
number
```

So:

```text
T[K]
   ↓
type of the selected property
```

---

# 18. Add `T[K]` to the Function

Now I can make the return type more specific:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Now look at:

```ts
const name = getProperty(user, "name");
```

TypeScript understands:

```text
T = User
K = "name"

T[K]
↓
User["name"]
↓
string
```

So:

```text
name = string
```

And:

```ts
const age = getProperty(user, "age");
```

becomes:

```text
T = User
K = "age"

T[K]
↓
User["age"]
↓
number
```

So:

```text
age = number
```

This is the real power of this pattern.

The return type changes based on the key I pass.

---

# 19. Two Keys With Their Actual Types

Now I can apply the same idea to the two-key function.

```ts
function getTwoProperties<
    T,
    K1 extends keyof T,
    K2 extends keyof T
>(
    object: T,
    key1: K1,
    key2: K2
): {
    first: T[K1];
    second: T[K2];
} {
    return {
        first: object[key1],
        second: object[key2]
    };
}
```

Now:

```ts
const result = getTwoProperties(
    user,
    "name",
    "age"
);
```

TypeScript understands:

```text
T = User
K1 = "name"
K2 = "age"
```

Therefore:

```text
T[K1]
↓
User["name"]
↓
string
```

and:

```text
T[K2]
↓
User["age"]
↓
number
```

So the result becomes conceptually:

```ts
{
    first: string;
    second: number;
}
```

---

# 20. Full Example

This is the complete example I want to understand after learning each part separately.

```ts
type User = {
    name: string;
    age: number;
    email: string;
};

const user: User = {
    name: "Vivek",
    age: 20,
    email: "vivek@gmail.com"
};

/*
T represents the object type.

K represents one key from that object.

K extends keyof T means:
K must be a valid key of T.

T[K] means:
give me the type of the property selected by K.
*/

function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}

const name = getProperty(user, "name");
const age = getProperty(user, "age");
const email = getProperty(user, "email");

console.log(name);
console.log(age);
console.log(email);


/*
Now I want two keys.

T  = object type
K1 = first key
K2 = second key

Both keys must belong to T.
*/

function getTwoProperties<
    T,
    K1 extends keyof T,
    K2 extends keyof T
>(
    object: T,
    key1: K1,
    key2: K2
): {
    first: T[K1];
    second: T[K2];
} {
    return {
        first: object[key1],
        second: object[key2]
    };
}

const result = getTwoProperties(
    user,
    "name",
    "age"
);

console.log(result.first);
console.log(result.second);
```

---

# 21. The Whole Concept in One Picture

This is the mental model I want to remember:

```text
Object
  ↓
T
  ↓
keyof T
  ↓
all keys of that object
  ↓
K extends keyof T
  ↓
K must be one valid key
  ↓
T[K]
  ↓
type of that selected property
```

For:

```ts
getProperty(user, "name");
```

the flow is:

```text
user
  ↓
T = User
  ↓
keyof T
  ↓
"name" | "age" | "email"
  ↓
K = "name"
  ↓
T[K]
  ↓
User["name"]
  ↓
string
```

---

# 22. Why Can't I Just Use the Key?

I might wonder:

```ts
function getProperty(key: string) {
    // ...
}
```

The problem is that `string` means **any string**.

So TypeScript cannot know whether:

```text
"name"
"age"
"email"
"password"
"hello"
"anything"
```

is actually a key of my object.

I need the relationship:

```text
This key
   ↓
must belong to
   ↓
this object
```

That relationship is created by:

```ts
K extends keyof T
```

So I should remember:

```text
T = which object?

K = which key?

keyof T = what keys does that object have?

K extends keyof T = make sure my key belongs to that object
```

---

# 23. Connection With Generic Constraints

This lesson is actually an extension of what I learned in Lesson 22.

In Lesson 22, I learned:

```ts
T extends HasName
```

which means:

```text
T must satisfy HasName
```

Now I have:

```ts
K extends keyof T
```

which means:

```text
K must satisfy the keys of T
```

So `extends` is still doing the same basic job:

```text
extends = restriction / constraint
```

The difference is what I am restricting.

### Lesson 22

```ts
T extends HasName
```

I am restricting `T`.

### Lesson 23

```ts
K extends keyof T
```

I am restricting `K`.

The rule is:

```text
K must be one of the keys of T.
```

---

# 24. Common Confusion

### Confusion 1 — "Am I passing T?"

No.

Usually I call:

```ts
getProperty(user, "name");
```

I pass:

```text
user
"name"
```

TypeScript infers:

```text
T = User
K = "name"
```

---

### Confusion 2 — "Does `T` mean TypeScript?"

No.

`T` is just a generic type parameter name.

I could technically write:

```ts
function getProperty<ObjectType, Key extends keyof ObjectType>(
    object: ObjectType,
    key: Key
) {
    return object[key];
}
```

But `T` and `K` are common conventions.

So:

```text
T → Type / object type
K → Key
```

---

### Confusion 3 — "Does `keyof T` mean the value?"

No.

It means the **keys**.

```ts
keyof User
```

gives:

```text
"name" | "age" | "email"
```

---

### Confusion 4 — "What does `T[K]` mean?"

It means:

```text
the type of property K inside T
```

For example:

```text
T = User
K = "name"

T[K]
↓
User["name"]
↓
string
```

---

# 25. What I Should Be Able to Explain Now

Before moving to the next lesson, I should be able to explain these without memorizing them:

```ts
keyof User
```

I should know:

```text
It gives me the keys of User.
```

---

```ts
T
```

I should know:

```text
It represents the object/type I am working with.
```

---

```ts
K
```

I should know:

```text
It represents a key.
```

---

```ts
K extends keyof T
```

I should know:

```text
K must be a valid key of T.
```

---

```ts
T[K]
```

I should know:

```text
It gives me the type of the property selected by K.
```

---

# 26. Final Mental Model

I don't want to memorize the entire syntax as one giant piece:

```ts
function getProperty<T, K extends keyof T>(
    object: T,
    key: K
): T[K] {
    return object[key];
}
```

Instead, I should build it piece by piece:

```text
T
↓
the object type

K
↓
the key

keyof T
↓
all keys of the object

K extends keyof T
↓
K must be one of those keys

T[K]
↓
give me the type of that selected property
```

So when I see:

```ts
getProperty(user, "name");
```

I can mentally expand it:

```text
user
↓
T = User

"name"
↓
K = "name"

keyof T
↓
"name" | "age" | "email"

K extends keyof T
↓
"name" is valid

T[K]
↓
User["name"]
↓
string
```

That is the complete idea behind `keyof` + Generic Constraints.

# Key Takeaway

The main thing I learned in this lesson is not just the syntax.

I learned how to create a relationship between an object and its keys.

```text
T = object
K = key
keyof T = keys of object
K extends keyof T = valid key of that object
T[K] = type of that property
```

Once this relationship makes sense, the syntax becomes much easier to understand.
