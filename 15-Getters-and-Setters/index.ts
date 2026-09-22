/* Getters and Setters */

class User {
    public name: string;
    public email: string;
    private password: string;

    constructor(name: string, email: string, password: string) {
        this.name = name;
        this.email = email;
        this.password = password;
    }


    /*
        Getter

        A getter allows me to read a value
        like a normal property.

        I don't call it like a function.
    */
    get username(): string {
        return `Name: ${this.name}`;
    }


    /*
        Getter for private data

        password is private, so I cannot
        directly access user1.password.

        This getter gives me controlled
        read access to it.
    */
    get userPassword(): string {
        return this.password;
    }


    /*
        Setter

        A setter allows me to change a value
        through controlled access.

        It automatically runs when I assign
        a new value to userPassword.
    */
    set userPassword(newPassword: string) {
        this.password = newPassword;
    }
}


const user1 = new User(
    "Vivek",
    "vivek@google.com",
    "knkjanf"
);


/*
    Using the getter

    username is accessed like a property.
*/

console.log(user1.username);


/*
    Reading the private password
    through the getter.
*/

console.log(user1.userPassword);


/*
    Using the setter

    The setter automatically runs when
    I assign a new password.
*/

user1.userPassword = "vivekjankjsn989";


/*
    The getter now returns
    the updated password.
*/

console.log(user1.userPassword);