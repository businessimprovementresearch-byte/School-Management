import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { ProgressResponseDto } from './dto/progress-response.dto';
import { ProgressListResponseDto } from './dto/progress-list-response.dto';
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    create(dto: CreateProgressDto): Promise<ProgressResponseDto>;
    findByStudent(studentId: string, classId?: string): Promise<ProgressListResponseDto>;
}
