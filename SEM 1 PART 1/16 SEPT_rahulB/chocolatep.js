
// CHOCLATE PROB:
// Convert the object where languages are the top-level keys, and inside each are translation strings by key into an object where translation keys are the top-level keys, and inside each you store values per language
// Input:
// {
//   en: { hello: "Hello", bye: "Goodbye" },
//   fr: { hello: "Bonjour", bye: "Au revoir" },
//   es: { hello: "Hola" }
// }
// ​
// Output:
// {
//   hello: { en: "Hello", fr: "Bonjour", es: "Hola" },
//   bye: { en: "Goodbye", fr: "Au revoir" }
// }

let x={
  en: { hello: "Hello", bye: "Goodbye" },
  fr: { hello: "Bonjour", bye: "Au revoir" },
  es: { hello: "Hola" }
}

// let obj={};
// for (let i=0;i<x[i].len)
    // console.log(x);`
let key2=Object.keys(value1[i]);
let value2=Object.values(value1[i]);
let key1=(Object.keys(x));
let value1=(Object.values(x))
let innerkey=key1[0]
for (let i=0;i<value1.length;i++){
    
    
    // console.log("keys");
    // console.log(key2);
    // console.log("values");
    // console.log(value2);
}