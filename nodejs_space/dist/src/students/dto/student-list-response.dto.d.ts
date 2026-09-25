export declare class EnrolledClassDto {
    id: string;
    name: string;
    grade: string;
}
export declare class StudentListItemDto {
    id: string;
    name: string;
    nickname: string | null;
    parentName: string | null;
    dob: string | null;
    age: number | null;
    contactNumber: string | null;
    photoFileId: string | null;
    photoUrl: string | null;
    enrolledClasses: EnrolledClassDto[];
    studentIdNumber: string | null;
}
export declare class StudentListResponseDto {
    items: StudentListItemDto[];
    total: number;
    page: number;
    totalPages: number;
}
