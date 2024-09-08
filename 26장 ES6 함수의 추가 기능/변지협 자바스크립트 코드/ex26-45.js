class Person {
    name= 'leee';
    sayHi() {
        console.log(`Hi ${this.name}`);
    }
}

const person = new Person();
person.sayHi(); // Hi Lee