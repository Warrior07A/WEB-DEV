
// ### 7. **Remove duplicate objects by id**
// **Question:**
// Print array of object which contains unique key

// INPUT: [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" },
//   { id: 1, name: "A" }
// ]

// OUTPUT: [
//   { id: 1, name: "A" },
//   { id: 2, name: "B" }
// ```
let x=[
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 1, name: "A" }
]
let keys=Object.keys(x);
let values=Object.values(x);
console.log(keys);
console.log(values);
// console.log(x[0])
let push=[];
