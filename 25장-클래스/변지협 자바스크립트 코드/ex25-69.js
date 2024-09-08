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
        const __super = Object.getPrototypeOf(Derived.prototype);
        return __super.sayHi.call(this) + ' How are you?';
    }
}

const derived = new Derived('Lee');
console.log(derived.sayHi()); // Hi! Lee How are you?