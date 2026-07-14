export declare class EnrolledClassDto {
    id: string;
    name: string;
    grade: string;
}
export declare class StudentListItemDto {
    id: string;
    name: string;
    parentName: string;
    dob: string;
    age: number;
    contactNumber: string;
    photoFileId: string | null;
    photoUrl: string | null;
    enrolledClasses: EnrolledClassDto[];
}
export declare class StudentListResponseDto {
    items: StudentListItemDto[];
    total: number;
    page: number;
    totalPages: number;
}
