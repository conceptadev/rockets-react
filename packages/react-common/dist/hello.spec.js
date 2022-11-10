"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello_1 = require("./hello");
describe('hello', () => {
    it('should say hello to the world', () => {
        expect((0, hello_1.hello)()).toEqual('Hello World!');
    });
});
//# sourceMappingURL=hello.spec.js.map