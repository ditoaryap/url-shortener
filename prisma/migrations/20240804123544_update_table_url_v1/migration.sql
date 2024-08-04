/*
  Warnings:

  - A unique constraint covering the columns `[url_short]` on the table `urls` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "urls_url_short_key" ON "urls"("url_short");
