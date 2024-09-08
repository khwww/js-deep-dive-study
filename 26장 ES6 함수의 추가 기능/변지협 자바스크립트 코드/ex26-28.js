class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
    add(arr) {
        return arr.map(function(item) {
            return this.prefix + item; // return this.prefix + item; TypeError: Cannot read properties of undefined (reading 'prefix')
        });
    }
}

const prefixer = new Prefixer('-webkit-');
console.log(prefixer.add(['transition', 'user-select']));