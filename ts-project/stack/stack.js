"use strict";
var StackImpl = /** @class */ (function () {
    function StackImpl() {
        this._size = 0;
    }
    Object.defineProperty(StackImpl.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    StackImpl.prototype.push = function (value) {
        var node = { value: value, next: this.head };
        this.head = node;
        this._size++;
    };
    StackImpl.prototype.pop = function () {
        if (this.head == null) {
            throw new Error('stack is empty!');
        }
        var node = this.head;
        this.head = node.next;
        this._size--;
        return node.value;
    };
    return StackImpl;
}());
var stack = new StackImpl();
stack.push('aaa');
stack.push('bbb');
stack.push('ccc');
while (stack.size !== 0) {
    console.log(stack.pop());
}
