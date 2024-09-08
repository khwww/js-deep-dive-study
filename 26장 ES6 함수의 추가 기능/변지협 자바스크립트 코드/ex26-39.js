const person = {
    name: 'lee',
    sayHi: () => console.log(`hi ${this.name}`)
}

person.sayHi(); // hi undefined

const person2 = {
    name: 'lee',
    sayHi() { console.log(`hi ${this.name}`) }
}

person2.sayHi(); // hi lee