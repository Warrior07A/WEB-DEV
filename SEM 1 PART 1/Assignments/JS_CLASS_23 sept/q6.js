// Q6. Compare areas of rectangles
// Description: Add method in Rectangle class to check if another rectangle has the same area.
// const r1 = new Rectangle(4, 5);
// const r2 = new Rectangle(10, 2);
// console.log("Same area?", r1.hasSameArea(r2)); //Same area? true

class Rectangle{
    constructor(l,b){
        this.l=l;
        this.b=b;
    }
    hasSameArea(r2){
        if (this.l*this.b==r2.l*r2.b){
            return true;
        }
        return false;
    }
}


const r1 = new Rectangle(4, 5);
const r2 = new Rectangle(10, 2);
console.log("Same area?", r1.hasSameArea(r2)); //Same area? true