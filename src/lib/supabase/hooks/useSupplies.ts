import { useEffect, useState } from 'react';
import type { Supply, SupplyInsert, SupplyUpdate } from '../models';
import {
  getAllSupplies,
  createSupply as createSupplyQuery,
  updateSupplyById,
  deleteSupplyById,
} from '../queries/supplies';

export function useSupplies() {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSupplies = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllSupplies();
      if (error) throw error;
      setSupplies(data ?? []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createSupply = async (supply: SupplyInsert) => {
    setLoading(true);
    try {
      const { data, error } = await createSupplyQuery(supply);
      if (error) throw error;
      if (data) {
        setSupplies((prev) => [...prev, data]);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateSupply = async (id: string, supply: SupplyUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await updateSupplyById(id, supply);
      if (error) throw error;
      if (data) {
        setSupplies((prev) =>
          prev.map((supply) => (supply.id === id ? data : supply))
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSupply = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await deleteSupplyById(id);
      if (error) throw error;
      if (data) {
        setSupplies((prev) => prev.filter((supply) => supply.id !== id));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplies();
  }, []);

  return {
    supplies,
    loading,
    error,
    refetch: fetchSupplies,
    createSupply,
    updateSupply,
    deleteSupply,
  };
}
