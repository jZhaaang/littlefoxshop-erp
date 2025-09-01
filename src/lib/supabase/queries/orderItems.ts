import type { OrderItem, OrderItemInsert, OrderItemUpdate } from '../models';
import { supabase } from '../client';

export async function getAllOrderItems(): Promise<{
  data: OrderItem[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('order_items').select('*');

  if (error) {
    console.error('Error fetching order items:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getOrderItemById(id: string): Promise<{
  data: OrderItem | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getOrderItemsByOrderId(orderId: string): Promise<{
  data: OrderItem[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  if (error) {
    console.error('Error fetching order item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createOrderItem(
  orderItem: OrderItemInsert
): Promise<{ data: OrderItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItem)
    .select()
    .single();

  if (error) {
    console.error('Error creating order item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateOrderItemById(
  id: string,
  orderItem: OrderItemUpdate
): Promise<{ data: OrderItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('order_items')
    .update(orderItem)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteOrderItemById(
  id: string
): Promise<{ data: OrderItem | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('order_items')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting order item:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
