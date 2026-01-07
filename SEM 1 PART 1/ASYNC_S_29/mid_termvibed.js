//the file path as the input @params (filepath)
//a callback function as an input (function)
//read the file
//convert it to uppercase
//write to the file
//once it is read call the callback fn with  either the contents or the error


// function readwritefile(filepath,op){}

const fs=require("fs");
function readwritefile(filepath, op){
    fs.readFile(filepath,"utf-8",(err,data)=>{
        op(err,data);
    
        //    if (err){
    //     return(op(err,null));
    //    }
       let d=data.toUpperCase();
        fs.writeFile(filepath,data.toUpperCase(),"utf-8",()=>{
            // return op(err,d)
            op(err,dataz )
        })
    }
    )


}

readwritefile("a.txt",function op(err,data){
    if (err){
        console.log(err)
    }
    else{
        console.log("done");
        console.log(data);
    }
})
