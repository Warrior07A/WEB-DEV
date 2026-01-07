// Q9. Polygon parent with super()
// Description: Create a Polygon class with sides. Extend into Rectangle and Triangle.
// class Polygon {
//   constructor(sides) {
//     this.sides = sides;
//   }

//   describe() {
//     return `Polygon with ${this.sides} sides`;
//   }
// }


// console.log(new Rectangle(4, 6).describe()); 
// //OP: Polygon with 4 sides
// console.log(new Rectangle(4,6).perimeter());
// //OP: width is 4 and height is 6 hence the perimeter is 20
// console.log(new Triangle(5, 8).describe());  
// //OP: Poligon with 3 sides


class Polygon {
  constructor(side) {
    this.side=side;
  }

  describe() {
    return `Polygon with ${this.side} sides`;
  }
}

class Rectangle extends Polygon{
    constructor(l,b){
        super(4);
        this.l=l;
        this.b=b;
    }

    isSquare(){
        return (this.l==this.b)
    }
    perimeter(){
    return "width is " +this.l+ "and height is "+ this.b + "hence the perimeter is" +2*(this.l+this.b);
    }
}

class Triangle extends Polygon{
    constructor(b,h){
        super(3);
        this.b=b;
        this.h=h;
    }
    area(){
        return(1/2*this.b*this.h);
    }
}


console.log(new Rectangle(4, 6).describe()); 
//OP: Polygon with 4 sides
console.log(new Rectangle(4,6).perimeter());
//OP: width is 4 and height is 6 hence the perimeter is 20
console.log(new Triangle(5, 8).describe());  
//OP: Poligon with 3 sides