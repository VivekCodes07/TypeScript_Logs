/* Why Interfaces Are Important */


/*
    1. Create a common contract

    I want different payment methods to have
    the same basic structure.

    Every payment method should have:
    - an amount
    - a pay() method
*/

interface Payment {
    amount: number;

    pay(): void;
}


/*
    2. Different classes implement the same interface

    UPI and CardPayment both follow the
    Payment contract.

    But their actual implementation is different.
*/

class UPI implements Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    pay(): void {
        console.log(`Paid ₹${this.amount} using UPI`);
    }
}


class CardPayment implements Payment {
    amount: number;

    constructor(amount: number) {
        this.amount = amount;
    }

    pay(): void {
        console.log(`Paid ₹${this.amount} using Card`);
    }
}


/*
    3. Create objects

    Both classes follow the same interface,
    but each class has its own implementation.
*/

const upiPayment = new UPI(500);
const cardPayment = new CardPayment(1000);

upiPayment.pay();
cardPayment.pay();


/*
    4. The interface gives me a common structure

    I know that anything implementing Payment
    must have:

        amount
        pay()

    I don't need to know how pay() works internally.
*/


/*
    5. Different classes can be treated
    according to the same contract.

    Both objects are Payments because
    both implement the Payment interface.
*/

const payments: Payment[] = [
    upiPayment,
    cardPayment
];

for (const payment of payments) {
    payment.pay();
}


/*
    This is the main reason interfaces are useful.

    I don't care whether the payment is UPI
    or Card when working with the Payment type.

    I only care that it follows the contract.
*/


/*
    6. What if a class does not follow the contract?

    Payment requires:

        amount
        pay()

    So this class would give an error:

    class CashPayment implements Payment {
        amount: number;
    }

    CashPayment is missing the pay() method.
*/


/*
    My mental model:

                    Payment
                       ↓
                   Contract
                       ↓
             ┌─────────┴─────────┐
             ↓                   ↓
            UPI                 Card
             ↓                   ↓
        own pay()           own pay()
             ↓                   ↓
        UPI logic           Card logic


    Interface
        ↓
    WHAT must exist

    Class
        ↓
    HOW it works
*/


/*
    7. Implementing Multiple Interfaces

    A class can implement more than one interface.

    Here I want an Admin to:
    - have user information
    - have admin permissions
*/

interface UserInfo {
    name: string;
    email: string;
}

interface AdminActions {
    deleteUser(): void;
    blockUser(): void;
}


/*
    Admin implements both interfaces.

    So Admin must provide everything required
    by UserInfo AND AdminActions.
*/

class Admin implements UserInfo, AdminActions {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    deleteUser(): void {
        console.log("User deleted");
    }

    blockUser(): void {
        console.log("User blocked");
    }
}

const admin = new Admin(
    "Vivek",
    "vivek@google.com"
);

console.log(admin.name);
console.log(admin.email);

admin.deleteUser();
admin.blockUser();


/*
    My mental model:

    UserInfo
        ↓
    name + email

    AdminActions
        ↓
    deleteUser() + blockUser()

            ↓

          Admin
            ↓
    implements both interfaces
            ↓
    Must satisfy both contracts
*/