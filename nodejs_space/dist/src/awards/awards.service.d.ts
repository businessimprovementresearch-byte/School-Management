import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateAwardDto, IssueAwardDto } from './dto/award.dto';
export declare class AwardsService {
    private prisma;
    private uploadService;
    constructor(prisma: PrismaService, uploadService: UploadService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        icon: string | null;
        issuedCount: number;
    }[]>;
    create(dto: CreateAwardDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        icon: string | null;
        issuedCount: number;
    }>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
    issue(dto: IssueAwardDto): Promise<{
        success: boolean;
    }>;
    removeIssuance(id: string): Promise<{
        success: boolean;
    }>;
    findIssuances(studentId?: string, teacherId?: string): Promise<{
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
    }[]>;
}
