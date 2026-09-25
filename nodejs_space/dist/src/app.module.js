"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const upload_module_1 = require("./upload/upload.module");
const students_module_1 = require("./students/students.module");
const classes_module_1 = require("./classes/classes.module");
const teachers_module_1 = require("./teachers/teachers.module");
const sessions_module_1 = require("./sessions/sessions.module");
const attendance_module_1 = require("./attendance/attendance.module");
const feedback_module_1 = require("./feedback/feedback.module");
const progress_module_1 = require("./progress/progress.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const academic_years_module_1 = require("./academic-years/academic-years.module");
const terms_module_1 = require("./terms/terms.module");
const metrics_module_1 = require("./metrics/metrics.module");
const report_cards_module_1 = require("./report-cards/report-cards.module");
const events_module_1 = require("./events/events.module");
const awards_module_1 = require("./awards/awards.module");
const gallery_module_1 = require("./gallery/gallery.module");
const notifications_module_1 = require("./notifications/notifications.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            upload_module_1.UploadModule,
            students_module_1.StudentsModule,
            classes_module_1.ClassesModule,
            teachers_module_1.TeachersModule,
            sessions_module_1.SessionsModule,
            attendance_module_1.AttendanceModule,
            feedback_module_1.FeedbackModule,
            progress_module_1.ProgressModule,
            dashboard_module_1.DashboardModule,
            academic_years_module_1.AcademicYearsModule,
            terms_module_1.TermsModule,
            metrics_module_1.MetricsModule,
            report_cards_module_1.ReportCardsModule,
            events_module_1.EventsModule,
            awards_module_1.AwardsModule,
            gallery_module_1.GalleryModule,
            notifications_module_1.NotificationsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map