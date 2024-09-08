(function() {
    const foo = () => console.log(arguments); // 1,2를 출력한다 - 상위 스코프 arguments 참조
    foo(3, 4); // 3,4를 출력하지 않고
}(1,2));

const foo = () => console.log(arguments);
foo(1, 2); // 에러는 안나는데 막 이상한거 지가 참조함 - 즉, 1,2를 인수로 못받음