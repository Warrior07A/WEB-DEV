class twodspace {
    constructor(){

    }

    type(){
        return ("2d object")
    }
}

class Circle extends twodspace{

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
    
class Square extends twodspace{
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


//inheritance is a property of Classes ~its's one of the adantages
// how does it work??
// if we want a static method to be inherited , eg many objects are 2d doesn't mean we will write type: 2d in all
//