import type { Order, OrderInsert, OrderUpdate } from '../models';
import { supabase } from '../client';

export async function getAllOrders(): Promise<{
  data: Order[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('orders').select('*');

  if (error) {
    console.error('Error fetching orders:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getOrderById(id: string): Promise<{
  data: Order | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createOrder(
  order: OrderInsert
): Promise<{ data: Order | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateOrderById(
  id: string,
  order: OrderUpdate
): Promise<{ data: Order | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('orders')
    .update(order)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating order:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteOrderById(
  id: string
): Promise<{ data: Order | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('orders')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting order:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
