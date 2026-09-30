// nodejs_space/prisma/fix-academic-year.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixAcademicYear() {
  console.log('🔄 Memulai perbaikan Academic Year...');

  // 1. Nonaktifkan status aktif pada semua tahun ajaran
  await prisma.academicYear.updateMany({
    data: { isActive: false },
  });

  // 2. Cari tahun ajaran yang ada
  let activeYear = await prisma.academicYear.findFirst({
    orderBy: { startDate: 'desc' },
  });

  // 3. Jika belum ada tahun ajaran sama sekali, buatkan satu yang aktif
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
  } else {
    // Aktifkan tahun ajaran terbaru
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