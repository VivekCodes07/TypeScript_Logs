// Class = blueprint for creating objects
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): void {
        console.log(`Hello ${this.name}`);
    }
}

// Creating objects from the class
const user1 = new User("Vivek", 20);
const user2 = new User("Rahul", 21);

// Accessing object properties
console.log(user1.name);
console.log(user1.age);

// Calling a class method
user1.greet();
user2.greet();


// Class can contain both data and behavior
class BankAccount {
    balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    showBalance(): void {
        console.log(`Balance: ${this.balance}`);
    }
}

const account = new BankAccount(5000);

account.showBalance();


// TypeScript provides type safety
class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

const product = new Product("Laptop", 60000);

console.log(product.name);
console.log(product.price);