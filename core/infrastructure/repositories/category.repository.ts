import { injectable } from "inversify";
import { createClient } from "../utils/supabase/server";

import type { ICategoryRepository } from "@/core/application/repositories/category.repository.interface";
import { Icon, type Category } from "@/core/entities/models/category";
import { mapToCategoryDTO } from "@/core/dto/category";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private supabase = createClient();
  getIcon(fileName: string): Icon {
    const { data: imageUrl } = this.supabase.storage
      .from("categories-icons")
      .getPublicUrl(fileName);

    return { url: imageUrl.publicUrl };
  }
  async getCategories(): Promise<Category[]> {
    const response = await this.supabase.from("categories").select(
      `
      id,
      created_at,
      title,
      icon_url,
      category_options (id, topic, category_id)
      `
    );

    const { data: cardsData, error } = response;

    if (error) {
      throw new Error(error.message);
    }

    return cardsData.map(mapToCategoryDTO);
  }
}
