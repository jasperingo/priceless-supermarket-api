import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordHashService {
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  comparePassword(plain: string, hash: string) {
    return bcrypt.compare(plain, hash);
  }
}
