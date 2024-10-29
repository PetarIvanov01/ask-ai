export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          icon_url: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          icon_url: string
          id?: number
          title: string
        }
        Update: {
          created_at?: string
          icon_url?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      category_options: {
        Row: {
          ai_instructions: string
          category_id: number
          created_at: string
          id: number
          topic: string
        }
        Insert: {
          ai_instructions: string
          category_id: number
          created_at?: string
          id?: number
          topic: string
        }
        Update: {
          ai_instructions?: string
          category_id?: number
          created_at?: string
          id?: number
          topic?: string
        }
        Relationships: [
          {
            foreignKeyName: "category_options_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_settings: {
        Row: {
          background: string | null
          chat_id: string
          id: number
          language: Database["public"]["Enums"]["languages"]
          length: Database["public"]["Enums"]["response_length"]
          personality: Database["public"]["Enums"]["personalities"]
          proficiency: Database["public"]["Enums"]["proficiencies"]
          tags: string | null
        }
        Insert: {
          background?: string | null
          chat_id: string
          id?: number
          language?: Database["public"]["Enums"]["languages"]
          length?: Database["public"]["Enums"]["response_length"]
          personality?: Database["public"]["Enums"]["personalities"]
          proficiency?: Database["public"]["Enums"]["proficiencies"]
          tags?: string | null
        }
        Update: {
          background?: string | null
          chat_id?: string
          id?: number
          language?: Database["public"]["Enums"]["languages"]
          length?: Database["public"]["Enums"]["response_length"]
          personality?: Database["public"]["Enums"]["personalities"]
          proficiency?: Database["public"]["Enums"]["proficiencies"]
          tags?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_settings_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
        ]
      }
      chats: {
        Row: {
          category_id: number
          chat_id: string
          chat_name: string
          created_at: string
          custom: boolean
          topic: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category_id: number
          chat_id?: string
          chat_name: string
          created_at?: string
          custom?: boolean
          topic: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category_id?: number
          chat_id?: string
          chat_name?: string
          created_at?: string
          custom?: boolean
          topic?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chats_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          chat_id: string
          created_at: string
          message: string
          message_id: string
          role: Database["public"]["Enums"]["role"]
        }
        Insert: {
          chat_id: string
          created_at?: string
          message?: string
          message_id?: string
          role?: Database["public"]["Enums"]["role"]
        }
        Update: {
          chat_id?: string
          created_at?: string
          message?: string
          message_id?: string
          role?: Database["public"]["Enums"]["role"]
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["chat_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      languages: "english" | "bulgarian"
      personalities: "friendly" | "professional" | "humorous"
      proficiencies: "beginner" | "intermediate" | "advanced"
      response_length: "short" | "medium" | "detailed"
      role: "user" | "ai"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

