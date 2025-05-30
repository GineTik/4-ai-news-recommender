import { prisma } from "@/shared/prisma";

export class CategoryRepository {
  async getCategories() {
    return await prisma.category.findMany();
  }
}

export const categoryRepository = new CategoryRepository();
