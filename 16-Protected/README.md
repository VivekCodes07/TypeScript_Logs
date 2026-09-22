# 16 — Protected

## Why Am I Learning This?

I already know how `public` and `private` work:

* `public` → accessible from anywhere
* `private` → accessible only inside the same class

But when I use **inheritance**, I may want a property or method to be hidden from outside code while still allowing child classes to use it.

This is where `protected` comes in.

```text
public
   ↓
accessible everywhere

private
   ↓
accessible only inside the same class

protected
   ↓
accessible inside the class
AND
accessible inside child classes
```

---

## What I Am Going to Study

In this lesson I will understand:

* What `protected` means
* How protected properties work
* How protected methods work
* `protected` with inheritance
* Difference between `public`, `private`, and `protected`
* When I would actually use `protected`
* Common mistakes
* How this connects with backend development

---

# 1. What Is Protected?

`protected` is an access modifier used with class properties and methods.

A protected member can be accessed:

* inside the class where it is declared
* inside classes that inherit from it

But it cannot be accessed directly from outside the class.

```typescript
class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}
```

Here `username` is protected.

That means the `User` class can use it, and a child class can also use it.

But this will not be allowed:

```typescript
const user = new User("Vivek");

// user.username;
```

---

# 2. Protected With Inheritance

This is where `protected` becomes useful.

```typescript
class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}

class Admin extends User {
    showUsername() {
        return this.username;
    }
}
```

`Admin` extends `User`.

Because `username` is protected, the child class `Admin` can access it.

```text
User
 │
 └── protected username
          │
          ↓
        Admin
          │
          ↓
    can access username
```

But code outside the classes still cannot access it directly.

---

# 3. Protected Methods

`protected` can also be used with methods.

```typescript
class User {
    protected validateUser(): boolean {
        return true;
    }
}

class Admin extends User {
    createAdmin() {
        return this.validateUser();
    }
}
```

The `validateUser()` method is not available to outside code.

But `Admin` can use it because `Admin` inherits from `User`.

```text
User
 │
 └── protected validateUser()
              │
              ↓
            Admin
              │
              ↓
       can use the method
```

---

# 4. Public vs Private vs Protected

This is the main comparison I need to remember.

| Modifier    | Same Class | Child Class | Outside |
| ----------- | ---------- | ----------- | ------- |
| `public`    | Yes        | Yes         | Yes     |
| `private`   | Yes        | No          | No      |
| `protected` | Yes        | Yes         | No      |

The easiest way to remember:

```text
public
   ↓
Everyone

private
   ↓
Only this class

protected
   ↓
This class + child classes
```

---

# 5. Why Not Just Use Public?

If I make everything public, outside code can directly change or use the data.

For example:

```typescript
class User {
    public username: string;

    constructor(username: string) {
        this.username = username;
    }
}
```

Now anyone can do:

```typescript
const user = new User("Vivek");

user.username = "SomethingElse";
```

Sometimes I don't want outside code to directly control this data.

With `protected`:

```typescript
class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}
```

Now only the class and its child classes can work with it directly.

---

# 6. Protected vs Private

This is the most important difference.

### Private

```typescript
class User {
    private password: string;
}
```

A child class cannot access `password`.

### Protected

```typescript
class User {
    protected username: string;
}
```

A child class can access `username`.

The difference is:

```text
private
   ↓
Parent class only


protected
   ↓
Parent class
     +
Child classes
```

So when I specifically want a child class to use something internally, `protected` can be used.

---

# 7. Protected Is Still Not Public

A common mistake is thinking:

> "Protected means everyone can access it."

That's wrong.

```typescript
class User {
    protected username = "Vivek";
}

const user = new User();

// user.username;
```

The outside code cannot directly access `username`.

`protected` is mainly useful when working with inheritance.

---

# 8. Backend Connection

I can use this concept when building classes that share common internal behavior.

For example:

```text
Base Service
     │
     ├── User Service
     │
     ├── Admin Service
     │
     └── Order Service
```

A parent class can keep some common properties or methods `protected`.

Child classes can reuse them without exposing them to the rest of the application.

This becomes more useful when I start building larger TypeScript backend applications.

---

# 9. Common Mistakes

## Mistake 1 — Thinking Protected Is Accessible Everywhere

It is not.

```typescript
protected username: string;
```

Outside code cannot directly access it.

---

## Mistake 2 — Confusing Protected With Private

```text
private
   ↓
child class cannot access it

protected
   ↓
child class can access it
```

This is the main difference I need to remember.

---

## Mistake 3 — Using Protected Without Inheritance

`protected` becomes especially useful when a class has child classes.

If I don't need inheritance, `private` may be more appropriate for data that should stay inside the class.

---

# 10. Execution Flow

When I create a child class:

```typescript
class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}

class Admin extends User {
    showUsername() {
        return this.username;
    }
}
```

The flow is:

```text
Create Admin
     ↓
Admin extends User
     ↓
User constructor runs
     ↓
username is initialized
     ↓
Admin can access protected username
     ↓
Outside code still cannot access username directly
```

For example:

```typescript
const admin = new Admin("Vivek");

console.log(admin.showUsername());
```

Here `showUsername()` can access the protected property internally.

But this is not allowed:

```typescript
// console.log(admin.username);
```

because the access is happening from outside the class hierarchy.

---

# 11. Complete Mental Model

```text
                    Class
                      │
             ┌────────┼────────┐
             ↓        ↓        ↓
          public   protected  private
             │        │         │
             ↓        ↓         ↓
         Everyone   Class +   Only the
                    Children   same class
```

Another way I can remember it:

```text
public
   ↓
anywhere


protected
   ↓
same class + child classes


private
   ↓
same class only
```

---

# 12. The Main Idea

The purpose of `protected` is to create a middle level of access.

It is more restricted than `public` but more accessible than `private`.

```text
public
   ↓
least restricted


protected
   ↓
middle


private
   ↓
most restricted
```

The important part is **who can access the member**:

```text
public
→ class
→ child classes
→ outside code


protected
→ class
→ child classes


private
→ same class
```

---

# 13. Complete Example

This is the complete runnable example for this lesson:

```typescript
class User {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }

    protected validateUser(): boolean {
        return this.username.trim() !== "";
    }
}

class Admin extends User {
    showUsername(): void {
        console.log(`Admin: ${this.username}`);
    }

    checkUser(): void {
        console.log(`Valid user: ${this.validateUser()}`);
    }
}

const admin = new Admin("Vivek");

admin.showUsername();
admin.checkUser();

// This is not allowed because username is protected.
// console.log(admin.username);
```

The important part is:

```typescript
class Admin extends User {
    showUsername(): void {
        console.log(this.username);
    }
}
```

`Admin` can access `username` because it is a child class of `User`.

But:

```typescript
// admin.username;
```

is not allowed from outside.

---

# 14. Execution Flow of the Example

When I write:

```typescript
const admin = new Admin("Vivek");
```

the flow is:

```text
new Admin("Vivek")
       ↓
Admin extends User
       ↓
User constructor runs
       ↓
username = "Vivek"
       ↓
Admin object is created
```

Then:

```typescript
admin.showUsername();
```

runs:

```text
admin.showUsername()
        ↓
Admin method
        ↓
this.username
        ↓
protected property
        ↓
"Vivek"
```

And:

```typescript
admin.checkUser();
```

runs:

```text
admin.checkUser()
        ↓
this.validateUser()
        ↓
protected method
        ↓
validation result
```

Outside code can call the public methods, but it cannot directly access the protected members.

---

# 15. When Would I Actually Use Protected?

I would use `protected` when:

```text
I have a parent class
        ↓
child classes inherit from it
        ↓
child classes need access to some internal data/method
        ↓
outside code should NOT have direct access
```

For example:

```text
BaseService
     │
     ├── UserService
     ├── AdminService
     └── OrderService
```

If all child services need some common internal method, I could make that method `protected`.

This gives child classes access without making the method available to the whole application.

---

# What I Need to Remember

The main thing I want to remember is:

```text
protected
    ↓
accessible inside the class
        +
accessible inside child classes
        ↓
NOT accessible from outside
```

And the complete comparison:

```text
public
   ↓
same class + child classes + outside


protected
   ↓
same class + child classes


private
   ↓
same class only
```

The simplest mental model is:

```text
public     → anywhere
private    → same class only
protected  → same class + child classes
```

---

# Self-Test

Before moving to the next lesson, I should be able to answer:

1. What does `protected` mean?
2. Can a child class access a protected property?
3. Can outside code access a protected property?
4. What is the difference between `private` and `protected`?
5. Why is `protected` mainly useful with inheritance?
6. Can methods also be protected?
7. Why would I choose `protected` instead of `public`?
8. What happens when a child class inherits a protected property?
9. Can I call a protected method directly from outside the class?
10. What is the difference between `public`, `private`, and `protected`?

If I can explain these without looking at the notes, I understand the main idea of `protected`.

---

# Key Takeaway

`protected` is useful when I want a class member to stay hidden from outside code but still be available to child classes.

```text
public
   ↓
accessible everywhere

private
   ↓
accessible only inside the same class

protected
   ↓
accessible inside the class
        +
accessible inside child classes
```

**Protected = accessible inside the class and its child classes, but not from outside.**
