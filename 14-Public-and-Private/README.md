# 14 — Public and Private in TypeScript

## Why Am I Learning This?

I already understand how classes work in TypeScript.

I know that a class can contain:

* Properties
* Constructors
* Methods
* Objects created using `new`
* `this`

But there is one important question:

> Who should be allowed to access the data and methods inside a class?

For example, suppose I have a `BankAccount` class.

Should anyone be able to directly change the account balance?

```typescript
account.balance = 1000000;
```

Probably not.

This is where **access modifiers** come in.

They allow me to control how the properties and methods of a class can be accessed.

In this lesson, I am going to focus on:

* `public`
* `private`
* How access control works
* Why `private` is useful
* How TypeScript protects class members
* How this connects to real backend code

---

# What I Am Going To Study

In this lesson I will learn:

* What `public` means
* What `private` means
* Default access modifier
* Accessing public properties
* Accessing private properties
* Private methods
* Access modifiers inside a class
* Access modifiers from outside a class
* Why private data is useful
* Public methods accessing private data
* TypeScript vs JavaScript behavior
* How this is useful in backend development

---

# 1. What Are Access Modifiers?

Access modifiers are keywords that control where a class member can be accessed from.

The main access modifiers I am learning now are:

* `public`
* `private`

Think about a class like a machine.

Some things should be available to everyone using the machine.

Some things should only be handled internally by the machine.

```text
Class
│
├── public
│     ↓
│   Can be accessed from outside
│
└── private
      ↓
    Can only be accessed inside the class
```

---

# 2. Public

`public` means that a property or method can be accessed from anywhere.

Example:

```typescript
class User {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User("Vivek");

console.log(user.name);
```

Here:

```typescript
public name: string;
```

means that `name` can be accessed from outside the class.

So this is allowed:

```typescript
console.log(user.name);
```

And this is also allowed:

```typescript
user.name = "Rahul";
```

because `name` is public.

---

# 3. Public Is the Default

If I don't write an access modifier, a class property is **public by default**.

So:

```typescript
class User {
    name: string;
}
```

is effectively treated as:

```typescript
class User {
    public name: string;
}
```

Both allow the property to be accessed from outside.

For example:

```typescript
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User("Vivek");

console.log(user.name);
```

I don't have to explicitly write `public` unless I want to make the access level clear.

---

# 4. Private

`private` means that a property or method can only be accessed inside the class where it is declared.

Example:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }
}
```

Now `balance` belongs to the class, but it cannot be directly accessed from outside.

This will cause a TypeScript error:

```typescript
const account = new BankAccount(5000);

console.log(account.balance);
```

Because `balance` is private.

---

# 5. Why Do We Need Private?

Let's imagine a bank account.

```typescript
class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }
}
```

Because `balance` is public, someone could do:

```typescript
account.balance = -50000;
```

That means outside code can directly modify important internal data.

Instead, I can make it private:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }
}
```

Now outside code cannot directly change `balance`.

The class itself controls how the balance is modified.

---

# 6. Private Data With Public Methods

A common pattern is:

```text
Private data
     ↓
Public method
     ↓
Controlled access
```

Example:

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}
```

Now I cannot directly access:

```typescript
account.balance;
```

But I can use:

```typescript
account.deposit(1000);
```

and:

```typescript
account.getBalance();
```

The class controls how its private data is used.

---

# 7. Private Methods

`private` can also be used with methods.

Example:

```typescript
class User {
    private validateName(name: string): boolean {
        return name.length > 2;
    }

    public createUser(name: string): void {
        if (this.validateName(name)) {
            console.log("User created");
        }
    }
}
```

Here:

```typescript
validateName()
```

is private.

So it can be used inside the class:

```typescript
this.validateName(name);
```

But not from outside:

```typescript
user.validateName("Vivek");
```

This is not allowed because the method is private.

---

# 8. Public vs Private

The main difference is where the member can be accessed.

| Modifier  | Inside Class | Outside Class |
| --------- | ------------ | ------------- |
| `public`  | Yes          | Yes           |
| `private` | Yes          | No            |

The simple mental model is:

```text
public
   ↓
Everyone can access it
```

```text
private
   ↓
Only the class can access it
```

---

# 9. Accessing Private Data Through Methods

This is one of the most important patterns in this lesson.

Consider:

```typescript
class User {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    public checkPassword(password: string): boolean {
        return this.password === password;
    }
}
```

I cannot do:

```typescript
user.password;
```

from outside.

But I can do:

```typescript
user.checkPassword("1234");
```

The method is public, while the actual password is private.

So:

```text
Outside code
     ↓
public method
     ↓
private data
```

This gives the class control over its internal state.

---

# 10. Public Methods Can Access Private Members

A private property is not completely inaccessible.

It is accessible **inside the class**.

For example:

```typescript
class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public showName(): void {
        console.log(this.name);
    }
}
```

Inside `showName()`:

```typescript
this.name;
```

works because the method belongs to the same class.

But this does not:

```typescript
const user = new User("Vivek");

console.log(user.name);
```

because the access is happening outside the class.

---

# 11. Public and Private in a Real Example

Let's create a simple `User` class.

```typescript
class User {
    public username: string;
    private password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    public login(password: string): void {
        if (this.password === password) {
            console.log("Login successful");
        } else {
            console.log("Wrong password");
        }
    }
}
```

Now:

```typescript
const user = new User("Vivek", "1234");

console.log(user.username);

user.login("1234");
```

These work because:

```text
username → public
login()  → public
```

But:

```typescript
console.log(user.password);
```

is not allowed.

Because:

```text
password → private
```

---

# 12. TypeScript vs JavaScript

This is important because I already know JavaScript classes.

In JavaScript, I can create a class like:

```javascript
class User {
    constructor(name) {
        this.name = name;
    }
}
```

TypeScript adds access modifiers and type information:

```typescript
class User {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

And I can make the property private:

```typescript
class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

The important idea is:

> TypeScript gives me compile-time rules about how class members should be accessed.

It helps catch incorrect access while writing the code.

---

# 13. Private Does Not Mean "Invisible"

I should not think:

```text
private = completely invisible
```

Instead:

```text
private
   ↓
restricted access
   ↓
only the class can access it
```

The purpose is to control how the class is used.

This is especially useful when a class contains internal data or logic that outside code should not directly manipulate.

---

# 14. Public API of a Class

A useful way to think about this is that a class can have a **public API**.

For example:

```typescript
class BankAccount {
    private balance: number;

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}
```

From outside, I only need to know:

```text
deposit()
getBalance()
```

I don't need to know how the balance is internally stored.

So:

```text
                 BankAccount
                      │
           ┌──────────┴──────────┐
           │                     │
        public                private
           │                     │
      deposit()               balance
      getBalance()            internal logic
```

This makes the class easier to control and use.

---

# 15. Why This Matters in Backend Development

This becomes useful when building real backend applications.

For example, a service class might contain:

```text
UserService
│
├── public methods
│     ├── createUser()
│     ├── loginUser()
│     └── getUser()
│
└── private methods
      ├── validateUser()
      └── generateSomething()
```

Other parts of the application only need to use the public methods.

The internal implementation can stay private.

This becomes especially useful when working with:

* Services
* Database logic
* Authentication
* Validation
* Business logic
* API-related classes

---

# 16. Common Mistakes

## Mistake 1 — Thinking private means inaccessible everywhere

Wrong:

```text
private → nobody can access it
```

Correct:

```text
private → only the class can access it
```

---

## Mistake 2 — Trying to access private properties directly

```typescript
class User {
    private password: string;
}
```

Then:

```typescript
user.password;
```

is not allowed from outside.

---

## Mistake 3 — Making everything public

If every property is public, outside code can freely modify the internal state of the class.

Sometimes that is okay.

But when data needs protection or controlled access, `private` is useful.

---

## Mistake 4 — Thinking public must always be written

This:

```typescript
name: string;
```

is public by default.

So `public` is optional unless I want to make the access level explicit.

---

# 17. Execution Flow

Let's understand the flow with a simple example.

```typescript
class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public getBalance(): number {
        return this.balance;
    }
}
```

When I create:

```typescript
const account = new BankAccount(5000);
```

The flow is:

```text
new BankAccount(5000)
        ↓
constructor runs
        ↓
balance = 5000
        ↓
balance is private
        ↓
outside code cannot directly access it
        ↓
public methods provide controlled access
```

---

# 18. My Mental Model

The easiest way I remember this:

```text
Class
  │
  ├── public
  │     ↓
  │   Open to outside code
  │
  └── private
        ↓
      Internal to the class
```

Or:

```text
public
   ↓
"you can use this"
```

```text
private
   ↓
"this is my internal implementation"
```

---

# 19. Quick Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is an access modifier?
2. What does `public` mean?
3. What does `private` mean?
4. What is the default access modifier?
5. Can a private property be accessed outside the class?
6. Can a private property be accessed by another method of the same class?
7. Why would I make a property private?
8. Why can public methods be useful with private properties?
9. Can methods also be private?
10. How can access modifiers help in backend development?

---

# 20. What I Learned

In this lesson, I learned that **access modifiers control how class members can be accessed.**

The two modifiers I focused on are:

```text
public
private
```

`public` members can be accessed from outside the class.

`private` members can only be accessed from inside the class.

The most important pattern is:

```text
Private data
     ↓
Public methods
     ↓
Controlled access
```

This helps me keep the internal state and logic of a class under control.

---

# Final Mental Model

```text
Class
  │
  ├── Properties
  │
  ├── Methods
  │
  └── Access Modifiers
          │
          ├── public
          │      ↓
          │    accessible outside
          │
          └── private
                 ↓
               accessible only inside class
```

The main idea I want to remember:

> **Public is what I expose. Private is what I keep inside the class.**
