/* Protected */


/*
    1. The problem with private

    private keeps a property hidden from outside code.

    But there is one problem:

    If a child class needs to use that property,
    private will not allow it.
*/

class User {
    private username: string;

    constructor(username: string) {
        this.username = username;
    }
}


/*
    Admin extends User.

    But username is private inside User,
    so Admin cannot directly access it.
*/

class Admin extends User {

    showUsername() {
        // return this.username;
    }
}


/*
    So private gives me:

    Parent class → YES
    Child class  → NO
    Outside      → NO
*/


/*
    2. Why do we need protected?

    Sometimes I want to hide data from outside code,
    but I still want child classes to use it.

    This is exactly where protected is useful.
*/

class Account {
    protected username: string;

    constructor(username: string) {
        this.username = username;
    }
}


/*
    Admin extends Account.

    username is protected, so the child class
    can access it.
*/

class AdminAccount extends Account {

    showUsername(): string {
        return this.username;
    }
}

const admin = new AdminAccount("Vivek");

console.log(admin.showUsername());


/*
    But protected still keeps the property
    hidden from outside code.

    I cannot do:

    console.log(admin.username);

    because username is protected.
*/


/*
    3. Private vs Protected

    private:

        Parent class → YES
        Child class  → NO
        Outside      → NO

    protected:

        Parent class → YES
        Child class  → YES
        Outside      → NO
*/


/*
    4. Protected Method

    protected can also be used with methods.

    The child class can use the method,
    but outside code cannot access it.
*/

class UserService {
    protected validateUser(): boolean {
        return true;
    }
}

class AdminService extends UserService {

    createAdmin(): void {
        if (this.validateUser()) {
            console.log("Admin created");
        }
    }
}

const adminService = new AdminService();

adminService.createAdmin();


/*
    My main understanding:

    private
        ↓
    Hide it from everyone,
    including child classes.

    protected
        ↓
    Hide it from outside code,
    but allow child classes to use it.

    So protected exists because sometimes
    inheritance needs controlled access.
*/