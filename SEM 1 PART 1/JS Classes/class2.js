class Circle{

    constructor(radius){
        this.radius=radius;
    }

    area(){
        return (3.14 * this.radius*this.radius)
    
    }

    perimeter(){
        return (2*3.14* this.radius)
    }
}

let c1=new Circle(20);

console.log(c1.area());

console.log(c1.perimeter());