ALTER TABLE "teachers" ALTER COLUMN "name" DROP NOT NULL;

ALTER TABLE "teachers" ADD COLUMN "gelar" TEXT;

ALTER TABLE "teachers" ADD COLUMN "alamat" TEXT;