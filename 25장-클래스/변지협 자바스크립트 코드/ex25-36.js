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
me.fullName = 'Heegun Lee';
console.log(me); // Person { firstName: 'Heegun', lastName: 'Lee' }

console.log(me.fullName); // Heegun Lee

console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
/**
 * {
 * get: [Function: get fullName],
 * set: [Function: set fullName],
 * enumerable: false,
 * configurable: true
 * }
 */
