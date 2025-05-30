"use server";

import { prisma } from "@/shared/prisma";
import { categoryRepository } from "./category.repository";

export const getCategories = async () => {
  await prisma.$connect();
  const categories = await categoryRepository.getCategories();
  await prisma.$disconnect();
  return categories;
};
