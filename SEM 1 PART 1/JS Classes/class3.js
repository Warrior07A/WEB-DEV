class Square{
    constructor(side){
        this.side=side;
    }

    area(){
        return this.side*this.side;
    }

    perimeter(){
        return 4*this.side
    }
}

let sq1=new Square(40);
console.log(sq1.area());
console.log(sq1.perimeter());