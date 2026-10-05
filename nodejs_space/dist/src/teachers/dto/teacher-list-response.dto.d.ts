export declare class TeacherClassDto {
    id: string;
    name: string;
    grade: string;
}
export declare class TeacherListItemDto {
    id: string;
    userId: string;
    name: string | null;
    nickname: string | null;
    gelar: string | null;
    alamat: string | null;
    isActive: boolean;
    email: string;
    dob: string | null;
    age: number | null;
    contactNumber: string | null;
    remarks: string | null;
    photoFileId: string | null;
    photoUrl: string | null;
    assignedClasses: TeacherClassDto[];
}
