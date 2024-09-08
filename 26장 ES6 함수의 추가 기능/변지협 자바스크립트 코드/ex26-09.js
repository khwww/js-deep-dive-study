const base = {
    name: 'Lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__: base,

    // sayHi는 es6 매서드다. es6 매서드는 [[HomeObject]]를 가지며 super 참조가 가능하다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi());