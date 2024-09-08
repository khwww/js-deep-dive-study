var value = 1;

const obj = {
    value: 100,
    foo() {
        console.log('foos this:', this);
        console.log('foos this.value:', this.value);
        
        function bar() {
            console.log('bars this:', this);
            console.log('bars this.value:', this.value);
        };
        bar();
    }
}
obj.foo();