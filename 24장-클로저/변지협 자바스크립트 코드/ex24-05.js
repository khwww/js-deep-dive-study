const x = 1;

function outer() {
    const x = 10;
    const inner = function() { console.log(x); }
    return inner;
}

// outer 함수는 inner 함수를 반환한다.
// 그리고 outer 함수의 실행 컨텍스트는 실행 컨텍스트 스택에서 팝되어 제거된다.
const innerFunc = outer();
innerFunc();