import { getInjection } from "@/core/di/container";
import { Category, Icon } from "@/core/entities/models/category";

// I prefer to not use use-cases.

export async function getCategories(): Promise<Category[]> {
  const categoryRepository = getInjection("ICategoryRepository");
  const categories = await categoryRepository.getCategories();

  return categories;
}

export function getIconURL(fileName: string): Icon["url"] {
  const categoryRepository = getInjection("ICategoryRepository");
  return categoryRepository.getIcon(fileName).url;
}
