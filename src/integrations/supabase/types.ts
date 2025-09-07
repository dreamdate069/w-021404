export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
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
      login_attempts: {
        Row: {
          attempted_at: string | null
          email: string
          id: string
          ip_address: unknown | null
          success: boolean
          user_agent: string | null
        }
        Insert: {
          attempted_at?: string | null
          email: string
          id?: string
          ip_address?: unknown | null
          success: boolean
          user_agent?: string | null
        }
        Update: {
          attempted_at?: string | null
          email?: string
          id?: string
          ip_address?: unknown | null
          success?: boolean
          user_agent?: string | null
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
          {
            foreignKeyName: "profile_photos_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: string | null
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
          last_login: string | null
          last_name: string
          location: string | null
          login_count: number | null
          looking_for: string[] | null
          nickname: string
          occupation: string | null
          preferred_payment_method: string | null
          profile_pic_url: string | null
          relationship_status: string | null
          updated_at: string | null
          verification_date: string | null
          verification_method: string | null
          verification_status: string | null
        }
        Insert: {
          account_status?: string | null
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
          last_login?: string | null
          last_name: string
          location?: string | null
          login_count?: number | null
          looking_for?: string[] | null
          nickname: string
          occupation?: string | null
          preferred_payment_method?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verification_method?: string | null
          verification_status?: string | null
        }
        Update: {
          account_status?: string | null
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
          last_login?: string | null
          last_name?: string
          location?: string | null
          login_count?: number | null
          looking_for?: string[] | null
          nickname?: string
          occupation?: string | null
          preferred_payment_method?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          updated_at?: string | null
          verification_date?: string | null
          verification_method?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
      user_coin_balances: {
        Row: {
          balance: number
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          balance?: number
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
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
          {
            foreignKeyName: "user_preferences_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      public_profiles: {
        Row: {
          account_status: string | null
          age: number | null
          bio: string | null
          created_at: string | null
          education: string | null
          first_name: string | null
          gender: string | null
          height_cm: number | null
          id: string | null
          interests: string[] | null
          is_online: boolean | null
          is_verified: boolean | null
          last_active: string | null
          location: string | null
          looking_for: string[] | null
          nickname: string | null
          occupation: string | null
          profile_pic_url: string | null
          relationship_status: string | null
          verification_status: string | null
        }
        Insert: {
          account_status?: string | null
          age?: number | null
          bio?: string | null
          created_at?: string | null
          education?: string | null
          first_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string | null
          interests?: string[] | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          location?: string | null
          looking_for?: string[] | null
          nickname?: string | null
          occupation?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          verification_status?: string | null
        }
        Update: {
          account_status?: string | null
          age?: number | null
          bio?: string | null
          created_at?: string | null
          education?: string | null
          first_name?: string | null
          gender?: string | null
          height_cm?: number | null
          id?: string | null
          interests?: string[] | null
          is_online?: boolean | null
          is_verified?: boolean | null
          last_active?: string | null
          location?: string | null
          looking_for?: string[] | null
          nickname?: string | null
          occupation?: string | null
          profile_pic_url?: string | null
          relationship_status?: string | null
          verification_status?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      get_public_profile: {
        Args: { profile_id: string }
        Returns: {
          account_status: string
          age: number
          bio: string
          created_at: string
          education: string
          first_name: string
          gender: string
          height_cm: number
          id: string
          interests: string[]
          is_online: boolean
          is_verified: boolean
          last_active: string
          location: string
          looking_for: string[]
          nickname: string
          occupation: string
          profile_pic_url: string
          relationship_status: string
          verification_status: string
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
