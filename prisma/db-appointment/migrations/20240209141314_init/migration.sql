-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FilledForm" (
    "id" uuid NOT NULL DEFAULT UUID_GENERATE_V4(),
    "formId" TEXT NOT NULL,
    "bookedId" TEXT NOT NULL,
    "filledBy" TEXT NOT NULL,
    "filledWith" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "FilledForm_pkey" PRIMARY KEY ("id") 
);

-- AddForeignKey
ALTER TABLE "FilledForm" ADD CONSTRAINT "FilledForm_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
