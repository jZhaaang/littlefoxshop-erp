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
            foreignKeyName: 'order_items_product_sku_fkey';
            columns: ['product_sku'];
            isOneToOne: false;
            referencedRelation: 'products';
            referencedColumns: ['sku'];
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
          order_date: string;
          purchase_order_no: string;
          shipping_fee_domestic: number | null;
          shipping_fee_international: number | null;
          team_id: string;
          total_cost: number;
        };
        Insert: {
          created_at?: string | null;
          date_received?: string | null;
          id?: string;
          is_demo?: boolean;
          order_date?: string;
          purchase_order_no: string;
          shipping_fee_domestic?: number | null;
          shipping_fee_international?: number | null;
          team_id?: string;
          total_cost?: number;
        };
        Update: {
          created_at?: string | null;
          date_received?: string | null;
          id?: string;
          is_demo?: boolean;
          order_date?: string;
          purchase_order_no?: string;
          shipping_fee_domestic?: number | null;
          shipping_fee_international?: number | null;
          team_id?: string;
          total_cost?: number;
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
      [_ in never]: never;
    };
    Functions: {
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
