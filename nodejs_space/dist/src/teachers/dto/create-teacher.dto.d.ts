export declare class CreateTeacherDto {
    name: string;
    nickname?: string;
    email?: string;
    password?: string;
    dob?: string;
    contactNumber?: string;
    remarks?: string;
    photoFileId?: string | null;
    isActive?: boolean;
    classIds?: string[];
}
