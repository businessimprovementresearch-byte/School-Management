import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { TeachersModule } from './teachers/teachers.module';
import { SessionsModule } from './sessions/sessions.module';
import { AttendanceModule } from './attendance/attendance.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ProgressModule } from './progress/progress.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AcademicYearsModule } from './academic-years/academic-years.module';
import { TermsModule } from './terms/terms.module';
import { MetricsModule } from './metrics/metrics.module';
import { ReportCardsModule } from './report-cards/report-cards.module';
import { EventsModule } from './events/events.module';
import { AwardsModule } from './awards/awards.module';
import { GalleryModule } from './gallery/gallery.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UploadModule,
    StudentsModule,
    ClassesModule,
    TeachersModule,
    SessionsModule,
    AttendanceModule,
    FeedbackModule,
    ProgressModule,
    DashboardModule,
    AcademicYearsModule,
    TermsModule,
    MetricsModule,
    ReportCardsModule,
    EventsModule,
    AwardsModule,
    GalleryModule,
    NotificationsModule,
  ],
})
export class AppModule {}
