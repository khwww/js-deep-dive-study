## 33.1 심벌이란?

- Symbol은 ES6에서 도입된 7번째 데이터 타입
- 변경 불가능한 원시 타입의 값
- Symbol 값은 다른 값과 중복되지 않는 유일무이한 값
- 주로 이름의 충돌 위험이 없는 유일한 프로퍼티 키를 만들기 위해 사용

<br>

## 33.2 심벌 값의 생성

- Symbol 함수

  - 다른 원시 값은 리터럴 표기법을 통해 값을 생성할 수 있음
  - 근데 심벌 값은 Symbol 함수를 호출하여 생성해야 함
  - 이때 심벌 값은 외부로 노출되지 않아 확인할 수 없으며, 다른 값과 절대 중복되지 않는 유일무이한 값

    ```jsx
    const mySymbol = Symbol();
    console.log(typeof mySymbol); // symbol

    console.log(mySymbol); // Symbol()

    new Symbol(); // Symbol is not a constructor
    ```

  - Symbol 함수에는 문자열을 인수로 전달할 수 있음 → 이 문자열은 생성된 심벌 값에 대한 디버깅 용도로만 사용, 심벌 값 생성에 영향을 주지 않음

    ```jsx
    const mySymbol1 = Symbol("mySymbol");
    const mySymbol2 = Symbol("mySymbol");

    console.log(mySymbol1 === mySymbol2); // false
    ```

  - 심벌 값도 문자열, 숫자, 불리언 같이 객체처럼 접근하면 암묵적으로 래퍼 객체를 생성

    ```jsx
    const mySymbol = Symbol("mySymbol");

    console.log(mySymbol.description); // mySymbol
    console.log(mySymbol.toString()); // Symbol(mySymbol)
    ```

  - 심벌 값은 암묵적으로 문자열이나 숫자 타입으로 변환되지 않음

    ```jsx
    const mySymbol = Symbol("mySymbol");

    console.log(mySymbol + ""); // Cannot convert a Symbol value to a string
    console.log(+mySymbol); // Cannot convert a Symbol value to a number
    ```

  - 불리언 타입으로는 암묵적 타입 변환됨

    ```jsx
    const mySymbol = Symbol();

    console.log(!!mySYmbol); // true

    if (mySymbol) console.log("good");
    ```

- Symbol.for / Symbol.keyFor 메서드

  - Symbol.for 메서드는 인수로 전달받은 문자열을 키로 사용해, 키와 심벌 값의 쌍들이 저장되어 있는 전역 심벌 레지스트리(global symbol registry)에서, 해당 키와 일치하는 심벌 값을 검색

    - 검색 성공 → 새로운 심벌 값 생성하지 않고 검색된 심벌 값 반환
    - 검색 실패 → 새로운 심벌 값 생성하여, Symbol.for 메서드의 인수로 전달된 키로 전역 심벌 레지스트리에 저장하고, 생성된 심벌 값 반환

      ```jsx
      const s1 = Symbol.for("soob");
      const s2 = Symbol.for("soob");

      console.log(s1 === s2); // true
      ```

  - Symbol 함수 호출 시 유일무이한 심벌 값을 생성함 → 이때 JS 엔진이 관리하는 전역 심벌 레지스트리에서 심벌 값을 검색할 수 있는 키를 지정할 수 없으므로, 전역 심벌 레지스트리에 등록되어 관리 X
  - 하지만 Symbol.for을 사용하면, 애플리케이션 전역에서 중복되지 않는 유일무이한 상수인 심벌 값을 단 하나만 생성하여, 전역 심벌 레지스트리를 통해 공유할 수 O

    ```jsx
    const s1 = Symbol.for("soob");

    // Symbol.keyFor() 시 전역 심벌 레지스트리에서 심벌 값의 키를 추출
    Symbol.keyFor(s1); // soob

    // Symbol 함수를 통해 생성한 심벌은 전역 심벌 레지스트리에 등록되어 관리되지 않음
    const s2 = Symbol("soob");
    Symbol.keyFor(s2); // undefined
    ```

<br>

## 33.3 심벌과 상수

- 다음 예제와 같이 value에는 의미가 없고, 상수 이름 자체에 의미가 있는 경우가 있음

  - 이때 상수 값은 변경될 수 있으며, 다른 변수 값과 중복될 수도 있음
  - 이러한 경우 무의미한 상수 대신 심벌 값을 사용할 수 있음

    ```jsx
    // ex-1
    const Direction = {
      UP: 1,
      DOWN: 2,
      LEFT: 3,
      RIGHT: 4,
    };

    const myDirection = Direction.UP;
    if (myDirection === Direction.UP) {
      console.log("ex-1. up...");
    }
    ```

  - ex-1에서 무의미한 상수 값 대신 심벌을 사용하여 변경

    ```jsx
    // ex-2
    const Direction = {
      UP: Symbol("up"),
      DOWN: Symbol("down"),
      LEFT: Symbol("left"),
      RIGHT: Symbol("right"),
    };

    const myDirection = Direction.UP;
    if (myDirection === Direction.UP) {
      console.log("ex-2. up...");
    }
    ```

- JS에서 enum 흉내내서 사용해보기

  ```jsx
  const Direction = Object.freeze({
    UP: Symbol("up"),
    DOWN: Symbol("down"),
    LEFT: Symbol("left"),
    RIGHT: Symbol("right"),
  });

  const myDirection = Direction.UP;
  if (myDirection === Direction.UP) {
    console.log("js enum. up...");
  }
  ```

<br>

## 33.4 심벌과 프로퍼티 키

- 심벌 값은 유일무이한 값이므로 심벌 값으로 프로퍼티 키를 만들면 다른 프로퍼티 키와 절대 충돌하지 않음

  ```jsx
  const obj = {
    [Symbol.for("soob")]: 1,
  };

  obj[Symbol.for("soob")]; // 1
  ```

<br>

## 33.5 심벌과 프로퍼티 은닉

- 심벌 값을 프로퍼티 키로 사용하여 생성한 프로퍼티는 for…in, Object.keys, Object.getownPropertyNames로 찾을 수 없음

  ```jsx
  const obj = {
    [Symbol.for("soob")]: 1,
  };

  for (const key in obj) {
    console.log(key); // 출력 없음
  }

  console.log(Object.keys(obj)); // []
  console.log(Object.getownPropertyNames(obj)); // []

  console.log(Object.getOwnPropertySymbols(obj)); // [Symbol('soob')]

  const symbolKey = Object.getOwnPropertySymbols(obj)[0];
  console.log(obj[symbolKey]); // 1
  ```

<br>

## 33.6 심벌과 표준 빌트인 객체 확장

- 표준 빌트인 객체에 사용자 정의 메서드를 직접 추가하여 확장하는 것은 권장하지 않음 → 개발자가 직접 추가한 메서드와 미래의 표준 사양으로 추가될 메서드의 이름이 중복될 수 있기 때문

  ```jsx
  // 추가하고 싶다면 이런식으로 Symbol을 사용하는 게 나음
  Array.prototype[Symbol.for("sum")] = function () {
    return this.reduce((acc, cur) => acc + cur, 0);
  };

  [1, 2][Symbol.for("sum")](); // 3
  ```

<br>

## 33.7 Well-known Symbol

- JS가 기본 제공하는 빌트인 심벌 값을 ECMAScript 사양에서는 Well-known Symbol이라고 부름
- Well-known Symbol은 JS 엔진의 내부 알고리즘에 사용됨
  - Array, String … 과 같이 for…of로 순회 가능한 빌트인 이터러블은 Well-knwon Symbol인 Symbol.iterator를 키로 갖는 메서드를 가짐
- 심벌은 중복되지 않는 상수 값을 생성하는 것은 물론, 기존에 작성된 코드에 영향을 주지 않고 새로운 프로퍼티를 추가하기 위해, 즉 하위 호환성을 보장하기 위해 도입됨
