/*
    Generic Classes

    A generic class allows me to create one class
    that can work with different types of data.

    T is a type placeholder.

    I don't decide what T actually is while creating
    the class. The type is decided when I create
    an object from the class.
*/

class Storage<T> {
    /*
          The class stores multiple items, so I use T[].
  
          T will be replaced by the actual type later.
  
          If T = string
          items becomes string[]
  
          If T = number
          items becomes number[]
      */

    items: T[];

    /*
          The constructor also uses T[] because
          the initial items must match the type
          that this Storage object is created for.
      */

    constructor(items: T[]) {
        this.items = items;
    }

    /*
          This method returns all the stored items.
  
          Since items is T[],
          the return type is also T[].
      */

    getItems(): T[] {
        return this.items;
    }

    /*
          This method adds a new item to the array.
  
          The parameter is T, so the value I add
          must be the same type that this Storage
          object is using.
      */

    addItem(item: T): void {
        this.items.push(item);
    }

    /*
          This method returns the first item.
  
          Since every item in the array is of type T,
          the returned value is also of type T.
      */

    getFirstItem(): T {
        const firstItem = this.items[0];

        if (firstItem === undefined) {
            throw new Error("Storage is empty");
        }

        return firstItem;
    }
}

/*
    Now I am creating a Storage object for strings.

    By writing <string>, I am telling TypeScript:

    "For this object, T should be string."

    So from this point:

    T       -> string
    T[]     -> string[]
    addItem -> accepts string
    getItem -> returns string
*/

const usernames = new Storage<string>(["Vivek", "Rahul", "Aman"]);

console.log(usernames.getItems());

/*
    Since T is string for this object,
    addItem() expects a string.

    This is valid because "Karan" is a string.
*/

usernames.addItem("Karan");

console.log(usernames.getItems());

/*
    getFirstItem() returns T.

    Since T is string here,
    the returned value is a string.
*/

const firstUsername = usernames.getFirstItem();

console.log(firstUsername);

/*
    Now I am using the exact same class for numbers.

    This time:

    T -> number
    T[] -> number[]
    addItem -> accepts number
    getFirstItem -> returns number

    I don't need to create another class
    just for storing numbers.
*/

const marks = new Storage<number>([80, 75, 90]);

console.log(marks.getItems());

marks.addItem(85);

console.log(marks.getItems());

const firstMark = marks.getFirstItem();

console.log(firstMark);

/*
    Generic classes can also work with
    my own custom types.

    First, I create a User type.
*/

type User = {
    name: string;
    age: number;
};

/*
    Now I create a Storage object for User.

    Here:

    T -> User
    T[] -> User[]

    That means every item inside this Storage
    must follow the User type.
*/

const users = new Storage<User>([
    {
        name: "Vivek",
        age: 20,
    },
    {
        name: "Rahul",
        age: 21,
    },
]);

console.log(users.getItems());

/*
    addItem() now expects a User object.

    So I need to provide the properties
    required by the User type.
*/

users.addItem({
    name: "Aman",
    age: 20,
});

console.log(users.getItems());

/*
    getFirstItem() returns a User object.

    Because TypeScript knows the type,
    I can directly access the User properties.
*/

const firstUser = users.getFirstItem();

console.log(firstUser.name);
console.log(firstUser.age);
