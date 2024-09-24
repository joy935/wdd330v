let calculator = {
    // sum and mul are methods of the object calculator
    sum() {
        return this.a + this.b;
    },

    mul() {
        return this.a * this.b;
    },
    // read is a method of the object calculator
    read() {
        this.a = +prompt('a? ');
        this.b = +prompt('b? ');
    }
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());
