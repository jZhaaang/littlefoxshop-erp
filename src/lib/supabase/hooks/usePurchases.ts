import { useEffect, useState } from 'react';
import type {
  PurchaseInsert,
  PurchaseUpdate,
  PurchaseItemInsert,
  PurchaseItemUpdate,
  PurchaseWithItems,
} from '../models';
import {
  getAllPurchases,
  createPurchase as createPurchaseQuery,
  updatePurchaseById,
  deletePurchaseById,
} from '../queries/purchases';
import {
  createPurchaseItem as createPurchaseItemQuery,
  getPurchaseItemsByPurchaseId,
  updatePurchaseItemById,
  deletePurchaseItemById,
} from '../queries/purchaseItems';

export function usePurchases() {
  const [purchasesWithItems, setPurchasesWithItems] = useState<
    PurchaseWithItems[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: purchasesData, error: purchasesError } =
        await getAllPurchases();
      if (!purchasesData || purchasesError) throw purchasesError;

      const promises = purchasesData!.map(async (purchase) => {
        const { data: purchaseItemsData, error: purchaseItemsError } =
          await getPurchaseItemsByPurchaseId(purchase.id);
        if (purchaseItemsError) throw purchaseItemsError;

        return {
          ...purchase,
          purchaseItems: purchaseItemsData,
        } as PurchaseWithItems;
      });

      const enriched = await Promise.all(promises);
      setPurchasesWithItems(enriched);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createPurchase = async (
    purchase: PurchaseInsert,
    purchaseItems: PurchaseItemInsert[]
  ) => {
    setLoading(true);
    try {
      const { data: purchaseData, error: purchaseError } =
        await createPurchaseQuery(purchase);
      if (!purchaseData || purchaseError) throw purchaseError;
      const purchaseId = purchaseData.id;

      const promises = purchaseItems.map(async (purchaseItem) => {
        const { data: purchaseItemData, error: purchaseItemError } =
          await createPurchaseItemQuery({
            ...purchaseItem,
            purchase_id: purchaseId,
          });
        if (!purchaseItemData || purchaseItemError) throw purchaseItemError;

        return purchaseItemData;
      });

      const enriched = await Promise.all(promises);
      const newPurchaseWithItems = {
        ...purchaseData,
        purchaseItems: enriched,
      };
      setPurchasesWithItems((prev) => [...prev, newPurchaseWithItems]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createPurchaseItem = async (
    purchaseId: string,
    purchaseItem: PurchaseItemInsert
  ) => {
    setLoading(true);
    try {
      const { data, error } = await createPurchaseItemQuery({
        ...purchaseItem,
        purchase_id: purchaseId,
      });
      if (!data || error) throw error;

      setPurchasesWithItems((prev) =>
        prev.map((purchaseWithItems) =>
          purchaseWithItems.id === purchaseId
            ? {
                ...purchaseWithItems,
                purchaseItems: [...purchaseWithItems.purchaseItems, data],
              }
            : purchaseWithItems
        )
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updatePurchase = async (id: string, purchase: PurchaseUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await updatePurchaseById(id, purchase);
      if (!data || error) throw error;

      setPurchasesWithItems((prev) =>
        prev.map((purchaseWithItems) =>
          purchaseWithItems.id === id
            ? { ...purchaseWithItems, purchase: data }
            : purchaseWithItems
        )
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updatePurchaseItem = async (
    id: string,
    purchaseItem: PurchaseItemUpdate
  ) => {
    setLoading(true);
    try {
      const { data, error } = await updatePurchaseItemById(id, purchaseItem);
      if (!data || error) throw error;

      setPurchasesWithItems((prev) =>
        prev.map((purchaseWithItems) => ({
          ...purchaseWithItems,
          purchaseItems: purchaseWithItems.purchaseItems.map((purchaseItem) =>
            purchaseItem.id === id ? data : purchaseItem
          ),
        }))
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deletePurchase = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await deletePurchaseById(id);
      if (error) throw error;
      setPurchasesWithItems((prev) =>
        prev.filter((purchaseWithItems) => purchaseWithItems.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deletePurchaseItem = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await deletePurchaseItemById(id);
      if (!data || error) throw error;

      const purchaseId = data.purchase_id;
      setPurchasesWithItems((prev) =>
        prev.map((purchaseWithItems) =>
          purchaseWithItems.id === purchaseId
            ? {
                ...purchaseWithItems,
                purchaseItems: purchaseWithItems.purchaseItems.filter(
                  (purchaseItem) => purchaseItem.id !== id
                ),
              }
            : purchaseWithItems
        )
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    purchasesWithItems,
    loading,
    error,
    refetch: fetchData,
    createPurchase,
    createPurchaseItem,
    updatePurchase,
    updatePurchaseItem,
    deletePurchase,
    deletePurchaseItem,
  };
}
