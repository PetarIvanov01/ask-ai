import { injectable } from "inversify";
import { createClient } from "../utils/supabase/server";

import type { ICategoryRepository } from "@/core/application/repositories/category.repository.interface";
import { Icon, type Category } from "@/core/entities/models/category";
import { mapToCategoryDTO } from "@/core/dto/category";

@injectable()
export class CategoryRepository implements ICategoryRepository {
  getIcon(fileName: string): Icon {
    const supabase = createClient();
    const { data: imageUrl } = supabase.storage
      .from("categories-icons")
      .getPublicUrl(fileName);

    return { url: imageUrl.publicUrl };
  }
  async getCategories(): Promise<Category[]> {
    const supabase = createClient();

    const response = await supabase.from("categories").select();

    const { data: cardsData, error } = response;
    if (error) {
      throw new Error(error.message);
    }

    return cardsData.map(mapToCategoryDTO);
  }
}
