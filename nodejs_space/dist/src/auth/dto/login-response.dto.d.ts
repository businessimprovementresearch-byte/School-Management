export declare class UserInfoDto {
    id: string;
    email: string;
    name: string;
    role: string;
    teacherId: string | null;
}
export declare class LoginResponseDto {
    token: string;
    user: UserInfoDto;
}
