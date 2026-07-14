import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from '@prisma/client';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
            teacherId: string | null;
        };
    }>;
    getMe(userId: string): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            role: import("@prisma/client").$Enums.UserRole;
            teacherId: string | null;
        };
    }>;
    signup(email: string, password: string, name: string, currentUserRole: UserRole): Promise<{
        id: string;
        email: string;
        name: string;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
}
