export declare class ClassTeacherDto {
    id: string;
    name: string;
    photoFileId: string | null;
    photoUrl: string | null;
}
export declare class ClassListItemDto {
    id: string;
    name: string;
    grade: string;
    description: string | null;
    studentCount: number;
    teachers: ClassTeacherDto[];
    nextSessionDate: string | null;
}
