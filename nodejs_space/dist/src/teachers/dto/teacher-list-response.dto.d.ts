export declare class TeacherClassDto {
    id: string;
    name: string;
    grade: string;
}
export declare class TeacherListItemDto {
    id: string;
    userId: string;
    name: string;
    dob: string;
    age: number;
    contactNumber: string;
    photoFileId: string | null;
    photoUrl: string | null;
    assignedClasses: TeacherClassDto[];
}
