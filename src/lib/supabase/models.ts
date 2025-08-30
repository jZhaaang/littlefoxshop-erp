import type { Database } from './database';

// Base types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductType = Database['public']['Enums']['product_type'];

export type Purchase = Database['public']['Tables']['purchases']['Row'];

export type PurchaseItem =
  Database['public']['Tables']['purchase_items']['Row'];

// Insert types
export type ProductInsert = Database['public']['Tables']['products']['Insert'];

export type PurchaseInsert = Database['public']['Tables']['purchases']['Row'];

export type PurchaseItemInsert =
  Database['public']['Tables']['purchase_items']['Row'];

// Update types
export type ProductUpdate = Database['public']['Tables']['products']['Update'];

export type PurchaseUpdate = Database['public']['Tables']['purchases']['Row'];

export type PurchaseItemUpdate =
  Database['public']['Tables']['purchase_items']['Row'];

// UI/UX types
export type ProductValues = Omit<Product, 'id' | 'created_at'>;

export type PurchaseWithItems = Purchase & {
  purchaseItems: PurchaseItem[];
};

export type PurchaseWithItemsValues = Omit<Purchase, 'id' | 'created_at'> & {
  purchaseItems: Omit<PurchaseItem, 'id' | 'created_at' | 'purchase_id'>[];
};
