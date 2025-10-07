import { useEffect, useState } from 'react';
import type { Expense, ExpenseInsert, ExpenseUpdate } from '../models';
import {
  getAllExpenses,
  createExpense as createExpenseQuery,
  updateExpenseById,
  deleteExpenseById,
} from '../queries/expenses';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllExpenses();
      if (error) throw error;
      setExpenses(data ?? []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createExpense = async (expense: ExpenseInsert) => {
    setLoading(true);
    try {
      const { data, error } = await createExpenseQuery(expense);
      if (error) throw error;
      if (data) {
        setExpenses((prev) => [...prev, data]);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id: string, expense: ExpenseUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await updateExpenseById(id, expense);
      if (error) throw error;
      if (data) {
        setExpenses((prev) =>
          prev.map((expense) => (expense.id === id ? data : expense))
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await deleteExpenseById(id);
      if (error) throw error;
      if (data) {
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
  };
}
