class Base {}

class Derived extends Base {
    constructor() {
        console.log('constructor call'); // 상속 받았는데 super 키워드 안써서 에러남
    }
}

const derived = new Derived();