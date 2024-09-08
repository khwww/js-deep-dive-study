class Base {}

class Derived extends Base {
    constructor() {
        super(); // ok
        this.a = 1;
        super(); // this 참조할 수 없음
    } 
}

const derived = new Derived();