// Q4. Add perimeter method
// Description: Add perimeter to Rectangle and Circle.
// console.log("Rectangle perimeter:", new Rectangle(4, 6).perimeter());
// console.log("Circle perimeter:", new Circle(5).perimeter());

class Rectangle{
    constructor(l,b){
        this.l=l;
        this.b=b;
    }

    isSquare(){
        return (this.l==this.b)
    }
    perimeter(){
        return 2*(this.l+this.b)
    }
}
class Circle{
    constructor(radius){
    this.radius=radius       
    }

    diameter(){
        return 2*this.radius;
    }
    perimeter(){
        return 2 * 3.14 * this.radius
    }
}

console.log("Rectangle perimeter:", new Rectangle(4, 6).perimeter());
console.log("Circle perimeter:", new Circle(5).perimeter());