// TypeScript can also infer the return type of a function from the value returned by the function.

function add(a: number, b: number) {
    return a + b;
}

/* TypeScript understands:
  
   a → number
   b → number
   return value → number
  
   So the return type of add() is inferred as number.
*/
const result = add(10, 20);

console.log(result);