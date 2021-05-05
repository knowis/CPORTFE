
export class HelloWorld {

  /**
   * function getWelcomeString which returns a welcome message as a string
   */
  public getWelcomeString(): string {

      const helloString: string = `Welcome to your custom solution!`;

      return helloString;
    }
  }

/** HelloWorld singleton */
export const helloWorld = new HelloWorld();
