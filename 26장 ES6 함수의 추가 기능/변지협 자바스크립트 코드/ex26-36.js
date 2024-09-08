const counter = {
    num: 1,
    increase: function() {return ++this.num} 
};

console.log(counter.increase()); // 2

const counter_arrow = {
    num: 1,
    increase: () => ++this.num
};

console.log(counter_arrow.increase()); // NaN