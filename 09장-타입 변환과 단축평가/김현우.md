## 9.1 타입 변환이란?

- 명시적 타입 변환 (타입 캐스팅)
  - 개발자가 의도적으로 값의 타입을 변환하는 것
    ```jsx
    var x = 10;
    var str = x.toString(); // 숫자를 문자열로 타입 캐스팅
    console.log(typeof str, str); // string 10
    console.log(typeof x, x); // number 10
    ```
- 암묵적 타입 변환 (타입 강제 변환)
  - 개발자의 의도와 상관없이, 표현식 평가 도중, JS 엔진 의해 타입이 변환되는 것
    ```jsx
    var x = 10;
    var str = x + ""; // 숫자와 문자열을 더해서, 숫자의 타입이 문자열로 변환됨
    console.log(typeof str, str); // string 10
    console.log(typeof x, x); // number 10
    ```
- 명시적 타입 변환이나 암묵적 타입 변환이 기존 원시 값을 직접 변경하는 것은 아님 (위의 코드 예제들)
  - 원시 값은 변경 불가능한 값
  - 타입 변환은 기존 원시 값을 이용해, 다른 타입의 새로운 원시 값을 생성하는 것
- JS 엔진은 표현식을 에러 없이 평가하기 위해, 피연산자의 값을 암묵적 타입 변환, 새 타입의 값을 만들어 단 한 번 사용하고 버림
- 명시적 타입 변환보다 암묵적 타입 변환이 가독성 측면에서 더 나을 때도 있음
  - ex. (10).toString() 보다, 10+’’ 이 더 이해하기 쉬움

<br>

## 9.2 암묵적 타입 변환

- 어떤 타입으로 변할지 예측이 어려운 예시들 (나만 헷갈림?)

  ```jsx
  // 피연산자가 모두 문자열 타입이어야 하는 문맥
  '10' + 2 // 102

  // 피연산자가 모두 숫자 타입이어야 하는 문맥
  5 * '10' // 50

  // 피연산자 또는 표현식이 불리언 타입이어야 하는 문맥
  !0 // 0이 아님 = false가 아님 = true
  if (1) { ... }
  ```

- 문자열 타입으로 변환

  - ‘+’ 연산자가 문자열 연결 연산자로 동작하는 경우
    ```jsx
    1 + "2"; // 12
    ```
  - JS 엔진은 문자열 연결 연산자 표현식을 평가하기 위해, 피연산자 중 문자열 타입이 아닌 것을 문자열 타입으로 암묵적 타입 변환

    ```jsx
    // 숫자 -> 문자열
    0 + '' // '0'
    -0 + '' // '0'
    -1 + '' // '-1'
    NaN + '' // 'NaN'
    -Infinity + '' // '-Infinity'

    // 불리언 -> 문자열
    false + '' // 'false'

    // null / undefined -> 문자열
    null + '' // 'null'
    undefined + '' // 'undefined'

    // 심벌 타입은 안 됨
    (Symbol()) + '' // TypeError

    // 객체
    ({}) + '' // '[object Object]'
    Math + '' // '[object Math]'
    [] + '' // ""
    [10, 20] + '' // '10,20' -> 띄어쓰기 없음
    (function(){}) + '' // 'function(){}'
    Array + '' // 'function Array() { [native code] }'
    ```

- 숫자 타입으로 변환
  - ‘-’, ‘\*’, ‘/’ 산술 연산자를 통해 숫자 타입을 만드는 경우
    ```jsx
    1 - "1"; // 0
    1 * "10"; // 10
    1 / "one"; // NaN, one이 1인 거를 컴퓨터는 몰라용, 변환 불가능
    ```
  - 비교 연산자가 숫자 타입을 만드는 경우
    ```jsx
    "1" > 0; // true
    ```
  - ‘+’ 단항 연산자(양수로 바꿔주는 것)가 숫자 타입을 만드는 경우
    ```jsx
    +"" + // 0
      "0" + // 0
      "1" + // 1
      "string" + // NaN
      true + // 1
      false + // 0
      null + // 0
      undefined + // NaN
      Symbol() + // TypeError
      {} + // NaN
      [] + // 0, 자바스크립트 진짜 모르겠다ㅋㅋㅋㅋ
      [10, 20] + // NaN
      function () {}; // NaN
    ```
- 불리언 타입으로 변환

  - 제어문(if 문, for 문)과 삼항 조건 연산자의 조건식에 의한 경우

    ```jsx
    if ("") console.log("1"); // 비어있는 문자열은 false
    if (true) console.log("2");
    if (0) console.log("3");
    if ("str") console.log("4"); // 뭔가 적힌 문자열은 true
    if (null) console.log("5");

    // 2랑 4가 출력됨
    // undefined, null, 0, -0, NaN, 비어있는 문자열 -> false
    ```

  - Truthy / Falsy 판별 함수

    ```jsx
    // 무조건 반대 불리언으로 만들어줌, t->f, f->t
    function isFalsy(v) {
      return !v;
    }

    // 값이 가지고 있는 불리언을 그대로 반환, t->t, f->f
    function isTruthy(v) {
      return !!v; // 반대의 반대
    }
    ```

<br>

## 9.3 명시적 타입 변환

- 개발자 의도에 따라 타입을 변경하는 방법은 다양함
  - 표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이 호출
  - 표준 빌트인 메서드(toString, parseInt, Object.keys…) 사용
  - 암묵적 타입 변환을 이용
- 문자열 타입으로 변환
  - 방법 1) String 생성자 함수를 new 연산자 없이 호출
    ```jsx
    String(1); // '1'
    String(NaN); // 'NaN'
    String(Infinity); // 'Infinity'
    String(true); // 'true'
    ```
  - 방법 2) Object.prototype.toString 메서드를 사용
    ```jsx
    (1).toString(); // '1'
    Infinity.toString(); // 'Infinity'
    ```
  - 방법 3) 문자열 연결 연산자를 이용
    ```jsx
    1 + ""; // '1'
    NaN + ""; // 'NaN'
    ```
- 숫자 타입으로 변환
  - 방법 1) Number 생성자 함수를 new 연산자 없이 호출
  - 방법 2) parseInt, parseFloat 함수 사용 (문자열만 숫자로 변환 가능)
  - 방법 3) + 단항 산술 연산자 이용
    ```jsx
    +"0"; // 0
    +true; // 1
    ```
  - 방법 4) \* 산술 연산자 이용
    ```jsx
    "2" * 3; // 6
    true * 1; // 1
    false * 1; // 0
    ```
- 불리언 타입으로 변환

  - 방법 1) Boolean 생성자 함수를 new 연산자 없이 호출

    ```jsx
    Boolean("false"); // true, 비어 있지 않은 문자열
    Boolean(""); // false, 비어 있는 문자열

    Boolean(Infinity); // true

    Boolean(0); // false
    Boolean(NaN); // false
    Boolean(null); // false
    Boolean(undefined); // false

    Boolean({}); // true
    Boolean([]); // true
    ```

  - 방법 2) ! 부정 논리 연산자를 두 번 사용
    ```jsx
    !!"false"; // true, 비어 있지 않은 문자열
    !!""; // false, 비어 있는 문자열
    ```

<br>

## 9.4 단축 평가

- 논리 연산자 사용한 단축 평가

  - 논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있음
    - 2개의 피연산자 중 어느 한쪽으로 평가됨
  - 논리합(||) 연산자는 두 개의 피연산자 중 하나만 true로 평가되어도 true를 반환
  - 논리곱(&&) 연산자는 두 개의 피연산자가 모두 true로 평가될 때 true를 반환
  - 논리합, 논리곱 연산자 모두 좌항에서 우항으로 평가가 진행됨

    ```jsx
    // 논리곱(&&) 연산자
    "Cat" && "Dog"; // 'Dog'
    // 1) 'Cat'은 빈 문자열이 아니므로 true, 근데 여기까지만 하고 표현식 평가 못 함
    // 2) 'Dog' 또한 true, 논리곱 연산자는 논리 연산 결과를 결정하는 두 번째 피연산자를 그대로 반환

    // 논리합(||) 연산자
    "Cat" || "Dog"; // 'Cat'
    // 두 번째 피연산자인 Dog까지 평가해보지 않아도 되기 때문에 Cat을 그대로 반환
    ```

  - 단축 평가

    - 논리 연산의 결과를 결정하는 피연산자를 타입 변환하지 않고 그대로 반환하는 것
    - 표현식 평가 도중, 평가 결과가 확정되면, 평가 과정을 생략하는 것
    - 단축 평가 규칙
      <br><img src="./yjs_images/9-1.png" alt="09" width="500px">

      ```jsx
      // 논리합 (||)
      "qwer" || "asdf"; // 'qwer'
      false || "asdf"; // 'asdf'
      "qwer" || false; // 'qwer'

      // 논리곱 (&&)
      "qwer" && "asdf"; // 'asdf'
      false && "asdf"; // false
      "qwer" && false; // false
      ```

    - 단축 평가의 유용함 1 - if 문 대체 가능

      - 어떤 조건이 Truthy 값일 때 무언가를 하고 싶으면 &&

        ```jsx
        var done = true;
        var msg = "";

        msg = done && "완료";
        console.log(msg); // 완료
        ```

      - 어떤 조건이 Falsy 값일 때 무언가를 하고 싶으면 ||

        ```jsx
        var done = false;
        var msg = "";

        msg = done || "미완료";
        console.log(msg); // 미완료
        ```

    - 단축 평가의 유용함 2 - 객체 참조에서 에러 방지

      - 객체는 키와 값으로 구성된 프로퍼티의 집합
      - 객체를 가리키기를 기대하는 변수 값이 null 또는 undefined인 경우, 프로퍼티 참조 시 타입 에러 발생
      - 단축 평가를 이용하면 에러 방지 가능

        ```jsx
        var elem = null;

        var value = elem.value; // TypeError
        var value = elem && elem.value; // null
        ```

    - 단축 평가의 유용함 3 - 함수 매개변수의 기본값을 설정해서 에러 방지

      - 함수 호출 시 인수를 전달하지 않으면, 매개변수에는 undefined가 할당됨
      - undefined로 발생할 수 있는 에러 방지 가능

        ```jsx
        // 단축 평가 이용하는 방법
        function getStringLength(str) {
          str = str || ""; // str이 undefined일 때 false 이므로, str에 빈 문자열 들어감
          return str.length;
        }

        getStringLength(); // 0, 아무것도 안 넣었을 때 undefined로 발생할 오류를 막았음
        getStringLength("hi"); // 2

        // ES6에서 매개변수 기본값 설정할 수 있게 되었음
        function getStringLength(str = "") {
          return str.length;
        }
        ```

- 옵셔널 체이닝 연산자

  - ES11에서 도입된 옵셔널 체이닝 연산자 “?.”
    - 객체를 가리키기를 기대하는 변수가 null 또는 undefined인지 확인할 때 유용
    - ?. 도입되기 전까지는 위의 예시처럼 단축 평가(&&)를 통해 확인했었음
  - 좌항 피연산자가 null 또는 undefined일 경우 undefined 반환 (그렇지 않으면 우항 프로퍼티 참조 이어감)
    ```jsx
    var elem = null;
    var value = elem?.value;
    console.log(value); // undefined
    ```
  - 단축 평가(&&)에서 좌항 피연산자가 false면 그 연산자를 그대로 반환했었는데, 옵셔널 체이닝 연산자를 이용하면 우항 프로퍼티 참조를 이어갈 수 있음

    ```jsx
    // 일단 단축 평가 먼저 보기
    var str = ""; // 빈 문자열이므로 false
    var length = str && str.length; // str이 false니까 '' 그대로 반환
    console.log(length); // ''

    // 옵셔널 체이닝 연산자 사용
    var str = ""; // 빈 문자열이므로 false
    var length = str?.length; // str이 false여도 우항 프로퍼티 계속 참조
    console.log(length); // 빈 문자열의 길이인 0 반환
    ```

- null 병합 연산자

  - ES11에서 도입된 null 병합 연산자 “??”
    - 변수에 기본값을 설정할 때 유용
    - ?? 도입되기 전까지는 위의 예시처럼 단축 평가(||)를 통해 기본값 설정했었음
  - 좌항 피연산자가 null 또는 undefined일 경우 우항 피연산자 반환 (그렇지 않으면 좌항 피연산자 반환)
    ```jsx
    var foo = null ?? "default string";
    console.log(foo); // 'default string'
    ```
  - 단축 평가(||)에서 좌항 피연산자가 false면 우항 피연산자를 반환했었는데, null 병합 연산자를 이용하면, 좌항이 null이나 undefined가 아닌 이상, 좌항 피연산자를 그대로 반환

    ```jsx
    // 일단 단축 평가 먼저 보기
    var foo = "" || "default string";
    console.log(foo); // 'default string'

    // null 병합 연산자 사용
    var foo = "" ?? "default string";
    console.log(foo); // ''
    ```
