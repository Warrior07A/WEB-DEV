class Rectangle{
     //constructor 
    constructor(width,height) {
        
       //instantiate an object
        this.width=width;             //this refers to the rectangle calling Rectangle i.e. rect here
        this.height=height;
    }

    //member functions

    area(){
        return this.width*this.height
    }
}

let rect1=new Rectangle(100,100);
console.log(rect1.area());
