import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { MeResponseDto } from './dto/me-response.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import type { Request } from 'express';

@ApiTags('Auth')
@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('auth/login')
  async login(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(dto.email, dto.password);
  }

  @Get('auth/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request): Promise<MeResponseDto> {
    const user = req.user as { userId: string };
    return this.authService.getMe(user.userId);
  }

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  async signup(@Req() req: Request, @Body() dto: SignupDto): Promise<SignupResponseDto> {
    const currentUser = req.user as { userId: string; role: string };
    return this.authService.signup(dto.email, dto.password, dto.name, currentUser.role as any);
  }
}
