import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { teacher: true },
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        teacherId: user.teacher?.id ?? null,
      },
    };
  }

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { teacher: true },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        teacherId: user.teacher?.id ?? null,
      },
    };
  }

  async signup(email: string, password: string, name: string, currentUserRole: UserRole) {
    if (currentUserRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Only admins can create accounts');
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, password: hashed, name, role: UserRole.TEACHER },
    });
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  }
}
