"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAcademicYearId = requireAcademicYearId;
const common_1 = require("@nestjs/common");
async function requireAcademicYearId(prisma, explicitId) {
    if (explicitId)
        return explicitId;
    const active = await prisma.academicYear.findFirst({ where: { isActive: true } });
    if (active)
        return active.id;
    const latest = await prisma.academicYear.findFirst({ orderBy: { startDate: 'desc' } });
    if (latest)
        return latest.id;
    throw new common_1.BadRequestException('No academic year exists yet. Create one first under Academic Years.');
}
//# sourceMappingURL=active-academic-year.js.map