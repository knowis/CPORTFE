import { expect } from "chai";
import { helloWorld } from "../src/helloWorld";

describe('HelloWorld', () => {

  it('successfully returns welcome message', () => {
    // when
    const result = helloWorld.getWelcomeString();

    // then
    expect(result).equal(`Welcome to your custom solution!`);
  });

});
