//writing a sum function called sum that takes a  umber n as an input iterates in a for loop frpm 1 to n \
//finds sum adn returns it
let sum1=0;
function sum(n){
    for (let i=1;i<=n;i++){
        sum1+=i;
    }
    return sum1;
}

sum(100);