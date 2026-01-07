// Q10. Chained super().describe()
// Description: Make Shape → Polygon → Rectangle with describe() in each. Call super().describe() so that all messages print.
// class Shape {
//   describe() {
//     return "I am a shape";
//   }
// }

// console.log(new Rectangle().describe());
// //OP: I'm a shape -> I an a polygon -> I am a rectangle

class Shape{
    
  describe() {
    return "I am a Shape";
  }
}
class Polygon extends Shape{
    constructor(){
     super()
    }
    describe() {
        return "I am a Polygon"+super.describe();
      
  }
}

class Rectangle extends Polygon{
    constructor(){
       super();
    }
    describe() {
      const a= super.describe();
        return "I am a Rectangle" + a ;
         
    
  }
}

console.log(new Rectangle().describe());
//OP: I'm a shape -> I an a polygon -> I am a rectangle