const counter = (function() {
    let counter = 0;

    return function (aux) {
        counter = aux(counter);
        return counter;
    }
})();

function increase(num) {
    return ++num;
}

function decrease(num) {
    return --num;
}

console.log(counter(increase)); 
console.log(counter(increase)); 

console.log(counter(decrease)); 
console.log(counter(decrease)); 