const scores={
    Alice:85,
    Bob:92,
    Akshat:90,
    Seema:71
}


const entries=Object.entries(scores);
const filterentries={};
for (let i=0;i<entries.length;i++){
    const name=entries[i][0];
    const scores=entries[i][1];
    if (scores>80){
        filterentries[name]=scores;
    }
}
console.log(filterentries);