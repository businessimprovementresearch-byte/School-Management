import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Seed admin users
  const hashedPassword1 = await bcrypt.hash('johndoe123', 10);
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword1,
      name: 'John Doe',
      role: UserRole.ADMIN,
    },
  });

  const hashedPassword2 = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@pasarbaru.org' },
    update: {},
    create: {
      email: 'admin@pasarbaru.org',
      password: hashedPassword2,
      name: 'Pasar Baru Admin',
      role: UserRole.ADMIN,
    },
  });

  // Seed 11 predefined classes
  const classes = [
    { name: 'Nikke Tarey', grade: 'Nursery', description: 'Nursery level class for young learners' },
    { name: 'Class 1', grade: '1', description: 'Grade 1 Gurmukhi class' },
    { name: 'Class 2A', grade: '2', description: 'Grade 2 Section A' },
    { name: 'Class 2B', grade: '2', description: 'Grade 2 Section B' },
    { name: 'Class 3', grade: '3', description: 'Grade 3 Gurmukhi class' },
    { name: 'Nitnem 1', grade: '4', description: 'Nitnem Level 1' },
    { name: 'Nitnem 2', grade: '5', description: 'Nitnem Level 2' },
    { name: 'Nitnem 3', grade: '6', description: 'Nitnem Level 3' },
    { name: 'Kirtan Class', grade: 'Special', description: 'Kirtan music class' },
    { name: 'Tabla Class', grade: 'Special', description: 'Tabla percussion class' },
    { name: 'Conversation Class', grade: 'Special', description: 'Conversational Punjabi class' },
  ];

  for (const cls of classes) {
    await prisma.class.upsert({
      where: { name: cls.name },
      update: {},
      create: cls,
    });
  }

  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
