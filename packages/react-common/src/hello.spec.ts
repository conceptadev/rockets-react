import { hello } from './hello';

describe('hello', () => {
  it('should say hello to the world', () => {
    expect(hello()).toEqual('Hello World!');
  });
});
