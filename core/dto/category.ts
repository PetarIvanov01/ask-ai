import { Category } from "../entities/models/category";

export function mapToCategoryDTO<T>(supabaseTablesResult: {
  id: number;
  created_at: string;
  title: string;
  icon_url: string;
  category_options: {
    id: number;
    topic: string;
    category_id: number | null;
  }[];
}): Category {
  return {
    id: supabaseTablesResult.id,
    iconUrl: supabaseTablesResult.icon_url,
    options: supabaseTablesResult.category_options.map((e) => e.topic),
    title: supabaseTablesResult.title,
  };
}
