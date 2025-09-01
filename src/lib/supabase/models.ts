import type { Database } from './database';

// Base types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductType = Database['public']['Enums']['product_type'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type PurchaseItem =
  Database['public']['Tables']['purchase_items']['Row'];
export type Supply = Database['public']['Tables']['supplies']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

// Insert types
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type PurchaseInsert =
  Database['public']['Tables']['purchases']['Insert'];
export type PurchaseItemInsert =
  Database['public']['Tables']['purchase_items']['Insert'];
export type SupplyInsert = Database['public']['Tables']['supplies']['Insert'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderItemInsert =
  Database['public']['Tables']['order_items']['Insert'];

// Update types
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type PurchaseUpdate =
  Database['public']['Tables']['purchases']['Update'];
export type PurchaseItemUpdate =
  Database['public']['Tables']['purchase_items']['Update'];
export type SupplyUpdate = Database['public']['Tables']['supplies']['Update'];
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];
export type OrderItemUpdate =
  Database['public']['Tables']['order_items']['Update'];

// UI/UX types
export type ProductValues = Omit<Product, 'id' | 'created_at'>;
export type PurchaseWithItems = Purchase & {
  purchaseItems: PurchaseItem[];
};
export type PurchaseWithItemsInsert = PurchaseInsert & {
  purchaseItems: PurchaseItemInsert[];
};
export type Inventory = {
  products: Product[];
  supplies: Supply[];
};
export type OrderWithItems = Order & {
  orderItems: OrderItem[];
};
export type OrderWithItemsInsert = OrderInsert & {
  orderItems: OrderItemInsert[];
};
