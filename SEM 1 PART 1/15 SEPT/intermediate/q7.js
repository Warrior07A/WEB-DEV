// Sort array of objects by name then age
// Input:
// [
//   { name: "Alice", age: 30 },
//   { name: "Bob", age: 25 },
//   { name: "Alice", age: 22 }
// ]


// ​
// Output:
// [
//   { name: "Alice", age: 22 },
//   { name: "Alice", age: 30 },
//   { name: "Bob", age: 25 }
// ]

let x=[
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Alice", age: 22 }
]

console.log(Object.values(x));



