/* Interfaces */


/* 
   1. Basic Interface
   An interface describes the structure of an object.
*/

interface User {
    id: number;
    name: string;
    email: string;
}

const user: User = {
    id: 101,
    name: "Vivek",
    email: "vivek@example.com"
};

console.log(user);


/* 
   2. Optional Property
   phone is optional, so it does not have to be present.
*/

interface Student {
    name: string;
    age: number;
    phone?: string;
}

const student: Student = {
    name: "Vivek",
    age: 20
};

console.log(student);


/* 
   3. Readonly Property
   id can be read but cannot be reassigned.
*/

interface Account {
    readonly id: number;
    name: string;
}

const account: Account = {
    id: 101,
    name: "Vivek"
};

account.name = "Rahul";

/* account.id = 102; // Error because id is readonly */

console.log(account);


/* 
   4. Nested Interface
   An interface can use another interface
   to describe nested objects.
*/

interface Address {
    city: string;
    pincode: number;
}

interface Customer {
    id: number;
    name: string;
    address: Address;
}

const customer: Customer = {
    id: 101,
    name: "Vivek",
    address: {
        city: "Mohali",
        pincode: 140301
    }
};

console.log(customer.address.city);


/* 
   5. Interface with Function
   The function expects an object
   that follows the User interface.
*/

function printUser(user: User): void {
    console.log(user.name);
    console.log(user.email);
}

printUser(user);


/* 
   6. Extending an Interface
   Admin gets all properties from User
   and also has its own permissions property.
*/

interface Admin extends User {
    permissions: string[];
}

const admin: Admin = {
    id: 102,
    name: "Vivek",
    email: "vivek@example.com",
    permissions: [
        "create",
        "delete"
    ]
};

console.log(admin);


/* 
   7. Interface with Object Methods
   Interfaces can define methods using regular method signature syntax 
   or property (arrow function) syntax.
*/

interface SmartDevice {
    brand: string;
    turnOn(volume: number): void; /* Method syntax */
    turnOff: () => boolean;       /* Property syntax */
}

const myTv: SmartDevice = {
    brand: "Sony",
    turnOn(volume) {
        console.log(`TV is on at volume ${volume}`);
    },
    turnOff: () => {
        console.log("TV is off");
        return true;
    }
};

myTv.turnOn(15);
myTv.turnOff();


/* 
   My mental model:

   Interface
       ↓
   Describes an object structure

   ?
       ↓
   Optional property

   readonly
       ↓
   Property cannot be reassigned

   extends
       ↓
   Reuse and extend another interface

   method(arg): type OR property: (arg) => type
       ↓
   Defines a method execution contract within the object
*/
