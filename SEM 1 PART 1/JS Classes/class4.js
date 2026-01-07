class Cuboid{
    constructor(l,b,h){
        this.l=l;
        this.b=b;
        this.h=h
    }

    vol(){
        return(this.l*this.b*this.h);
    }

    surface_area(){
        //2(lb+bh+hl);
        return(2*this.l*this.b+this.b*this.h+this.h*this.l)
    }
}

let cub1=new Cuboid(10,10,10);
console.log(cub1.vol());
console.log(cub1.surface_area());