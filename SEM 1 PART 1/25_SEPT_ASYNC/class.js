class Animal{
    constructor(){
        
    }
    static whoAml(){
        return "animal";
    }
}

class Dog extends Animal{
    constructor(){
        super();
    }
    speak(){
        return "bow bow";
    }
}

class Cat extends Animal{
    constructor(){
        super()
    }

    speak(){
        return "meow meow";
    }
}
const a1=new Dog;
console.log(a1.whoAml);


