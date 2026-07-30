ALTER TABLE "students" ADD COLUMN "studentIdNumber" TEXT;
CREATE UNIQUE INDEX "students_studentIdNumber_key" ON "students"("studentIdNumber");