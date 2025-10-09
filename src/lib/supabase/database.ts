export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '13.0.4';
  };
  public: {
    Tables: {
      expenses: {
        Row: {
          cost_rmb: number;
          cost_usd: number;
          created_at: string | null;
          description: string | null;
          id: string;
          is_demo: boolean;
          name: string;
          team_id: string | null;
        };
        Insert: {
          cost_rmb: number;
          cost_usd: number;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_demo?: boolean;
          name: string;
          team_id?: string | null;
        };
        Update: {
          cost_rmb?: number;
          cost_usd?: number;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_demo?: boolean;
          name?: string;
          team_id?: string | null;
        };
        Relationships: [];
      };
      note_images: {
        Row: {
          created_at: string;
          id: string;
          note_id: string | null;
          path: string;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          note_id?: string | null;
          path?: string;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          note_id?: string | null;
          path?: string;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'note_images_note_id_fkey';
            columns: ['note_id'];
            isOneToOne: false;
            referencedRelation: 'notes';
            referencedColumns: ['id'];
          },
        ];
      };
      notes: {
        Row: {
          content_json: Json;
          content_text: string | null;
          created_at: string;
          id: string;
          is_demo: boolean;
          team_id: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          content_json?: Json;
          content_text?: string | null;
          created_at?: string;
          id?: string;
          is_demo?: boolean;
          team_id?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          content_json?: Json;
          content_text?: string | null;
          created_at?: string;
          id?: string;
          is_demo?: boolean;
          team_id?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_sku: string;
          quantity: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_sku: string;
          quantity: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_sku?: string;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'orders';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'v_order_financials';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'order_items_order_id_fkey';
            columns: ['order_id'];
            isOneToOne: false;
            referencedRelation: 'v_order_items_priced';
            referencedColumns: ['order_id'];
          },
          {
            foreignKeyName: 'order_items_product_sku_fkey';
            columns: ['product_sku'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['sku'];
          },
          {
            foreignKeyName: 'order_items_product_sku_fkey';
            columns: ['product_sku'];
            isOneToOne: false;
            referencedRelation: 'v_inventory_on_hand';
            referencedColumns: ['product_sku'];
          },
        ];
      };
      orders: {
        Row: {
          created_at: string;
          customer_name: string | null;
          date_fulfilled: string | null;
          delivery_fee: number;
          id: string;
          is_demo: boolean;
          notes: string | null;
          order_date: string;
          order_no: string;
          other_fees: number;
          team_id: string;
        };
        Insert: {
          created_at?: string;
          customer_name?: string | null;
          date_fulfilled?: string | null;
          delivery_fee?: number;
          id?: string;
          is_demo?: boolean;
          notes?: string | null;
          order_date?: string;
          order_no: string;
          other_fees?: number;
          team_id?: string;
        };
        Update: {
          created_at?: string;
          customer_name?: string | null;
          date_fulfilled?: string | null;
          delivery_fee?: number;
          id?: string;
          is_demo?: boolean;
          notes?: string | null;
          order_date?: string;
          order_no?: string;
          other_fees?: number;
          team_id?: string;
        };
        Relationships: [];
      };
      product_images: {
        Row: {
          created_at: string;
          id: string;
          path: string;
          product_id: string | null;
          url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          path?: string;
          product_id?: string | null;
          url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          path?: string;
          product_id?: string | null;
          url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'product_images_product_id_fkey';
            columns: ['product_id'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['id'];
          },
        ];
      };
      products: {
        Row: {
          cost_rmb: number;
          created_at: string;
          description: string | null;
          details: string | null;
          id: string;
          is_demo: boolean;
          min_stock: number;
          name: string;
          price_usd: number | null;
          sku: string;
          stock: number;
          supplier: string | null;
          team_id: string;
          type: Database['public']['Enums']['product_types'] | null;
        };
        Insert: {
          cost_rmb: number;
          created_at?: string;
          description?: string | null;
          details?: string | null;
          id?: string;
          is_demo?: boolean;
          min_stock?: number;
          name?: string;
          price_usd?: number | null;
          sku?: string;
          stock?: number;
          supplier?: string | null;
          team_id?: string;
          type?: Database['public']['Enums']['product_types'] | null;
        };
        Update: {
          cost_rmb?: number;
          created_at?: string;
          description?: string | null;
          details?: string | null;
          id?: string;
          is_demo?: boolean;
          min_stock?: number;
          name?: string;
          price_usd?: number | null;
          sku?: string;
          stock?: number;
          supplier?: string | null;
          team_id?: string;
          type?: Database['public']['Enums']['product_types'] | null;
        };
        Relationships: [];
      };
      purchase_items: {
        Row: {
          created_at: string | null;
          id: string;
          purchase_id: string;
          quantity: number;
          sku: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          purchase_id: string;
          quantity: number;
          sku: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          purchase_id?: string;
          quantity?: number;
          sku?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'purchase_items_purchase_id_fkey';
            columns: ['purchase_id'];
            isOneToOne: false;
            referencedRelation: 'purchases';
            referencedColumns: ['id'];
          },
        ];
      };
      purchases: {
        Row: {
          created_at: string | null;
          date_received: string | null;
          id: string;
          is_demo: boolean;
          items_cost_rmb: number;
          order_date: string;
          purchase_order_no: string;
          shipping_fee_domestic: number | null;
          shipping_fee_international: number | null;
          team_id: string;
          total_cost: number;
          total_cost_usd: number;
        };
        Insert: {
          created_at?: string | null;
          date_received?: string | null;
          id?: string;
          is_demo?: boolean;
          items_cost_rmb?: number;
          order_date?: string;
          purchase_order_no: string;
          shipping_fee_domestic?: number | null;
          shipping_fee_international?: number | null;
          team_id?: string;
          total_cost?: number;
          total_cost_usd?: number;
        };
        Update: {
          created_at?: string | null;
          date_received?: string | null;
          id?: string;
          is_demo?: boolean;
          items_cost_rmb?: number;
          order_date?: string;
          purchase_order_no?: string;
          shipping_fee_domestic?: number | null;
          shipping_fee_international?: number | null;
          team_id?: string;
          total_cost?: number;
          total_cost_usd?: number;
        };
        Relationships: [];
      };
      supplies: {
        Row: {
          cost_rmb: number;
          created_at: string;
          details: string | null;
          id: string;
          is_demo: boolean;
          min_stock: number;
          name: string;
          sku: string;
          stock: number;
          supplier: string;
          team_id: string;
        };
        Insert: {
          cost_rmb: number;
          created_at?: string;
          details?: string | null;
          id?: string;
          is_demo?: boolean;
          min_stock?: number;
          name?: string;
          sku?: string;
          stock?: number;
          supplier?: string;
          team_id?: string;
        };
        Update: {
          cost_rmb?: number;
          created_at?: string;
          details?: string | null;
          id?: string;
          is_demo?: boolean;
          min_stock?: number;
          name?: string;
          sku?: string;
          stock?: number;
          supplier?: string;
          team_id?: string;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          created_at: string;
          id: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      v_inventory_on_hand: {
        Row: {
          inventory_valuation_usd: number | null;
          product_sku: string | null;
          qty_on_hand: number | null;
          unit_cost_usd: number | null;
        };
        Insert: {
          inventory_valuation_usd?: never;
          product_sku?: string | null;
          qty_on_hand?: number | null;
          unit_cost_usd?: never;
        };
        Update: {
          inventory_valuation_usd?: never;
          product_sku?: string | null;
          qty_on_hand?: number | null;
          unit_cost_usd?: never;
        };
        Relationships: [];
      };
      v_lifetime_kpis: {
        Row: {
          cogs_usd: number | null;
          delivery_fee_usd: number | null;
          gross_profit_usd: number | null;
          net_profit_after_opex_usd: number | null;
          operating_expenses_usd: number | null;
          other_fees_usd: number | null;
          purchase_spend_usd: number | null;
          revenue_usd: number | null;
        };
        Relationships: [];
      };
      v_monthly_kpis: {
        Row: {
          cogs_usd: number | null;
          delivery_fee_usd: number | null;
          gross_profit_usd: number | null;
          month: string | null;
          net_profit_after_opex_usd: number | null;
          net_profit_before_opex_usd: number | null;
          operating_expenses_usd: number | null;
          order_count: number | null;
          other_fees_usd: number | null;
          products_sold: number | null;
          purchase_spend_usd: number | null;
          revenue_usd: number | null;
        };
        Relationships: [];
      };
      v_monthly_operating_expenses: {
        Row: {
          expenses_usd: number | null;
          month: string | null;
        };
        Relationships: [];
      };
      v_monthly_orders_rollup: {
        Row: {
          cogs_usd: number | null;
          delivery_fee_usd: number | null;
          gross_profit_usd: number | null;
          month: string | null;
          net_profit_before_opex_usd: number | null;
          order_count: number | null;
          other_fees_usd: number | null;
          products_sold: number | null;
          revenue_usd: number | null;
        };
        Relationships: [];
      };
      v_monthly_purchase_spend: {
        Row: {
          month: string | null;
          purchase_spend_usd: number | null;
        };
        Relationships: [];
      };
      v_monthly_purchases_quantities: {
        Row: {
          month: string | null;
          qty_received: number | null;
          sku: string | null;
        };
        Relationships: [];
      };
      v_months_dynamic: {
        Row: {
          month: string | null;
        };
        Relationships: [];
      };
      v_order_financials: {
        Row: {
          cogs_usd: number | null;
          delivery_fee_usd: number | null;
          gross_profit_usd: number | null;
          items_sold: number | null;
          net_profit_before_opex_usd: number | null;
          order_date: string | null;
          order_id: string | null;
          other_fees_usd: number | null;
          revenue_usd: number | null;
        };
        Relationships: [];
      };
      v_order_items_priced: {
        Row: {
          cost_rmb: number | null;
          line_cogs_usd: number | null;
          line_gross_profit_usd: number | null;
          line_revenue_usd: number | null;
          order_date: string | null;
          order_id: string | null;
          price_usd: number | null;
          product_sku: string | null;
          quantity: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'order_items_product_sku_fkey';
            columns: ['product_sku'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['sku'];
          },
          {
            foreignKeyName: 'order_items_product_sku_fkey';
            columns: ['product_sku'];
            isOneToOne: false;
            referencedRelation: 'v_inventory_on_hand';
            referencedColumns: ['product_sku'];
          },
        ];
      };
    };
    Functions: {
      recalc_purchase_totals: {
        Args: { p_id: string };
        Returns: undefined;
      };
      sku_kind: {
        Args: { p_sku: string };
        Returns: string;
      };
    };
    Enums: {
      product_types:
        | '封口夹'
        | '杯垫'
        | '袜子'
        | '数据线收纳'
        | '耳机壳'
        | '无';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      product_types: ['封口夹', '杯垫', '袜子', '数据线收纳', '耳机壳', '无'],
    },
  },
} as const;
