function Base1() {}
class Base2 {}
let condition = true;
class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived);
console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false

// condition이 도중 false로 변경되어도 애초에 처음 클래스가 선언될 때 기준으로 상속받는다.
// 이게 condition에 따라 인스턴스 생성시 상속받는 클래스가 달라지면 유용했을 것 같은데
// 선언 부분에서 결정되는 것이라 별로 안유용한것 같다.
condition = false;
const derived2 = new Derived();
console.log(derived2);
console.log(derived2 instanceof Base1); // true
console.log(derived2 instanceof Base2); // false