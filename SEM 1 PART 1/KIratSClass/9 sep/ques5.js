//given an object create an arrray of objects
let user={
    fname:"akshat",
    age:18,
    city:"delhi"
}

let v=[];
let v1=Object.keys(user);
let v2=(Object.values(user));
console.log(v1);
console.log(v2);
for (let i=0;i<user.length;i++){
    let x1={
        key:v1[i],
        value:v2[i]
    };
v.push(x2)
}

console.log(v);


