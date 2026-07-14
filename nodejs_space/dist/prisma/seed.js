"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const hashedPassword1 = await bcrypt.hash('johndoe123', 10);
    await prisma.user.upsert({
        where: { email: 'john@doe.com' },
        update: {},
        create: {
            email: 'john@doe.com',
            password: hashedPassword1,
            name: 'John Doe',
            role: client_1.UserRole.ADMIN,
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
            role: client_1.UserRole.ADMIN,
        },
    });
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
//# sourceMappingURL=seed.js.map