import { Category, Icon } from "@/core/entities/models/category";

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  getIcon(fileName: string): Icon;
}
