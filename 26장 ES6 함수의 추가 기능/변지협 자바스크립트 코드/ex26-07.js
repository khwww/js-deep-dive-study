const obj = {
    x:1,
    // foo는 매서드다
    foo() {return this.x;},
    // bar에 바인딩 된 함수는 매서드가 아닌 일반 함수다
    bar: function() {return this.x}
}

console.log(obj.foo.hasOwnProperty('prototype')); // false
console.log(obj.bar.hasOwnProperty('prototype')); // true