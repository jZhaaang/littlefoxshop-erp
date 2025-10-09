import type { Database } from './database';

// Base types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductType = Database['public']['Enums']['product_types'];
export type ProductImage =
  Database['public']['Tables']['product_images']['Row'];
export type Purchase = Database['public']['Tables']['purchases']['Row'];
export type PurchaseItem =
  Database['public']['Tables']['purchase_items']['Row'];
export type Expense = Database['public']['Tables']['expenses']['Row'];
export type Supply = Database['public']['Tables']['supplies']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type Note = Database['public']['Tables']['notes']['Row'];
export type NoteImage = Database['public']['Tables']['note_images']['Row'];

// Insert types
export type ProductInsert = Database['public']['Tables']['products']['Insert'];
export type ProductImageInsert =
  Database['public']['Tables']['product_images']['Insert'];
export type PurchaseInsert =
  Database['public']['Tables']['purchases']['Insert'];
export type PurchaseItemInsert =
  Database['public']['Tables']['purchase_items']['Insert'];
export type ExpenseInsert = Database['public']['Tables']['expenses']['Insert'];
export type SupplyInsert = Database['public']['Tables']['supplies']['Insert'];
export type OrderInsert = Database['public']['Tables']['orders']['Insert'];
export type OrderItemInsert =
  Database['public']['Tables']['order_items']['Insert'];
export type NoteInsert = Database['public']['Tables']['notes']['Insert'];
export type NoteImageInsert =
  Database['public']['Tables']['note_images']['Insert'];

// Update types
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
export type ProductImageUpdate =
  Database['public']['Tables']['product_images']['Update'];
export type PurchaseUpdate =
  Database['public']['Tables']['purchases']['Update'];
export type PurchaseItemUpdate =
  Database['public']['Tables']['purchase_items']['Update'];
export type ExpenseUpdate = Database['public']['Tables']['expenses']['Update'];
export type SupplyUpdate = Database['public']['Tables']['supplies']['Update'];
export type OrderUpdate = Database['public']['Tables']['orders']['Update'];
export type OrderItemUpdate =
  Database['public']['Tables']['order_items']['Update'];
export type NoteUpdate = Database['public']['Tables']['notes']['Update'];
export type NoteImageUpdate =
  Database['public']['Tables']['note_images']['Update'];

// UI/UX types
export type LocalImage = { id: string; file: File; previewUrl: string };
export type ImagesDraft = {
  existing: ProductImage[] | NoteImage[];
  added: LocalImage[];
  removedIds: string[];
};

export type ProductWithImages = Product & {
  images?: ProductImage[];
};
export type ProductWithImagesInsert = ProductInsert & {
  imagesDraft?: ImagesDraft;
};

export type NoteWithImages = Note & {
  images?: NoteImage[];
};
export type NoteWithImagesInsert = NoteInsert & {
  imagesDraft?: ImagesDraft;
};

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
