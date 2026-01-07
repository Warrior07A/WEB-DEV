// Q3. Circle diameter
// Description: Add a method in Circle class to return diameter.
// const c = new Circle(7);
// console.log("Circle diameter:", c.diameter());  //OP: Circle diameter: 14

class Circle{
    constructor(radius){
    this.radius=radius       
    }

    diameter(){
        return 2*this.radius;
    }
}


const c = new Circle(7);
console.log("Circle diameter:", c.diameter());  //OP: Circle diameter: 14