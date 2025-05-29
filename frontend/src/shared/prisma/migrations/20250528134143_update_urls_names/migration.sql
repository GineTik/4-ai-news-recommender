/*
  Warnings:

  - You are about to drop the column `url` on the `News` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Source` table. All the data in the column will be lost.
  - Added the required column `homepageUrl` to the `Source` table without a default value. This is not possible if the table is not empty.

*/

ALTER TABLE `News` RENAME COLUMN `url` TO `originalUrl`;

ALTER TABLE `Source` RENAME COLUMN `url` TO `homepageUrl`;