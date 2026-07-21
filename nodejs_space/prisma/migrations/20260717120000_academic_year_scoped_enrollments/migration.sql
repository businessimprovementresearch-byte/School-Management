-- 1. Add the columns as NULLABLE first so existing rows don't break.
ALTER TABLE "class_enrollments" ADD COLUMN "academicYearId" TEXT;
ALTER TABLE "teacher_assignments" ADD COLUMN "academicYearId" TEXT;

-- 2. Backfill existing rows with the currently active academic year.
UPDATE "class_enrollments"
SET "academicYearId" = (
  SELECT "id" FROM "academic_years"
  ORDER BY "isActive" DESC, "startDate" DESC
  LIMIT 1
)
WHERE "academicYearId" IS NULL;

UPDATE "teacher_assignments"
SET "academicYearId" = (
  SELECT "id" FROM "academic_years"
  ORDER BY "isActive" DESC, "startDate" DESC
  LIMIT 1
)
WHERE "academicYearId" IS NULL;

-- 3. Enforce NOT NULL.
ALTER TABLE "class_enrollments" ALTER COLUMN "academicYearId" SET NOT NULL;
ALTER TABLE "teacher_assignments" ALTER COLUMN "academicYearId" SET NOT NULL;

-- 4. Replace old unique constraints with year-scoped ones.
ALTER TABLE "class_enrollments" DROP CONSTRAINT IF EXISTS "class_enrollments_studentId_classId_key";
ALTER TABLE "class_enrollments" ADD CONSTRAINT "class_enrollments_studentId_classId_academicYearId_key"
  UNIQUE ("studentId", "classId", "academicYearId");

ALTER TABLE "teacher_assignments" DROP CONSTRAINT IF EXISTS "teacher_assignments_teacherId_classId_key";
ALTER TABLE "teacher_assignments" ADD CONSTRAINT "teacher_assignments_teacherId_classId_academicYearId_key"
  UNIQUE ("teacherId", "classId", "academicYearId");

-- 5. Foreign keys to academic_years.
ALTER TABLE "class_enrollments" ADD CONSTRAINT "class_enrollments_academicYearId_fkey"
  FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "teacher_assignments" ADD CONSTRAINT "teacher_assignments_academicYearId_fkey"
  FOREIGN KEY ("academicYearId") REFERENCES "academic_years"("id") ON DELETE CASCADE ON UPDATE CASCADE;