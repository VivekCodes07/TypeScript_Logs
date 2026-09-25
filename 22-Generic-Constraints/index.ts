/*
    Generic Constraints

    A Generic allows me to work with different types.

    But sometimes I don't want T to accept every type.

    I can say:

    "T can be different types, but it must have
    certain properties."

    This is called a Generic Constraint.
*/


/*
    I first create the requirement.

    Any type satisfying HasName must have:
    name: string
*/

type HasName = {
    name: string;
};


/*
    T extends HasName means:

    T can be different types,
    but T must have name: string.

    Because of this constraint, TypeScript knows
    that value.name exists.
*/

function printName<T extends HasName>(value: T): void {
    console.log(value.name);
}


printName({
    name: "Vivek",
    age: 20
});

printName({
    name: "Rahul",
    department: "CSE"
});

// printName(20);
// Error: number does not satisfy HasName


/*
    Generic Constraints also work with classes.

    One class can work with different types,
    as long as those types satisfy HasName.
*/

class UserStorage<T extends HasName> {

    items: T[];

    constructor(items: T[]) {
        this.items = items;
    }

    addItem(item: T): void {
        this.items.push(item);
    }

    printNames(): void {
        for (const item of this.items) {
            console.log(item.name);
        }
    }

    getItems(): T[] {
        return this.items;
    }
}


type Student = {
    name: string;
    age: number;
};


const students = new UserStorage<Student>([
    {
        name: "Vivek",
        age: 20
    },
    {
        name: "Rahul",
        age: 21
    }
]);

students.addItem({
    name: "Aman",
    age: 20
});

students.printNames();


/*
    I can reuse the same class with another type.

    Employee also has name: string,
    so it satisfies HasName.
*/

type Employee = {
    name: string;
    salary: number;
};


const employees = new UserStorage<Employee>([
    {
        name: "Karan",
        salary: 60000
    }
]);

employees.addItem({
    name: "Rohit",
    salary: 55000
});

employees.printNames();


/*
    Another common constraint is checking for length.

    Any type used here must have:

    length: number
*/

type HasLength = {
    length: number;
};


function getLength<T extends HasLength>(value: T): number {
    return value.length;
}


console.log(getLength("Vivek"));       // string
console.log(getLength([10, 20, 30]));  // array

console.log(getLength({
    length: 5,
    value: "Hello"
}));

// getLength(20);
// Error: number does not have length


/*
    Main idea:

    Normal Generic:

        T

        T can be different types.


    Generic Constraint:

        T extends SomeType

        T can still be different types,
        but T must satisfy SomeType.


    So:

        T extends HasName

    means:

        "I don't know the exact type,
         but I know it has name: string."
*/

