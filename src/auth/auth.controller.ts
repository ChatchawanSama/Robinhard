import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() credentials: any) {
    // Validate credentials, perform authentication logic
    const userId = 1; // Assuming you retrieve the user ID
    const token = await this.authService.createToken(userId);
    return { access_token: token };
  }
}
