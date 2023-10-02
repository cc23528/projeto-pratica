class operacoes {
    constructor(a, b, c) {
        this.a = a;
        this.b = b;
        this.c = c;
    }

    media() {
        return (this.a + this.b + this.c) / 3;
    }
}

module.exports = operacoes;