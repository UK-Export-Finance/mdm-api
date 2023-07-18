import { ConsoleLogger } from '@nestjs/common';

export class ConsoleLoggerWithRedact extends ConsoleLogger {
  private stringPatternsToRedact: [{ searchValue: string | RegExp; replaceValue; string }];

  constructor(stringPatternsToRedact) {
    super();
    this.stringPatternsToRedact = stringPatternsToRedact;
  }

  error(message: any, stack?: string, context?: string) {
    let cleanStack = stack;
    if (typeof stack == 'string') {
      this.stringPatternsToRedact.forEach((redact) => {
        cleanStack = stack.replace(redact.searchValue, redact.replaceValue);
      });
    }
    super.error(message, cleanStack, context);
  }
}
