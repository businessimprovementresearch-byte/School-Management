import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { MeResponseDto } from './dto/me-response.dto';
import { SignupResponseDto } from './dto/signup-response.dto';
import type { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<LoginResponseDto>;
    getMe(req: Request): Promise<MeResponseDto>;
    signup(req: Request, dto: SignupDto): Promise<SignupResponseDto>;
}
