-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "url_short" TEXT NOT NULL,
    "url_long" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);
