## 8.1 블록문

- 0개 이상의 문을 중괄호로 묶은 것 (코드 블록 또는 블록)
- JS는 블록문을 하나의 실행 단위로 취급
- 블록문은 단독으로 사용 가능, 근데 일반적으로는 제어문이나 함수 정의 시 사용
- 블록문은 자체 종결성을 갖기 때문에 세미콜론 안 붙임

  ```jsx
  {
    var foo = 10;
  }

  function sum(a, b) {
    return a + b;
  }
  ```

<br>

## 8.2 조건문

- 주어진 조건식의 평가 결과에 따라 블록문의 실행을 결정하는 문, 불리언 값으로 평가될 수 있는 조건식
- if … else 문

  - 조건식의 평가 결과(참 or 거짓)에 따라 실행할 코드 블록을 결정
  - if 문의 조건식은 불리언 값으로 평가되어야 함

    - 조건식이 불리언 값이 아니면 JS 엔진 의해 암묵적으로 불리언 값으로 강제 변환됨

      ```jsx
      var x = 2;
      var result;

      if (x % 2) {
        // 0 -> false, 암묵적 타입 변환
        result = "홀수";
      } else {
        result = "짝수"; // 이 블록문이 실행됨
      }

      console.log(result); // '짝수'
      ```

  - 코드 블록 내의 문이 하나뿐이라면 중괄호 생략 가능
  - 대부분의 if … else 문은 삼항 조건 연산자로 변환 가능

    ```jsx
    // 짝수 또는 홀수 판별
    var x = 2;
    var result = x % 2 ? "홀수" : "짝수";

    // 양수, 음수, 0 판별
    var num = 2;
    var kind = num ? (num > 0 ? "양수" : "음수") : "0";
    // 순서
    // 처음에 num ? A : B; 가장 바깥쪽 삼항 연산자부터 판단
    // num이 2라면 true, A인 (num > 0 ? '양수' : '음수') 판단해서 값 도출
    // num이 -2라면 true(JS에서 양수/음수, 비어있지 않은 문자열, 객체, 배열은 모두 true), 위랑 같은 과정
    // num이 0이면 false, B인 '0'으로 값 판단
    ```

  - 삼항 조건 연산자는 값으로 평가되는 표현식을 만듦 → 값처럼 사용할 수 있기 때문에 변수에 할당 가능
    - 단순히 값을 결정해서 할당할 때는 삼항 조건 연산자가 가독성이 더 좋음
    - 실행 내용이 복잡해지면 if … else 문이 가독성이 더 좋음

- switch 문

  - 주어진 조건식을 평가해, 그 값과 일치하는 표현식 갖는 case 문으로, 실행 흐름을 옮기는 문
  - case 문은 상황을 의미하는 표현식을 지정
  - switch 문의 표현식과 일치하는 case가 없다면, default 문으로 이동, default는 사용할 수도 안 할 수도 (선택 사항)
    ```jsx
    switch (표현식) {
      case 표현식1:
        // 표현식 === 표현식1이면 실행될 문
        break;
      case 표현식2:
        // 표현식 === 표현식2면 실행될 문
        break;
      default:
      // 케이스 표현식123... 중에 스위치 표현식과 일치하는 문 없을 때 실행될 문
    }
    ```
  - if … else 문의 조건식: 불리언 값 (참/거짓) vs switch 문의 표현식: 문자열 or 숫자 (상황)
  - 폴스루(fall through)

    - 문 실행 후 switch 문을 탈출하지 않고, switch 문 끝날 때까지, 이후의 모든 case 문과 default 문을 실행하는 것
    - switch 문에서는 break를 잊으면 안 됨, default 문은 break 생략이 일반적 (어차피 default까지 왔으면 뒤에 더 실행할 문이 없으니 알아서 종료되니까)

      ```jsx
      // 월을 영어로 변환
      var month = 11;
      var monthName;

      switch (month) {
        // case 1~10 생략
        case 11:
          monthName = "Nov";
        case 12:
          monthName = "Dec";
        default:
          monthName = "Invalid month";
      }

      console.log(monthName); // Invalid month
      // break가 없어서 monthName에 'Nov' 할당됐다가, 'Dec' 재할당됐다가, 'Invalid month' 재할당 됨
      ```

      ```jsx
      // break 생략한 폴스루 switch 문 (이게 유용할 때도 있음)
      var year = 2000; // 2000년은 윤년임
      var month = 2; // 2월이 29일까지 있음
      var days = 0;

      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          days = 31; // 31일까지 있음
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          days = 30; // 30일까지 있음
          break;
        case 2: // 2월일 때 윤년 알고리즘 작성
          (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28;
          break;
        default:
          console.log("Invalid month");
      }

      console.log(days); // 29
      ```

  - 웬만하면 if … else 문을 쓰자…

<br>

## 8.3 반복문

- 조건식의 평가 결과가 참인 경우 코드 블록을 실행하는 문, 조건식이 거짓일 때까지 반복
- for 문

  ```jsx
  for (let i=0; i<2; i++) { // 선언 또는 할당문, 조건식, 증감식
  	console.log(i);
  }

  for (;;) { ... } // 무한루프
  ```

- while 문

  - 반복 횟수가 불명확할 때 주로 사용

    ```jsx
    var cnt = 0;

    while (cnt < 3) {
    	console.log(cnt);
    	cnt++;
    }

    while (true) { ... } // 무한루프
    ```

- do … while 문

  - 코드 블록을 먼저 실행하고 조건식을 평가 → 코드 블록은 무조건 1번 이상은 실행됨

    ```jsx
    var cnt = 0;

    do {
      console.log(cnt); // 0 1 2
      cnt++;
    } while (cnt < 3);
    ```

<br>

## 8.4 break 문

- 레이블(label) 문, 반복문, switch 문의 코드 블록을 탈출시킴
  - 레이블 문
    - 특정 코드 블록에 이름(식별자)을 붙여 제어하기 위해 사용
    - 주로 중첩 반복문에서 특정 반복문을 빠져나올 때 유용
      ```jsx
      // label 문
      outerLoop: for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (i === 1 && j === 1) {
            break outerLoop; // outerLoop 레이블이 붙은 반복문을 빠져나옴
          }
          console.log(`i = ${i}, j = ${j}`);
          // i = 0, j = 0
          // i = 0, j = 1
          // i = 0, j = 2
          // i = 1, j = 0 -> 출력 끝
          // i === 1, j === 1일 때, outerLoop라는 이름이 붙은 가장 바깥쪽 반복문을 탈출
        }
      }
      ```
    - 반복문 외부로 바로 탈출할 때 유용하지만, 가독성 나빠지고 오류 발생 가능성 높아져서, 권장하지 않는 문…

<br>

## 8.5 continue 문

- 반복문의 코드 블록 실행을 현 시점에서 중단, 반복문 증감식으로 실행 흐름을 이동시킴
