import { ProgressService } from './progress.service';
import { ProgressResponseDto } from './dto/progress-response.dto';
import { ProgressListResponseDto } from './dto/progress-list-response.dto';
import { SessionProgressEntryDto } from './dto/progress-list-response.dto';
import { CreateProgressDto } from './dto/create-progress.dto';
import { BulkProgressDto } from './dto/bulk-progress.dto';
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    create(dto: CreateProgressDto): Promise<ProgressResponseDto>;
    bulkSave(dto: BulkProgressDto): Promise<{
        savedCount: number;
    }>;
    findBySession(classSessionId: string, progressMetricId: string): Promise<SessionProgressEntryDto[]>;
    findByStudent(studentId: string, classId?: string): Promise<ProgressListResponseDto>;
}
