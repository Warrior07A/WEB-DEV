// Q5. Square class
// Description: Make a Square class with methods for area and perimeter.
// const s = new Square(4);
// console.log("Square area:", s.area());
// console.log("Square perimeter:", s.perimeter());

class Square{
    constructor(side){
        this.side=side;
    }

    area(){
        return this.side*this.side;
    }
    perimeter(){
        return 4*this.side;
    }
}


const s = new Square(4);
console.log("Square area:", s.area());
console.log("Square perimeter:", s.perimeter());

