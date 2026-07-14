import { ClassTeacherDto } from './class-list-response.dto';
export declare class ClassStudentDto {
    id: string;
    name: string;
    photoFileId: string | null;
    photoUrl: string | null;
    enrollmentStatus: string;
}
export declare class ClassSessionInfoDto {
    id: string;
    date: string;
    attendanceSubmitted: boolean;
    termName: string | null;
}
export declare class ClassMetricInfoDto {
    id: string;
    name: string;
    type: string;
    description: string | null;
}
export declare class ClassDetailResponseDto {
    id: string;
    name: string;
    grade: string;
    description: string | null;
    teachers: ClassTeacherDto[];
    students: ClassStudentDto[];
    sessions: ClassSessionInfoDto[];
    metrics: ClassMetricInfoDto[];
}
