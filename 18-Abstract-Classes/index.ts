abstract class Payment {
    // Every payment will have an amount,
    // so I keep this common property in the parent class.
    amount: number;

    constructor(amount: number) {
        // I store the amount here so all child classes
        // can use the inherited property.
        this.amount = amount;
    }

    // This is a normal method, so child classes
    // can directly inherit and use it.
    showAmount(): void {
        console.log(`Amount: ₹${this.amount}`);
    }

    // I don't want to decide the payment logic here.
    // Every child class will have its own implementation of pay().
    abstract pay(): void;
}


class UPI extends Payment {

    constructor(amount: number) {
        // super() calls the parent constructor,
        // which initializes the inherited amount property.
        super(amount);
    }

    // UPI provides its own implementation of pay().
    pay(): void {
        console.log(`Paid ₹${this.amount} using UPI`);
    }
}


class CardPayment extends Payment {

    constructor(amount: number) {
        // I use super() because this child class
        // has its own constructor and needs to initialize the parent.
        super(amount);
    }

    // CardPayment has its own way of making the payment.
    pay(): void {
        console.log(`Paid ₹${this.amount} using Card`);
    }
}


// I cannot create an object directly from Payment
// because Payment is an abstract class.

// const payment = new Payment(500);


// Instead, I create objects from the child classes.
const upi = new UPI(500);
const card = new CardPayment(1000);


// showAmount() comes from the parent Payment class.
upi.showAmount();
card.showAmount();


// pay() is implemented differently by each child class.
upi.pay();
card.pay();