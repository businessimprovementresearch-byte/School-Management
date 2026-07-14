import { AttendanceService } from './attendance.service';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto';
import { BulkAttendanceResponseDto } from './dto/bulk-attendance-response.dto';
import { AttendanceOverviewResponseDto } from './dto/attendance-overview-response.dto';
export declare class AttendanceController {
    private attendanceService;
    constructor(attendanceService: AttendanceService);
    bulkSave(dto: BulkAttendanceDto): Promise<BulkAttendanceResponseDto>;
    getOverview(classId: string, month: number, year: number): Promise<AttendanceOverviewResponseDto>;
}
