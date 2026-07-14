export declare class CreateAwardDto {
    name: string;
    description?: string;
    icon?: string;
}
export declare class IssueAwardDto {
    awardId: string;
    studentId?: string;
    teacherId?: string;
    note?: string;
}
export declare class AwardListItemDto {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    issuedCount: number;
}
export declare class AwardIssuanceDto {
    id: string;
    awardId: string;
    awardName: string;
    awardIcon: string | null;
    note: string | null;
    issuedAt: string;
    recipientName: string;
    recipientKind: string;
    studentId: string | null;
    teacherId: string | null;
    photoUrl: string | null;
}
