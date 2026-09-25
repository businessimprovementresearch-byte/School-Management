export declare class ProgressScoreEntry {
    studentId: string;
    value: number;
    notes?: string | null;
}
export declare class BulkProgressDto {
    classSessionId: string;
    progressMetricId: string;
    entries: ProgressScoreEntry[];
}
