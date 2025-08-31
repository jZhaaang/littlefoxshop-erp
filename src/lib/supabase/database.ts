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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      products: {
        Row: {
          cost_rmb: number
          created_at: string
          description: string | null
          details: string | null
          id: string
          image_url: string | null
          min_stock: number
          name: string
          price_usd: number
          sku: string
          stock: number
          supplier: string
          type: Database["public"]["Enums"]["product_type"]
        }
        Insert: {
          cost_rmb: number
          created_at?: string
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          min_stock?: number
          name?: string
          price_usd: number
          sku?: string
          stock?: number
          supplier?: string
          type: Database["public"]["Enums"]["product_type"]
        }
        Update: {
          cost_rmb?: number
          created_at?: string
          description?: string | null
          details?: string | null
          id?: string
          image_url?: string | null
          min_stock?: number
          name?: string
          price_usd?: number
          sku?: string
          stock?: number
          supplier?: string
          type?: Database["public"]["Enums"]["product_type"]
        }
        Relationships: []
      }
      purchase_items: {
        Row: {
          created_at: string | null
          id: string
          purchase_id: string
          quantity: number
          sku: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          purchase_id: string
          quantity: number
          sku: string
        }
        Update: {
          created_at?: string | null
          id?: string
          purchase_id?: string
          quantity?: number
          sku?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_items_product_sku_fkey"
            columns: ["sku"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["sku"]
          },
          {
            foreignKeyName: "purchase_items_purchase_id_fkey"
            columns: ["purchase_id"]
            isOneToOne: false
            referencedRelation: "purchases"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          created_at: string | null
          date_received: string | null
          id: string
          order_date: string
          purchase_order_no: string
          shipping_fee_domestic: number | null
          shipping_fee_international: number | null
          total_cost: number
        }
        Insert: {
          created_at?: string | null
          date_received?: string | null
          id?: string
          order_date?: string
          purchase_order_no: string
          shipping_fee_domestic?: number | null
          shipping_fee_international?: number | null
          total_cost?: number
        }
        Update: {
          created_at?: string | null
          date_received?: string | null
          id?: string
          order_date?: string
          purchase_order_no?: string
          shipping_fee_domestic?: number | null
          shipping_fee_international?: number | null
          total_cost?: number
        }
        Relationships: []
      }
      supplies: {
        Row: {
          cost_rmb: number
          created_at: string
          details: string | null
          id: string
          min_stock: number
          name: string
          sku: string
          stock: number
          supplier: string
        }
        Insert: {
          cost_rmb: number
          created_at?: string
          details?: string | null
          id?: string
          min_stock?: number
          name?: string
          sku?: string
          stock?: number
          supplier?: string
        }
        Update: {
          cost_rmb?: number
          created_at?: string
          details?: string | null
          id?: string
          min_stock?: number
          name?: string
          sku?: string
          stock?: number
          supplier?: string
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
      product_type:
        | "Socks"
        | "Cupholder"
        | "AirPods Case"
        | "Packaging"
        | "Uncategorized"
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
      product_type: [
        "Socks",
        "Cupholder",
        "AirPods Case",
        "Packaging",
        "Uncategorized",
      ],
    },
  },
} as const
