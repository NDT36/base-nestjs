import { Public } from '$decorators/public.decorator';
import { validate } from '$helpers/validate';
import { IToken } from '$types/interfaces';
import { Body, Controller, Post } from '@nestjs/common';
import { adminLoginSchema, adminRefreshTokenSchema, adminRegisterSchema } from './admin-auth.schema';
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { AdminRefreshTokenDto } from './dto/admin-refresh-token.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';

@Controller('admin-auth')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() body: AdminLoginDto): Promise<IToken> {
    validate(adminLoginSchema, body);
    return this.adminAuthService.login(body);
  }

  @Public()
  @Post('/register')
  async register(@Body() body: AdminRegisterDto) {
    validate(adminRegisterSchema, body);
    return await this.adminAuthService.register(body);
  }

  @Public()
  @Post('/refresh-token')
  async refreshToken(@Body() body: AdminRefreshTokenDto) {
    validate(adminRefreshTokenSchema, body);
    return await this.adminAuthService.refreshToken(body);
  }
}