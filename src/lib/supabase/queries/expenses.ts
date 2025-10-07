import type { Expense, ExpenseInsert, ExpenseUpdate } from '../models';
import { supabase } from '../client';

export async function getAllExpenses(): Promise<{
  data: Expense[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase.from('expenses').select('*');

  if (error) {
    console.error('Error fetching expenses:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function getExpenseById(id: string): Promise<{
  data: Expense | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching expense:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function createExpense(
  expense: ExpenseInsert
): Promise<{ data: Expense | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('expenses')
    .insert(expense)
    .select()
    .single();

  if (error) {
    console.error('Error creating expense:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function updateExpenseById(
  id: string,
  expense: ExpenseUpdate
): Promise<{ data: Expense | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('expenses')
    .update(expense)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating expense:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

export async function deleteExpenseById(
  id: string
): Promise<{ data: Expense | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error deleting expense:', error.message);
    return { data: null, error };
  }

  return { data, error: null };
}
