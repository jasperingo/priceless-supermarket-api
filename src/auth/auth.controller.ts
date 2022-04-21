import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Administrator } from 'src/administrator/entities/administrator.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { AppResponseDTO } from 'src/utils/app-response.dto';
import { AdminLocalAuthGuard } from './admin-local-auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { User } from './user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('customer')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  customerSignIn(@User() user: Customer) {
    return AppResponseDTO.success(
      'strings.customer_athenticated',
      this.authService.signInCustomer(user),
    );
  }

  @Post('administrator')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminLocalAuthGuard)
  administratorSignIn(@User() user: Administrator) {
    return AppResponseDTO.success(
      'strings.administrator_athenticated',
      this.authService.signInAdministrator(user),
    );
  }
}
