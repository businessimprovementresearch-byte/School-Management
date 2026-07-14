import { Controller, Post, Get, Body, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BulkAttendanceDto } from './dto/bulk-attendance.dto';
import { BulkAttendanceResponseDto } from './dto/bulk-attendance-response.dto';
import { AttendanceOverviewResponseDto } from './dto/attendance-overview-response.dto';

@ApiTags('Attendance')
@Controller('api/attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @Post('bulk')
  async bulkSave(@Body() dto: BulkAttendanceDto): Promise<BulkAttendanceResponseDto> {
    return this.attendanceService.bulkSave(dto.sessionId, dto.studentAttendance, dto.teacherAttendance);
  }

  @Get('overview')
  async getOverview(
    @Query('classId') classId: string,
    @Query('month', ParseIntPipe) month: number,
    @Query('year', ParseIntPipe) year: number,
  ): Promise<AttendanceOverviewResponseDto> {
    return this.attendanceService.getOverview(classId, month, year);
  }
}
