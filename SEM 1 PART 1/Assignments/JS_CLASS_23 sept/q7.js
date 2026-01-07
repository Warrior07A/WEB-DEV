// Q7. Inheritance + overriding describe()
// Description: Create a Shape parent class. Extend into Rectangle and Circle and override describe().
// console.log(new Shape().describe()); //OP: I am a shape
// console.log(new Rectangle().describe()); //OP:  I am a rectangle
// console.log(new Circle().describe()); //OP: I am a circle

class Shape{
    describe(){
        return "I am a shape";

    }
}

class Circle extends Shape{
    constructor(){
        super();
        
    }

    describe(){
        return "I am a circle";
    }
}

class Rectangle extends Shape{
    constructor(){
        super()
    }
    describe(){
        return "I am a rectangle";
    }
}



console.log(new Shape().describe()); //OP: I am a shape
console.log(new Rectangle().describe()); //OP:  I am a rectangle
console.log(new Circle().describe()); //OP: I am a circle

