import {expect} from 'chai';
import {sayHello} from '../main/app';

describe("test suite", () => {
    it("test case", () => {
        expect(sayHello()).to.equal('Hello World!!');
    });
});
