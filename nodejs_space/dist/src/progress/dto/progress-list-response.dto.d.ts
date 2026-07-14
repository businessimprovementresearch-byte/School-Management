export declare class ProgressEntryItemDto {
    id: string;
    date: string;
    sessionId: string;
    value: number;
    notes: string | null;
}
export declare class ProgressMetricListDto {
    metricId: string;
    metricName: string;
    metricType: string;
    entries: ProgressEntryItemDto[];
}
export declare class ProgressListResponseDto {
    metrics: ProgressMetricListDto[];
}
