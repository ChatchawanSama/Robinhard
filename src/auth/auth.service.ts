import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userId: number): Promise<string> {
    const payload = { sub: userId };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }
}
