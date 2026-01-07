const fname=[
    "Aakash",
    "Aadil",
    "Akshat",
    "Harkirat",
    "sambhav",
    "sargam"
]
let obj={};
for(let i=0;i<fname.length;i++){
    const name=fname[i];
    const initial=fname[i][0];
    if (obj){
        obj[initial].push(fname[i]);
    }
    else{
        obj(name)=fname[i];
    }
}