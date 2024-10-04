// import { Conversation } from "../entities/models/chat";

// export function mapToConversationDTO(supabaseTablesResult: {
//   category_id: number;
//   chat_id: string;
//   created_at: string;
//   user_id: string;
//   categories: {
//     title: string;
//     image_url:string
//   };
//   messages: {
//     message_id: number;
//     user_message: string;
//     bot_response: string;
//   }[];
// }): Conversation {
//   return {
//     chatId: supabaseTablesResult.chat_id,
//     userId: supabaseTablesResult.user_id,
//     categoryTitle: supabaseTablesResult.categories.title,
//     imageUrl:supabaseTablesResult.categories.image_url,
//     topic
//   };
// }

// export function mapToUserBotDTO() {}
