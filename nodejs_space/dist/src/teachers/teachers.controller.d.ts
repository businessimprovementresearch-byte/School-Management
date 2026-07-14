import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { TeacherListItemDto } from './dto/teacher-list-response.dto';
import { TeacherDetailResponseDto } from './dto/teacher-detail-response.dto';
import { SuccessResponseDto } from '../common/dto/success-response.dto';
export declare class TeachersController {
    private teachersService;
    constructor(teachersService: TeachersService);
    findAll(): Promise<TeacherListItemDto[]>;
    findOne(id: string): Promise<TeacherDetailResponseDto>;
    create(dto: CreateTeacherDto): Promise<TeacherDetailResponseDto>;
    update(id: string, dto: UpdateTeacherDto): Promise<TeacherDetailResponseDto>;
    remove(id: string): Promise<SuccessResponseDto>;
}
