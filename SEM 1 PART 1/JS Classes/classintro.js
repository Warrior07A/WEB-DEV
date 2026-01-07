//why use classes??


function area(r){
    let width=r.width;
    let heigth=r.height;
    console.log(width*heigth);
}

function perimeter(r){
    let width=r.width;
    let height=r.height;
    console.log(2*(width+height));
}

let obj={
    height:100,
    width:100
}

area(obj);
perimeter(obj)