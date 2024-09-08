class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(' ');
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

const me = new Person('Ungmo', 'Lee');

console.log(Object.getOwnPropertyNames(me)); // [ 'firstName', 'lastName' ]
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(me))); // [ 'constructor', 'fullName' ]