import { Injectable } from '@nestjs/common';
import * as randomstring from 'randomstring';

@Injectable()
export class StringGeneratorService {
  private attempts = 3;
  private exists: (code: string) => Promise<boolean> = null;

  setAttempts(value: number) {
    this.attempts = value;
    return this;
  }

  setExists(exists: (code: string) => Promise<boolean>) {
    this.exists = exists;
    return this;
  }

  async generate(
    options?: number | randomstring.GenerateOptions,
  ): Promise<string | undefined> {
    let count = 0;
    let code: string | undefined;

    do {
      code = randomstring.generate(options);

      if (await this.exists(code)) {
        code = undefined;
      }
    } while (count++ < this.attempts && code === undefined);

    return code;
  }
}
