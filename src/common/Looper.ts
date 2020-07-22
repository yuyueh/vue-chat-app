export default class Looper<T> {
    private items: T[];

    private index = 0;

    constructor(items: T[]) {
        this.items = items;
    }

    next() {
        const result = this.items[this.index % this.items.length];
        this.index += 1;
        return result;
    }
}
