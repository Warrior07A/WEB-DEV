function normal(name1){
    console.log("this is a normal function" + name1);
    const res  = (name)=>{
        console.log("this is an arrrow function" + "and my name is " + name);
    }
    res("himashi");
}


normal("akshat");