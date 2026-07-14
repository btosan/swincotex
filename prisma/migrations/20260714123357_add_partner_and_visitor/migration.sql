-- CreateEnum
CREATE TYPE "SubmissionSource" AS ENUM ('CONTACT', 'PARTNERSHIP', 'JOB_APPLICATION');

-- AlterTable
ALTER TABLE "contact_submissions" ADD COLUMN     "source" "SubmissionSource" NOT NULL DEFAULT 'CONTACT';

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "visitorHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "page_views_createdAt_idx" ON "page_views"("createdAt");

-- CreateIndex
CREATE INDEX "page_views_visitorHash_idx" ON "page_views"("visitorHash");
