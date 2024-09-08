const increase = (function() {
    let num = 0;

    return function () {
        return ++num;
    }
})();

console.log(increase()); // 1
console.log(increase()); // 2
console.log(increase()); // 3
