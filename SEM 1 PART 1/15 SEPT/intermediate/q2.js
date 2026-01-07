
// ​
// // Sum all transactions per user

// let x=[
//   { user: "A", amount: 100 },
//   { user: "B", amount: 200 },
//   { user: "A", amount: 50 }
// ]

// OUTPUT
// { A: 150, B: 200 }
// // console.log(x[0]["user"])
let x=[
  { user: "A", amount: 100 },
  { user: "B", amount: 200 },
  { user: "A", amount: 50 }
]
let x1={};
for (let i=0;i<x.length;i++){
    if (x1[x[i]["user"]]){
        x1[x[i]["user"]]+=x[i]["amount"];
    }
    else{
        x1[x[i]["user"]]=x[i]["amount"];
        // console.log("hi ");
    }
}
console.log(x1);


