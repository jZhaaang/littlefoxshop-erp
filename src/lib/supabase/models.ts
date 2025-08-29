import type { Database } from './database';

// Base types
export type Product = Database['public']['Tables']['products']['Row'];
export type ProductType = Database['public']['Enums']['product_type'];

// Insert types
export type ProductInsert = Database['public']['Tables']['products']['Insert'];

// Update types
export type ProductUpdate = Database['public']['Tables']['products']['Update'];
