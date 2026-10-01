ALTER TABLE "teachers" ALTER COLUMN "name" DROP NOT NULL;

ALTER TABLE "teachers" ADD COLUMN "title" TEXT;

ALTER TABLE "teachers" ADD COLUMN "address" TEXT;