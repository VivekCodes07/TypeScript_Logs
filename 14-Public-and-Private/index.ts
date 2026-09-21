/* Public and Private */


/*
    1. Public Property

    Public properties can be accessed
    from inside and outside the class.
*/

class User {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const user = new User("Vivek");

console.log(user.name);


/*
    2. Private Property

    Private properties can only be accessed
    inside the class.
*/

class BankAccount {
    private balance: number;

    constructor(balance: number) {
        this.balance = balance;
    }

    public getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(5000);

console.log(account.getBalance());

// console.log(account.balance);
// Private property cannot be accessed from outside the class.


/*
    3. Public Method Accessing Private Data

    A public method can access private data
    because it belongs to the same class.
*/

class UserAccount {
    private password: string;

    constructor(password: string) {
        this.password = password;
    }

    public checkPassword(password: string): boolean {
        return this.password === password;
    }
}

const userAccount = new UserAccount("1234");

console.log(userAccount.checkPassword("1234"));
console.log(userAccount.checkPassword("wrong"));


/*
    4. Private Method

    A private method can only be used
    inside the same class.
*/

class UserService {
    private validateName(name: string): boolean {
        return name.length > 2;
    }

    public createUser(name: string): void {
        if (this.validateName(name)) {
            console.log("User created");
        } else {
            console.log("Invalid name");
        }
    }
}

const userService = new UserService();

userService.createUser("Vivek");

// userService.validateName("Vivek");
// Private method cannot be accessed from outside.


/*
    5. Public vs Private

    public
        ↓
    Can be accessed from outside

    private
        ↓
    Can only be accessed inside the class

    My mental model:

    Private data
         ↓
    Public methods
         ↓
    Controlled access
*/
