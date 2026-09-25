export declare class ProgressEntryItemDto {
    id: string;
    date: string;
    sessionId: string;
    value: number;
    notes: string | null;
}
export declare class ProgressMetricInfoDto {
    metricId: string;
    metricName: string;
    metricType: string;
    classId: string;
    className: string;
    entries: ProgressEntryItemDto[];
}
export declare class SessionProgressEntryDto {
    studentId: string;
    value: number;
    notes: string | null;
}
export declare class ProgressListResponseDto {
    metrics: ProgressMetricInfoDto[];
}
