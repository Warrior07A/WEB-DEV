// Q2. Rectangle square check
// Description: Add a method to Rectangle class to check if it’s a square.

// const r1 = new Rectangle(5, 5);
// console.log("Is square?", r1.isSquare()); //OP: Is square? true


class Rectangle{
    constructor(l,b){
        this.l=l;
        this.b=b;
    }

    isSquare(){
        return (this.l==this.b)
    }
}


const r1 = new Rectangle(5, 5);
console.log("Is square?", r1.isSquare()); //OP: Is square? true