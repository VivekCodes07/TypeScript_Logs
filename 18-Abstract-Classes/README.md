# 18 — Abstract Classes

## Why Am I Learning This?

In the previous lesson, I learned why interfaces are important.

An interface allowed me to define a common contract:

```text
Interface
    ↓
Defines what a class must provide
    ↓
Multiple classes can implement it
    ↓
Each class can have its own implementation
```

But interfaces mainly describe **what should exist**.

Now I want to understand a different situation.

Sometimes I have multiple related classes that:

* share some properties
* share some methods
* but also need some methods to work differently

For this situation, TypeScript provides **abstract classes**.

```text
Abstract Class
       ↓
Common properties
       +
Common methods
       +
Methods that child classes MUST implement
```

---

# What I Am Going To Study

In this lesson I will understand:

* What an abstract class is
* Why I need abstract classes
* The `abstract` keyword
* Abstract properties and methods
* Normal properties and methods inside abstract classes
* How child classes access inherited properties and methods
* How constructors work with abstract classes
* How `super()` works
* When I need to write `super()`
* How child classes implement abstract methods
* Why I cannot create an object of an abstract class
* Abstract class vs interface

---

# 1. What Is an Abstract Class?

An abstract class is a class that is meant to be used as a **base class**.

I cannot directly create an object from it.

```typescript
abstract class Payment {
}
```

This is not allowed:

```typescript
const payment = new Payment();
```

Instead, another class extends it:

```typescript
class UPI extends Payment {
}
```

Then I create an object of the child class:

```typescript
const payment = new UPI();
```

So the basic flow is:

```text
Abstract Class
      ↓
    extends
      ↓
Child Class
      ↓
    object
```

The abstract class provides the base structure, while the child class becomes the actual class whose object I create.

---

# 2. Why Do I Need an Abstract Class?

Suppose I have different types of payments:

```text
UPI
Card
Cash
```

All of them are payments.

They may all need:

```text
amount
showAmount()
```

But the actual `pay()` operation will be different.

```text
Payment
   │
   ├── amount
   ├── showAmount()
   │
   └── pay() → different for each child
```

This is exactly where an abstract class makes sense.

I can keep the common payment logic inside `Payment`, while forcing every child class to provide its own `pay()` implementation.

---

# 3. Creating an Abstract Class

I can put common properties and methods inside the abstract class.

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    showAmount(): void {
        console.log(`Amount: ₹${this.amount}`);
    }
}
```

Here `Payment` contains:

* `amount` → common property
* `showAmount()` → common method
* constructor → initializes the common property

The child classes can reuse all of these.

Even though `Payment` is abstract, its constructor is still a normal constructor.

The important difference is:

```text
abstract class
      ↓
Cannot create Payment object directly
      ↓
But its constructor can run
      ↓
when a child class is created
```

---

# 4. Accessing Abstract Class Properties in Child Classes

When a child class extends an abstract class, it inherits its accessible properties.

I can access them using `this`.

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
}

class UPI extends Payment {

    showPaymentAmount(): void {
        console.log(`UPI payment: ₹${this.amount}`);
    }
}
```

Here:

```typescript
this.amount
```

refers to the `amount` inherited from the `Payment` class.

```text
Payment
   │
   └── amount
         ↓
        UPI
         ↓
    this.amount
```

So I don't need to declare `amount` again inside `UPI`.

---

# 5. How Does the Parent Constructor Run?

This is an important part of inheritance.

Look at this:

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
}

class UPI extends Payment {
}

const upi = new UPI(500);
```

I did not write a constructor inside `UPI`.

So I might wonder:

> How did `Payment`'s constructor receive `500`?

When a derived class does not define its own constructor, JavaScript provides a default constructor that forwards the arguments to the parent constructor.

Conceptually, it behaves like:

```typescript
class UPI extends Payment {

    constructor(...args: any[]) {
        super(...args);
    }
}
```

So:

```typescript
const upi = new UPI(500);
```

effectively results in:

```text
new UPI(500)
      ↓
UPI has no constructor
      ↓
automatic constructor
      ↓
super(500)
      ↓
Payment constructor
      ↓
this.amount = 500
      ↓
UPI object is ready
```

That is why this works:

```typescript
console.log(upi.amount);
```

Output:

```text
500
```

---

# 6. What Is `super()`?

`super()` is used inside a child class to call the **parent class constructor**.

For example:

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
}

class UPI extends Payment {

    constructor(amount: number) {
        super(amount);
    }
}
```

Here:

```typescript
super(amount);
```

means:

> Run the `Payment` constructor and pass `amount` to it.

So when I write:

```typescript
const upi = new UPI(500);
```

the flow is:

```text
new UPI(500)
      ↓
UPI constructor
      ↓
super(500)
      ↓
Payment constructor
      ↓
this.amount = 500
      ↓
back to UPI constructor
      ↓
UPI object is ready
```

---

# 7. Do I Always Need to Write `super()`?

No.

This is an important distinction.

## Child Has No Constructor

If the child class does not have its own constructor:

```typescript
class UPI extends Payment {
}
```

I don't need to manually write `super()`.

The default constructor handles the parent constructor call.

```typescript
const upi = new UPI(500);
```

Conceptually:

```text
UPI has no constructor
        ↓
JavaScript provides a default constructor
        ↓
super(500)
        ↓
Payment constructor
```

---

## Child Has Its Own Constructor

If I create my own constructor inside the child class:

```typescript
class UPI extends Payment {

    constructor(amount: number) {
        super(amount);
    }
}
```

Then I **must call `super()`**.

```typescript
super(amount);
```

is required because `UPI` is a child class of `Payment`.

So my simple rule is:

```text
No child constructor
        ↓
No need to write super()

Child has its own constructor
        ↓
Must call super(...)
```

I should not think:

> "`super()` is recommended, so I should always write it."

Instead:

> **If I create my own child constructor, I must call `super()` to initialize the parent class.**

---

# 8. Why Is `super()` Important?

Suppose I have:

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
}
```

And:

```typescript
class UPI extends Payment {

    constructor(amount: number) {
        super(amount);
    }
}
```

The parent class is responsible for initializing:

```typescript
this.amount
```

So `super(amount)` allows the child constructor to tell the parent:

> Here is the value you need to initialize your part of the object.

```text
UPI
 │
 ├── Child class logic
 │
 └── Payment
      ↓
   amount = 500
```

This becomes especially useful when the child class has its own additional properties.

For example:

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }
}

class UPI extends Payment {
    upiId: string;

    constructor(amount: number, upiId: string) {
        super(amount);
        this.upiId = upiId;
    }
}
```

Now:

```typescript
const payment = new UPI(500, "vivek@upi");
```

The flow is:

```text
new UPI(500, "vivek@upi")
          ↓
UPI constructor
          ↓
super(500)
          ↓
Payment constructor
          ↓
amount = 500
          ↓
back to UPI constructor
          ↓
upiId = "vivek@upi"
```

So the parent initializes the parent part, and the child initializes the child-specific part.

---

# 9. What Happens If I Forget `super()`?

If the child has its own constructor:

```typescript
class UPI extends Payment {

    constructor(amount: number) {
        console.log("Creating UPI");
    }
}
```

I cannot simply omit `super()`.

TypeScript/JavaScript will give an error because a derived class constructor must call the parent constructor before it can use `this` or finish constructing the object.

The correct version is:

```typescript
class UPI extends Payment {

    constructor(amount: number) {
        super(amount);
        console.log("Creating UPI");
    }
}
```

So:

```text
Child constructor
       ↓
super(...)
       ↓
Parent constructor
       ↓
Parent initialization
       ↓
Back to child constructor
       ↓
Child initialization
```

---

# 10. Accessing Abstract Class Methods in Child Classes

The same thing works with normal methods.

If the abstract class has a normal method:

```typescript
abstract class Payment {

    showPayment(): void {
        console.log("This is a payment");
    }
}
```

The child class can directly use it:

```typescript
class UPI extends Payment {

    makePayment(): void {
        this.showPayment();
    }
}
```

Now:

```typescript
const payment = new UPI();

payment.makePayment();
```

The flow is:

```text
UPI object
    ↓
makePayment()
    ↓
this.showPayment()
    ↓
Inherited method from Payment
```

The child class does not need to rewrite `showPayment()`.

---

# 11. Abstract Methods

Now comes the important part.

Sometimes I don't want the parent class to provide the implementation.

I only want to say:

> Every child class must have this method.

I can use an **abstract method**.

```typescript
abstract class Payment {

    abstract pay(): void;
}
```

Notice that there is no method body.

The child class must implement it.

```typescript
class UPI extends Payment {

    pay(): void {
        console.log("Payment made using UPI");
    }
}
```

Another child class can implement it differently:

```typescript
class CardPayment extends Payment {

    pay(): void {
        console.log("Payment made using Card");
    }
}
```

So:

```text
Payment
   ↓
abstract pay()
   ↓
 ┌───────────────┐
 ↓               ↓
UPI             Card
 ↓               ↓
UPI logic       Card logic
```

---

# 12. Complete Example

Now I can combine everything together.

```typescript
abstract class Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    showAmount(): void {
        console.log(`Amount: ₹${this.amount}`);
    }

    abstract pay(): void;
}


class UPI extends Payment {

    constructor(amount: number) {
        super(amount);
    }

    pay(): void {
        console.log(`Paid ₹${this.amount} using UPI`);
    }
}


class CardPayment extends Payment {

    constructor(amount: number) {
        super(amount);
    }

    pay(): void {
        console.log(`Paid ₹${this.amount} using Card`);
    }
}


const upi = new UPI(500);
const card = new CardPayment(1000);

upi.showAmount();
card.showAmount();

upi.pay();
card.pay();
```

The output would be:

```text
Amount: ₹500
Amount: ₹1000

Paid ₹500 using UPI
Paid ₹1000 using Card
```

---

# 13. What Is Actually Happening?

When I create:

```typescript
const upi = new UPI(500);
```

`UPI` extends `Payment`.

Because `UPI` has its own constructor:

```typescript
constructor(amount: number) {
    super(amount);
}
```

the parent constructor runs first.

```text
new UPI(500)
      ↓
UPI constructor
      ↓
super(500)
      ↓
Payment constructor
      ↓
this.amount = 500
      ↓
UPI constructor continues
      ↓
UPI object ready
```

The object gets access to the members defined in `Payment`.

```text
UPI Object
    │
    ├── amount
    │
    ├── showAmount()
    │
    └── pay()
         ↑
      UPI's implementation
```

The important distinction is:

```text
amount
    ↓
comes from Payment

showAmount()
    ↓
comes from Payment

pay()
    ↓
implemented by UPI
```

---

# 14. Can the Child Class Access the Parent's Property?

Yes.

If the property is accessible, the child class can use it through `this`.

```typescript
abstract class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Admin extends User {

    showName(): void {
        console.log(this.name);
    }
}
```

Here `name` belongs to the parent class, but `Admin` can access it.

```typescript
const admin = new Admin("Vivek");

admin.showName();
```

Output:

```text
Vivek
```

The flow is:

```text
User
 ↓
name
 ↓
Admin extends User
 ↓
this.name
```

---

# 15. Can the Child Class Access the Parent's Method?

Yes.

```typescript
abstract class User {

    showMessage(): void {
        console.log("Welcome to the application");
    }
}

class Admin extends User {

    showAdminPage(): void {
        this.showMessage();
        console.log("Opening admin page");
    }
}
```

Here `Admin` uses the inherited method:

```typescript
this.showMessage();
```

So the child class can reuse functionality already written in the abstract class.

---

# 16. What If I Want to Call the Parent Method?

Sometimes I override a method in the child class but still want to run the parent's version.

I can use:

```text
super
```

Example:

```typescript
abstract class User {

    showMessage(): void {
        console.log("Welcome to the application");
    }
}

class Admin extends User {

    showMessage(): void {
        super.showMessage();
        console.log("Welcome Admin");
    }
}
```

Now:

```typescript
const admin = new Admin();

admin.showMessage();
```

Output:

```text
Welcome to the application
Welcome Admin
```

Here:

```typescript
super.showMessage();
```

calls the method from the parent class.

So there are two important uses of `super`:

```text
super(...)
    ↓
Call parent constructor

super.method()
    ↓
Call parent method
```

---

# 17. Why Can't I Create an Abstract Class Object?

Suppose I have:

```typescript
abstract class Payment {
    abstract pay(): void;
}
```

I cannot do:

```typescript
const payment = new Payment();
```

Because `Payment` is incomplete.

It says that `pay()` must exist, but it doesn't provide the implementation.

The child class completes that behavior:

```text
Payment
   ↓
abstract pay()
   ↓
UPI
   ↓
pay() implementation
```

So I create an object of `UPI`, not `Payment`.

---

# 18. Abstract Class vs Interface

This connects directly with my previous lesson.

### Interface

An interface mainly defines a contract.

```typescript
interface Payment {
    pay(): void;
}
```

A class implements it:

```typescript
class UPI implements Payment {
    pay(): void {
        console.log("Paid using UPI");
    }
}
```

The interface tells me:

```text
WHAT must exist
```

---

### Abstract Class

An abstract class can provide:

```text
WHAT must exist
+
COMMON CODE
```

For example:

```typescript
abstract class Payment {
    amount: number;

    showAmount(): void {
        console.log(this.amount);
    }

    abstract pay(): void;
}
```

Here the parent class provides some actual implementation.

So my mental model is:

```text
Interface
    ↓
Contract

Abstract Class
    ↓
Contract
+
Shared implementation
```

---

# 19. `implements` vs `extends`

I should also remember the keywords.

With an interface:

```typescript
class UPI implements Payment
```

With an abstract class:

```typescript
class UPI extends Payment
```

The difference:

```text
implements
    ↓
Follow an interface contract

extends
    ↓
Inherit from a class
```

An abstract class can therefore provide actual inherited code, while an interface mainly defines the structure that a class must follow.

---

# 20. When Would I Use an Abstract Class?

I would consider an abstract class when multiple related classes:

* share common properties
* share common methods
* have a parent-child relationship
* need some methods to have different implementations

For example:

```text
             Payment
          Abstract Class
                │
       ┌────────┴────────┐
       ↓                 ↓
      UPI               Card
       ↓                 ↓
   own pay()         own pay()
```

The common payment logic stays in the parent.

The payment-specific logic stays in the child.

---

# Backend Connection

This concept can become useful when I build larger TypeScript backend applications.

For example:

```text
             BaseService
                  │
       ┌──────────┼──────────┐
       ↓          ↓          ↓
   UserService OrderService PaymentService
```

A base service could contain common functionality, while child services provide their own specific behavior.

I don't need to use abstract classes everywhere.

I just need to recognize the situation where:

> **Several related classes share some implementation but must provide their own specific behavior.**

---

# Execution Flow

When I use an abstract class:

```text
Create Abstract Class
        ↓
Define common properties
        ↓
Define common methods
        ↓
Define abstract methods
        ↓
Child class extends it
        ↓
Child creates its constructor if needed
        ↓
super(...) calls parent constructor
        ↓
Parent initializes common properties
        ↓
Child initializes its own properties
        ↓
Child inherits common members
        ↓
Child implements abstract methods
        ↓
Create object of child class
        ↓
Use inherited + child-specific behavior
```

---

# Final Mental Model

```text
                 Abstract Class
                       │
          ┌────────────┼────────────┐
          ↓            ↓            ↓
      Property      Method      Abstract Method
          ↓            ↓            ↓
       shared       shared      child must
       data         code        implement
          │            │            │
          └────────────┴────────────┘
                       ↓
                  Child Class
                       ↓
                extends parent
                       ↓
                 super(...)
                       ↓
             parent constructor
                       ↓
          inherits + implements
```

The main thing I want to remember:

> **Abstract class = a base class that provides common functionality and forces child classes to implement specific behavior.**

And when I need to access inherited members from the child class:

```text
this.property
    ↓
access inherited property

this.method()
    ↓
access inherited method

super(...)
    ↓
call parent constructor

super.method()
    ↓
explicitly call parent method
```

---

# Self-Test

Before moving to the next lesson, I should be able to answer:

1. What is an abstract class?
2. Why can't I create an object directly from an abstract class?
3. What is an abstract method?
4. How does a child class implement an abstract method?
5. How can a child class access a property inherited from the abstract class?
6. How can a child class access a normal method inherited from the abstract class?
7. What does `super()` do?
8. Do I always need to write `super()`?
9. What happens when a child class has no constructor?
10. Why must I call `super()` when I create my own child constructor?
11. What does `super.method()` do?
12. What is the difference between `implements` and `extends`?
13. What is the difference between an interface and an abstract class?
14. When would I choose an abstract class instead of just using an interface?

If I can explain these in my own words and understand the `Payment` example, I understand the main purpose of abstract classes.

---

# Key Takeaway

I learned that an abstract class is useful when I have related classes that need **both a common structure and common implementation**.

```text
Interface
    ↓
Defines the contract

Abstract Class
    ↓
Defines the contract
+
Provides shared implementation

Child Class
    ↓
Extends the abstract class
    ↓
super(...)
    ↓
Initializes the parent part
    ↓
Reuses inherited code
    ↓
Implements its own specific behavior
```

The constructor rule I want to remember is:

```text
Child has NO constructor
        ↓
No need to write super()

Child HAS its own constructor
        ↓
Must call super(...)
        ↓
Parent constructor runs
```

And:

```text
super(...)
    ↓
Parent constructor

super.method()
    ↓
Parent method
```

> **Abstract classes let me keep common code in one place while forcing child classes to provide the behavior that is specific to them.**
