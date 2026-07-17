import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreateEventDto, UpdateEventDto, AddParticipantDto } from './dto/event.dto';

@Injectable()
export class EventsService {
  constructor(
    private prisma: PrismaService,
    private uploadService: UploadService,
  ) {}

  async findAll() {
    const events = await this.prisma.event.findMany({
      orderBy: { date: 'desc' },
      include: { _count: { select: { participants: true, groups: true } } },
    });
    return events.map((e) => ({
      id: e.id,
      name: e.name,
      description: e.description,
      date: e.date.toISOString(),
      location: e.location,
      participantCount: e._count.participants,
      groupCount: e._count.groups,
    }));
  }

  async create(dto: CreateEventDto) {
    const e = await this.prisma.event.create({
      data: {
        name: dto.name,
        description: dto.description ?? null,
        date: new Date(dto.date),
        location: dto.location ?? null,
      },
      include: { _count: { select: { participants: true, groups: true } } },
    });
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      date: e.date.toISOString(),
      location: e.location,
      participantCount: e._count.participants,
      groupCount: e._count.groups,
    };
  }

  async update(id: string, dto: UpdateEventDto) {
    const e = await this.prisma.event.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.description !== undefined ? { description: dto.description } : {}),
        ...(dto.date !== undefined ? { date: new Date(dto.date) } : {}),
        ...(dto.location !== undefined ? { location: dto.location } : {}),
      },
      include: { _count: { select: { participants: true, groups: true } } },
    });
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      date: e.date.toISOString(),
      location: e.location,
      participantCount: e._count.participants,
      groupCount: e._count.groups,
    };
  }

  async remove(id: string) {
    await this.prisma.event.delete({ where: { id } });
    return { success: true };
  }

  async findOne(id: string) {
    const e = await this.prisma.event.findUnique({
      where: { id },
      include: {
        groups: { orderBy: { createdAt: 'asc' } },
        participants: {
          include: { student: true, teacher: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!e) throw new NotFoundException('Event not found');
    const participants = await Promise.all(
      e.participants.map(async (p) => {
        const isStudent = !!p.studentId;
        const photoFileId = isStudent ? p.student?.photoFileId ?? null : p.teacher?.photoFileId ?? null;
        return {
          id: p.id,
          studentId: p.studentId,
          teacherId: p.teacherId,
          groupId: p.groupId,
          name: isStudent ? p.student?.name ?? 'Unknown' : p.teacher?.name ?? 'Unknown',
          kind: isStudent ? 'STUDENT' : 'TEACHER',
          photoUrl: await this.uploadService.getFileUrlByFileId(photoFileId),
        };
      }),
    );
    return {
      id: e.id,
      name: e.name,
      description: e.description,
      date: e.date.toISOString(),
      location: e.location,
      groups: e.groups.map((g) => ({ id: g.id, name: g.name })),
      participants,
    };
  }

  async createGroup(eventId: string, name: string) {
    const g = await this.prisma.eventGroup.create({ data: { eventId, name } });
    return { id: g.id, name: g.name };
  }

  async removeGroup(groupId: string) {
    await this.prisma.eventGroup.delete({ where: { id: groupId } });
    return { success: true };
  }

  async addParticipant(eventId: string, dto: AddParticipantDto) {
    await this.prisma.eventParticipant.create({
      data: {
        eventId,
        studentId: dto.studentId ?? null,
        teacherId: dto.teacherId ?? null,
        groupId: dto.groupId ?? null,
      },
    });
    return { success: true };
  }

  async removeParticipant(participantId: string) {
    await this.prisma.eventParticipant.delete({ where: { id: participantId } });
    return { success: true };
  }
}
