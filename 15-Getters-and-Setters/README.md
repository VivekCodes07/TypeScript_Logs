# 15 — Getters and Setters

## Why Am I Learning This?

In the previous lesson, I learned about `public` and `private`.

I learned that a private property should not be accessed directly from outside a class.

For example:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }
}
```

But this creates an important question:

> If `balance` is private, how can I safely read or change it?

One way is to create normal methods:

```text
getBalance()
setBalance()
```

But JavaScript already provides another way to handle this:

```text
get → read a value

set → change a value
```

These are called **getters and setters**.

Getters and setters are **JavaScript features**, not TypeScript-only features.

TypeScript uses the same JavaScript syntax and adds type checking on top of it.

The basic idea is:

```text
private property

       ↓

   ┌───┴───┐
   ↓       ↓
getter   setter
   ↓       ↓
 read    change
```

This allows the class to control how its internal data is accessed and changed.

---

# What I Am Going To Study

In this lesson, I will learn:

* What getters are
* What setters are
* How JavaScript uses `get` and `set`
* How TypeScript uses `get` and `set`
* Why getters and setters are useful
* How to create a getter
* How to create a setter
* How getters are accessed
* How setters are accessed
* Using getters and setters with private properties
* Adding validation inside setters
* Getter-only properties
* Getters vs normal methods
* Setters vs normal methods
* JavaScript vs TypeScript getters and setters
* How getters and setters are useful in backend development

---

# 1. Getters and Setters Are JavaScript Features

Before understanding the TypeScript version, I need to understand an important point:

> `get` and `set` already exist in JavaScript.

They are not TypeScript-only keywords.

For example, JavaScript allows me to write:

```javascript
class User {
    constructor(username) {
        this.username = username;
    }

    get name() {
        return this.username;
    }

    set name(value) {
        this.username = value;
    }
}
```

I can use the class like this:

```javascript
const user = new User("Vivek");

console.log(user.name);

user.name = "Rahul";

console.log(user.name);
```

The important part is that I don't call the getter or setter manually.

```text
user.name

    ↓

getter runs
```

And:

```text
user.name = "Rahul"

    ↓

setter runs
```

So getters and setters are part of the JavaScript class system.

### Important Note About `_username`

Sometimes JavaScript examples use:

```javascript
this._username
```

The `_` is only a **naming convention**.

It does not make the property private.

These are both valid JavaScript:

```javascript
this.username
```

and:

```javascript
this._username
```

For my TypeScript learning, I will use:

```typescript
private username: string;
```

because `private` is an actual TypeScript access modifier.

So:

```text
_username
    ↓
naming convention

private username
    ↓
TypeScript access modifier
```

---

# 2. What Does TypeScript Add?

TypeScript uses the same getter and setter syntax.

For example:

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }

    set name(value: string) {
        this.username = value;
    }
}
```

The important thing is to understand which parts come from JavaScript and which parts come from TypeScript.

```text
JavaScript
    ↓
class
get
set
getter/setter behavior

TypeScript
    ↓
JavaScript features
        +
type annotations
        +
type checking
        +
TypeScript access modifiers
```

For example:

```typescript
get name(): string
```

The `get` keyword comes from JavaScript.

The `: string` return type is TypeScript.

And:

```typescript
set name(value: string)
```

The `set` keyword comes from JavaScript.

The `: string` parameter type is TypeScript.

So I should think of TypeScript as adding type safety to the existing JavaScript class features.

---

# 3. What Is a Getter?

A **getter** is a special class member used to read a value.

It is created using the `get` keyword.

### JavaScript

```javascript
class User {
    constructor(username) {
        this.username = username;
    }

    get name() {
        return this.username;
    }
}
```

### TypeScript

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }
}
```

Now I can access the value like a normal property:

```typescript
const user = new User("Vivek");

console.log(user.name);
```

Notice that I don't write:

```typescript
user.name();
```

I simply write:

```typescript
user.name;
```

### Mental Model

```text
user.name

    ↓

getter runs

    ↓

returns the value
```

The getter allows me to read a value without calling a method explicitly.

---

# 4. Why Do I Need a Getter?

Suppose I have a private property:

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }
}
```

I cannot directly do:

```typescript
console.log(user.username);
```

because `username` is private.

A getter gives me controlled read access:

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }
}
```

Now:

```typescript
console.log(user.name);
```

works.

The actual property is still private.

```text
private username

       ↓

    getter

       ↓

   user.name
```

The getter becomes the controlled way of reading the private data.

---

# 5. What Is a Setter?

A **setter** is a special class member used to change a value.

It is created using the `set` keyword.

### JavaScript

```javascript
class User {
    constructor(username) {
        this.username = username;
    }

    set name(value) {
        this.username = value;
    }
}
```

### TypeScript

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    set name(value: string) {
        this.username = value;
    }
}
```

Now I can change the value like this:

```typescript
user.name = "Rahul";
```

I don't call the setter like a normal method.

I don't write:

```typescript
user.name("Rahul");
```

Instead:

```typescript
user.name = "Rahul";
```

### Mental Model

```text
user.name = "Rahul"

        ↓

    setter runs

        ↓

private username changes
```

The value assigned to `name` is passed to the setter.

---

# 6. Getter and Setter Together

Getters and setters are often used together.

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }

    set name(value: string) {
        this.username = value;
    }
}
```

Now I can:

```typescript
const user = new User("Vivek");

console.log(user.name);

user.name = "Rahul";

console.log(user.name);
```

The flow is:

### Reading

```text
user.name

    ↓

  getter

    ↓

private username
```

### Writing

```text
user.name = "Rahul"

    ↓

  setter

    ↓

private username
```

The outside code interacts with `name`, while the actual `username` property remains private.

---

# 7. Getters Can Return Computed Values

A getter doesn't have to simply return a property.

It can calculate something.

```typescript
class User {
    private firstName: string;
    private lastName: string;

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
```

Now:

```typescript
const user = new User("Vivek", "Das");

console.log(user.fullName);
```

The getter creates the value from two private properties.

So a getter can provide a **computed property**.

```text
firstName
    +
lastName
    ↓
getter
    ↓
fullName
```

The value doesn't have to be stored separately.

---

# 8. Setters Can Validate Data

This is one of the most useful reasons to use setters.

Suppose I have an age:

```typescript
class User {
    private age: number;

    constructor(age: number) {
        this.age = age;
    }

    get userAge(): number {
        return this.age;
    }

    set userAge(value: number) {
        if (value < 0) {
            console.log("Age cannot be negative");
            return;
        }

        this.age = value;
    }
}
```

Now:

```typescript
const user = new User(20);

user.userAge = 21;

console.log(user.userAge);
```

If I try:

```typescript
user.userAge = -10;
```

the setter can reject the value.

### Flow

```text
new value

    ↓

 setter

    ↓

validation

    ↓

 ┌───────┴───────┐
 ↓               ↓
valid          invalid
 ↓               ↓
save            reject
```

This gives the class control over its own data.

---

# 9. Getter Without a Setter

I don't always need both.

Sometimes I only want outside code to read a value.

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }
}
```

Now this works:

```typescript
console.log(user.name);
```

But this does not:

```typescript
user.name = "Rahul";
```

because there is no setter.

So I can create a property that is:

```text
Read  → allowed

Write → not allowed
```

This is useful when the value should only be exposed for reading.

---

# 10. Getters and Setters With Private Data

This is the main pattern I want to remember:

```text
                Class
                  │
                  ↓
            Private Data
                  │
          ┌───────┴───────┐
          ↓               ↓
       Getter           Setter
          ↓               ↓
        READ            WRITE
```

Example:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    get currentBalance(): number {
        return this.balance;
    }

    set currentBalance(value: number) {
        if (value >= 0) {
            this.balance = value;
        }
    }
}
```

The outside code doesn't directly access `balance`.

Instead, it uses:

```typescript
account.currentBalance;
```

and:

```typescript
account.currentBalance = 7000;
```

The class remains in control of the actual `balance` property.

---

# 11. Getter vs Normal Method

A getter and a normal method can both return data, but they are accessed differently.

### Normal Method

```typescript
class User {
    getName(): string {
        return "Vivek";
    }
}
```

Usage:

```typescript
user.getName();
```

### Getter

```typescript
class User {
    get name(): string {
        return "Vivek";
    }
}
```

Usage:

```typescript
user.name;
```

### Difference

```text
Normal method

    ↓

getName()

Getter

    ↓

name
```

A getter is accessed like a property rather than called like a function.

---

# 12. Setter vs Normal Method

The same idea applies to setters.

### Normal Method

```typescript
class User {
    setName(name: string): void {
        // update name
    }
}
```

Usage:

```typescript
user.setName("Rahul");
```

### Setter

```typescript
class User {
    set name(value: string) {
        // update name
    }
}
```

Usage:

```typescript
user.name = "Rahul";
```

### Difference

```text
Normal method

    ↓

setName("Rahul")

Setter

    ↓

name = "Rahul"
```

The setter allows assignment syntax instead of a method call.

---

# 13. Getters and Setters With Validation

A setter is especially useful when a value has rules.

For example:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    get currentBalance(): number {
        return this.balance;
    }

    set currentBalance(value: number) {
        if (value < 0) {
            console.log("Balance cannot be negative");
            return;
        }

        this.balance = value;
    }
}
```

Now:

```typescript
const account = new BankAccount(5000);

account.currentBalance = 7000;

console.log(account.currentBalance);
```

But:

```typescript
account.currentBalance = -5000;
```

will be rejected by the setter.

The class itself controls the rule.

---

# 14. Why Is This Better Than Direct Access?

Without controlled access:

```typescript
class BankAccount {
    public balance: number;
}
```

Outside code can directly change it:

```typescript
account.balance = -5000;
```

There is no validation.

With a private property:

```typescript
class BankAccount {
    private balance: number;

    set currentBalance(value: number) {
        if (value >= 0) {
            this.balance = value;
        }
    }
}
```

the class controls what values are allowed.

### Comparison

```text
Direct access

     ↓

Outside code controls the data
```

```text
Getter / Setter

     ↓

Class controls the data
```

This is the main connection between getters/setters and **encapsulation**.

---

# 15. Important Getter Rule

A getter should return a value.

For example:

```typescript
get name(): string {
    return this.username;
}
```

If it returns a string:

```typescript
get name(): string
```

If it returns a number:

```typescript
get age(): number
```

TypeScript checks the return type just like it does with normal methods.

Remember:

```text
get → returns a value
```

---

# 16. Important Setter Rule

A setter receives the value being assigned.

Example:

```typescript
set age(value: number) {
    this.userAge = value;
}
```

When I write:

```typescript
user.age = 20;
```

the value:

```text
20
```

is passed to the setter.

The flow is:

```text
user.age = 20

       ↓

setter receives 20

       ↓

value = 20
```

I don't manually call the setter.

The assignment automatically triggers it.

---

# 17. JavaScript vs TypeScript

This is an important distinction for me to remember.

### JavaScript

```javascript
class User {
    constructor(username) {
        this.username = username;
    }

    get name() {
        return this.username;
    }

    set name(value) {
        this.username = value;
    }
}
```

JavaScript provides:

* Classes
* Getters
* Setters
* `get`
* `set`

But JavaScript does not use TypeScript-style annotations such as:

```typescript
: string
: number
```

### TypeScript

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }

    set name(value: string) {
        this.username = value;
    }
}
```

TypeScript keeps the JavaScript getter/setter behavior and adds:

* Type annotations
* Type checking
* TypeScript access modifiers such as `private`

The important mental model is:

```text
JavaScript

    ↓

get / set

    ↓

Getter and Setter behavior


TypeScript

    ↓

JavaScript getter/setter behavior

        +

Type system

        +

Access modifiers
```

So I should not think:

> "TypeScript invented getters and setters."

Instead:

> "TypeScript uses the JavaScript getter/setter feature and adds type safety around it."

---

# 18. Backend Connection

Getters and setters become useful when working with classes in backend applications.

For example:

```text
User

│

├── private password
├── private email

│

├── getter

└── setter
```

Or:

```text
BankAccount

│

├── private balance

│

├── getter

└── setter
       ↓
   validation
```

This connects to concepts I will see while building backend applications:

* Data validation
* Business rules
* Encapsulation
* Service classes
* Models
* User and account logic

The important idea is that the class controls its internal state instead of allowing unrestricted access.

---

# 19. Common Mistakes

## Mistake 1 — Calling a Getter Like a Method

Wrong:

```typescript
user.name();
```

Correct:

```typescript
user.name;
```

---

## Mistake 2 — Calling a Setter Like a Method

Wrong:

```typescript
user.name("Rahul");
```

Correct:

```typescript
user.name = "Rahul";
```

---

## Mistake 3 — Thinking the Private Property Becomes Public

If I have:

```typescript
private username: string;
```

it is still private.

The getter and setter only provide controlled access to it.

---

## Mistake 4 — Thinking `_username` Means Private

This:

```javascript
this._username
```

does not make a property private.

The `_` is only a naming convention commonly used by developers to indicate that a property is intended for internal use.

Actual TypeScript access control is:

```typescript
private username: string;
```

So I should remember:

```text
_username
    ↓
naming convention

private username
    ↓
TypeScript access modifier
```

---

## Mistake 5 — Putting Validation Outside the Class

Instead of making every caller remember the rules:

```typescript
if (age >= 0) {
    user.age = age;
}
```

I can keep the rule inside the setter:

```typescript
set age(value: number) {
    if (value >= 0) {
        this.userAge = value;
    }
}
```

Now the class itself owns the rule.

---

# 20. Execution Flow

Consider this class:

```typescript
class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }

    get name(): string {
        return this.username;
    }

    set name(value: string) {
        this.username = value;
    }
}
```

When I create the object:

```typescript
const user = new User("Vivek");
```

the constructor stores:

```text
username = "Vivek"
```

### Reading

When I write:

```typescript
console.log(user.name);
```

the flow is:

```text
user.name

    ↓

getter runs

    ↓

return this.username

    ↓

"Vivek"
```

### Writing

When I write:

```typescript
user.name = "Rahul";
```

the flow is:

```text
user.name = "Rahul"

        ↓

    setter runs

        ↓

this.username = "Rahul"
```

I never directly access the private property from outside the class.

---

# 21. My Mental Model

The easiest way I remember getters and setters:

```text
private property

       │

       ├──────────────┐
       ↓              ↓
    getter          setter
       ↓              ↓
     READ            WRITE
       ↓              ↓
  get value       change value
```

Or simply:

```text
get → read

set → change
```

The bigger picture:

```text
private data

     ↓

  get / set

     ↓

controlled access
```

---

# 22. Quick Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is a getter?
2. What is a setter?
3. Are `get` and `set` TypeScript-only keywords?
4. How does JavaScript use `get` and `set`?
5. What does the `get` keyword do?
6. What does the `set` keyword do?
7. How is a getter accessed?
8. How is a setter accessed?
9. Why are getters and setters useful with private properties?
10. Can I have a getter without a setter?
11. Can a setter contain validation?
12. What is the difference between a getter and a normal method?
13. What is the difference between a setter and a normal method?
14. What does TypeScript add to JavaScript getters and setters?
15. Does `_property` actually make a JavaScript property private?
16. How can getters and setters help in backend development?

---

# What I Learned

In this lesson, I learned that **getters and setters are already JavaScript features**.

JavaScript provides:

```text
get → read

set → change
```

TypeScript uses the same features and adds type checking.

A getter is used to read a value:

```typescript
get name(): string {
    return this.username;
}
```

A setter is used to change a value:

```typescript
set name(value: string) {
    this.username = value;
}
```

The main pattern is:

```text
private property

      ↓

getter → read

setter → write
```

This allows the class to control how its internal data is accessed and changed.

---

# Final Mental Model

```text
                Class
                  │
                  ↓
            Private Data
                  │
          ┌───────┴───────┐
          ↓               ↓
       Getter           Setter
          ↓               ↓
        READ            WRITE
          ↓               ↓
      controlled       controlled
       access            access
```

The main thing I want to remember:

> **Getter = controlled reading. Setter = controlled changing.**

---

# Key Takeaway

Getters and setters give me a clean way to work with private class data without exposing the actual property directly.

```text
private property

      ↓

getter → read

setter → change
```

The class remains in control of its own data and can add rules or validation whenever needed.

Most importantly:

```text
JavaScript

    ↓

get / set

    ↓

Getters & Setters


TypeScript

    ↓

JavaScript Getters & Setters

        +

Type Checking

        +

Access Modifiers
```

So the main idea I should carry forward is:

> **Getters control how I read data, setters control how I change data, and `private` protects the actual internal property.**
