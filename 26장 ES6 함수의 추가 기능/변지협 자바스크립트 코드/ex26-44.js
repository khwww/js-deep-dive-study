class Person {
    name = 'Lee';
    sayHi() {
        console.log(`Hi ${this.name}`);
    }
}

const person = new Person();
person.sayHi(); // Hi Lee

class PersonArrow {
    name = 'Leee';
    sayHi = () => {
        console.log(`Hi ${this.name}`);
    }
}

const personArrow = new PersonArrow();
personArrow.sayHi(); // Hi Lee