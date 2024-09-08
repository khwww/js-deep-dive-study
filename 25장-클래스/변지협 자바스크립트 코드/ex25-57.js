function Base(a) {
    this.a = a;
}

class Derived extends Base {}

const derived = new Derived(1);
console.log(derived.a); // 1