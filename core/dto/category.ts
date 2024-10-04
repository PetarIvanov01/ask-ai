import { Category } from "../entities/models/category";
import { Database } from "../infrastructure/utils/supabase/database.gen";

export function mapToCategoryDTO(
  supabaseTablesResult: Database["public"]["Tables"]["categories"]["Row"]
): Category {
  return {
    id: supabaseTablesResult.id,
    iconUrl: supabaseTablesResult.icon_url,
    options: supabaseTablesResult.options,
    title: supabaseTablesResult.title,
  };
}
