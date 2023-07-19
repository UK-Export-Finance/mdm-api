import { ConsoleLogger } from '@nestjs/common';

export class ConsoleLoggerWithRedact extends ConsoleLogger {
  private stringPatternsToRedact: [{ searchValue: string | RegExp; replaceValue; string }];

  constructor(stringPatternsToRedact) {
    super();
    this.stringPatternsToRedact = stringPatternsToRedact;
  }

  error(message: any, stack?: string, context?: string) {
    let cleanMessage = message;
    let cleanStack = stack;
    if (typeof message == 'string') {
      this.stringPatternsToRedact.forEach((redact) => {
        cleanMessage = cleanMessage.replace(redact.searchValue, redact.replaceValue);
      });
    }
    if (typeof stack == 'string') {
      this.stringPatternsToRedact.forEach((redact) => {
        cleanStack = cleanStack.replace(redact.searchValue, redact.replaceValue);
      });
    }
    super.error(cleanMessage, cleanStack, context);
  }
}
