// Lesson 4: Union Types and Type Narrowing

/*
Union Type:
A value can have more than one possible type.

Type Narrowing:
I check which type the value actually is,
then TypeScript narrows it to that specific type.
*/


// Union Type
let id: string | number = 101;

id = "user101";


// Type Narrowing
function printId(id: string | number) {

    if (typeof id === "string") {
        // Here TypeScript narrows id from string | number to string
        console.log(id.toUpperCase());
    } else {
        // Here TypeScript knows id must be number
        console.log(id.toFixed(2));
    }
}

printId(101);
printId("user101");



/*

The actual narrowing happens here:
if (typeof id === "string")
Before this check, TypeScript sees:

id → string | number
Inside the if block:

id → string
Inside the else block:

id → number
So the flow is:

string | number
       ↓
typeof check
       ↓
┌───────────────┬───────────────┐
│ id is string  │ id is number  │
│               │               │
│ toUpperCase() │ toFixed()     │
└───────────────┴───────────────┘

*/