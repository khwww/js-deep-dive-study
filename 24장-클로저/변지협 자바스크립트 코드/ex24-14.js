function makeCounter(aux) {
    let counter = 0;

    return function () {
        counter = aux(counter);
        return counter;
    }
}

function increase(num) {
    return ++num;
}

function decrease(num) {
    return --num;
}

const increaseCounter = makeCounter(increase);
console.log(increaseCounter()); // 1
console.log(increaseCounter()); // 2

const decreaseCounter = makeCounter(decrease);
console.log(decreaseCounter()); // -1
console.log(decreaseCounter()); // -2