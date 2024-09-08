const add = (a,b) => a+b;
console.log(add.call(null,1,2));
console.log(add.apply(null,[1,2]));
console.log(add.bind(null,1,2)());

function add2(a,b) {
    return a+b;
}

console.log(add2.call(null,1,2));
console.log(add2.apply(null,[1,2]));
console.log(add2.bind(null,1,2)());