export declare const GRADE_ORDER: string[];
export declare function gradeRank(grade: string): number;
export declare function sortByGrade<T extends {
    grade: string;
    name: string;
}>(items: T[]): T[];
