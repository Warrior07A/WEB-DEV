// Q8. Use super() with color property
// Description: Create a Shape class with color. Use super() in child classes.
class Shape {
  constructor(color) {
    this.color = color;
  }

  
}

class Rectangle extends Shape{
    constructor(l,b,color){
        super(color);
        this.l=l;
        this.b=b;
        this.color=color;
    }

    isSquare(){
        return (this.l==this.b)
    }
    describe(){
    return "Rectangle with color "+ this.color.toUpperCase() + " and width is "+this.l+ " and height is"+this.b;
    }
}
class Circle extends Shape{
    constructor(radius,color){
        super(color);
        this.radius=radius       
    }

    diameter(){
        return 2*this.radius;
    }
    describe(){
    return "Circle with color "+ this.color.toUpperCase() + " and radius is "+this.radius;
    }
}
console.log(new Rectangle(5, 8, "red").describe()); 
//Rectangle with color RED and width is 5 and height is 8
console.log(new Circle(7, "blue").describe());
//Circle with color BLUE and radius is 6