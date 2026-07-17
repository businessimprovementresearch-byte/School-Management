import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateAwardDto, IssueAwardDto } from './dto/award.dto';

@Injectable()
export class AwardsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async findAll() {
    const awards = await this.prisma.award.findMany({
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { issuances: true } } },
    });
    return awards.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      icon: a.icon,
      issuedCount: a._count.issuances,
    }));
  }

  async create(dto: CreateAwardDto) {
    const a = await this.prisma.award.create({
      data: { name: dto.name, description: dto.description ?? null, icon: dto.icon ?? null },
      include: { _count: { select: { issuances: true } } },
    });
    return { id: a.id, name: a.name, description: a.description, icon: a.icon, issuedCount: a._count.issuances };
  }

  async remove(id: string) {
    await this.prisma.award.delete({ where: { id } });
    return { success: true };
  }

  async issue(dto: IssueAwardDto) {
    await this.prisma.awardIssuance.create({
      data: {
        awardId: dto.awardId,
        studentId: dto.studentId ?? null,
        teacherId: dto.teacherId ?? null,
        note: dto.note ?? null,
      },
    });
    return { success: true };
  }

  async removeIssuance(id: string) {
    await this.prisma.awardIssuance.delete({ where: { id } });
    return { success: true };
  }

  async findIssuances(studentId?: string, teacherId?: string) {
    const issuances = await this.prisma.awardIssuance.findMany({
      where: {
        ...(studentId ? { studentId } : {}),
        ...(teacherId ? { teacherId } : {}),
      },
      include: { award: true, student: true, teacher: true },
      orderBy: { issuedAt: 'desc' },
    });
    return Promise.all(
      issuances.map(async (i) => {
        const isStudent = !!i.studentId;
        const photoFileId = isStudent ? i.student?.photoFileId ?? null : i.teacher?.photoFileId ?? null;
        return {
          id: i.id,
          awardId: i.awardId,
          awardName: i.award.name,
          awardIcon: i.award.icon,
          note: i.note,
          issuedAt: i.issuedAt.toISOString(),
          recipientName: isStudent ? i.student?.name ?? 'Unknown' : i.teacher?.name ?? 'Unknown',
          recipientKind: isStudent ? 'STUDENT' : 'TEACHER',
          studentId: i.studentId,
          teacherId: i.teacherId,
          photoUrl: await this.uploadService.getFileUrlByFileId(photoFileId),
        };
      }),
    );
  }
}
