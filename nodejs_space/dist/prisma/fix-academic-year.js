"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function fixAcademicYear() {
    console.log('🔄 Memulai perbaikan Academic Year...');
    await prisma.academicYear.updateMany({
        data: { isActive: false },
    });
    let activeYear = await prisma.academicYear.findFirst({
        orderBy: { startDate: 'desc' },
    });
    if (!activeYear) {
        activeYear = await prisma.academicYear.create({
            data: {
                name: '2026/2027',
                startDate: new Date('2026-07-01'),
                endDate: new Date('2027-06-30'),
                isActive: true,
            },
        });
        console.log('✅ Dibuat tahun ajaran baru: 2026/2027');
    }
    else {
        await prisma.academicYear.update({
            where: { id: activeYear.id },
            data: { isActive: true },
        });
        console.log(`✅ Status aktif berhasil dikembalikan ke tahun ajaran: ${activeYear.name}`);
    }
    console.log('🎉 Selesai! Data Student, Teacher, dan User Anda TETAP UTUH.');
}
fixAcademicYear()
    .catch((e) => {
    console.error('❌ Gagal mereset academic year:', e);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fix-academic-year.js.map