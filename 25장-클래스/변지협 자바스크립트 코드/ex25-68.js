class Base {
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        return `Hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi() {
        return super.sayHi() + ' How are you?';
    }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee How are you?