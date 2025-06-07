export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      coin_packages: {
        Row: {
          bonus_coins: number | null
          created_at: string
          description: string | null
          dreamcoins: number
          id: string
          is_active: boolean | null
          name: string
          price_usd: number
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          bonus_coins?: number | null
          created_at?: string
          description?: string | null
          dreamcoins: number
          id?: string
          is_active?: boolean | null
          name: string
          price_usd: number
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          bonus_coins?: number | null
          created_at?: string
          description?: string | null
          dreamcoins?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price_usd?: number
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount_usd: number
          bonus_coins: number | null
          completed_at: string | null
          created_at: string
          dreamcoins_purchased: number
          id: string
          payment_data: Json | null
          payment_method: string
          payment_provider_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_usd: number
          bonus_coins?: number | null
          completed_at?: string | null
          created_at?: string
          dreamcoins_purchased: number
          id?: string
          payment_data?: Json | null
          payment_method: string
          payment_provider_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_usd?: number
          bonus_coins?: number | null
          completed_at?: string | null
          created_at?: string
          dreamcoins_purchased?: number
          id?: string
          payment_data?: Json | null
          payment_method?: string
          payment_provider_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profile_photos: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean | null
          photo_order: number | null
          photo_url: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          photo_order?: number | null
          photo_url: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          photo_order?: number | null
          photo_url?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_photos_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number
          bio: string | null
          created_at: string | null
          education: string | null
          email: string | null
          first_name: string
          gender: string
          height_cm: number | null
          id: string
          interests: string[] | null
          is_online: boolean | null
          is_verified: boolean | null
          last_active: string | null
          last_name: string
          location: string | null
          looking_for: string[] | null
          nickname: string
          occupation: string | null
          preferred_payment_method: string | null
          profile_pic_url: string | null
          relationship_status: string | null
          updated_at: string | null
        }
        Insert: {
          age: number
          bio?: string | null
          created_at?: string | null
          education?: string | null
          email?: string | null
          first_name: string
          gender: string
          height_cm?: number | null
          id?: string
          interests?: string[] | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          last_name: string
          location?: string | null
          looking_for?: string[] | null
          nickname: string
          occupation?: string | null
          preferred_payment_method?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number
          bio?: string | null
          created_at?: string | null
          education?: string | null
          email?: string | null
          first_name?: string
          gender?: string
          height_cm?: number | null
          id?: string
          interests?: string[] | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          last_name?: string
          location?: string | null
          looking_for?: string[] | null
          nickname?: string
          occupation?: string | null
          preferred_payment_method?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          created_at: string | null
          id: string
          interested_in: string[] | null
          max_age: number | null
          max_distance_km: number | null
          min_age: number | null
          preferred_gender: string[] | null
          profile_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interested_in?: string[] | null
          max_age?: number | null
          max_distance_km?: number | null
          min_age?: number | null
          preferred_gender?: string[] | null
          profile_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interested_in?: string[] | null
          max_age?: number | null
          max_distance_km?: number | null
          min_age?: number | null
          preferred_gender?: string[] | null
          profile_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
