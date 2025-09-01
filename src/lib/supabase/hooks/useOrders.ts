import { useEffect, useState } from 'react';
import type {
  OrderInsert,
  OrderUpdate,
  OrderItemInsert,
  OrderItemUpdate,
  OrderWithItems,
} from '../models';
import {
  getAllOrders,
  createOrder as createOrderQuery,
  updateOrderById,
  deleteOrderById,
} from '../queries/orders';
import {
  createOrderItem as createOrderItemQuery,
  getOrderItemsByOrderId,
  updateOrderItemById,
  deleteOrderItemById,
} from '../queries/orderItems';

export function useOrders() {
  const [ordersWithItems, setOrdersWithItems] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: ordersData, error: ordersError } = await getAllOrders();
      if (!ordersData || ordersError) throw ordersError;

      const promises = ordersData!.map(async (order) => {
        const { data: orderItemsData, error: orderItemsError } =
          await getOrderItemsByOrderId(order.id);
        if (orderItemsError) throw orderItemsError;

        return {
          ...order,
          orderItems: orderItemsData,
        } as OrderWithItems;
      });

      const enriched = await Promise.all(promises);
      setOrdersWithItems(enriched);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (
    order: OrderInsert,
    orderItems: OrderItemInsert[]
  ) => {
    setLoading(true);
    try {
      const { data: orderData, error: orderError } =
        await createOrderQuery(order);
      if (!orderData || orderError) throw orderError;
      const orderId = orderData.id;

      const promises = orderItems.map(async (orderItem) => {
        const { data: orderItemData, error: orderItemError } =
          await createOrderItemQuery({
            ...orderItem,
            order_id: orderId,
          });
        if (!orderItemData || orderItemError) throw orderItemError;

        return orderItemData;
      });

      const enriched = await Promise.all(promises);
      const newOrderWithItems = {
        ...orderData,
        orderItems: enriched,
      };
      setOrdersWithItems((prev) => [...prev, newOrderWithItems]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createOrderItem = async (
    orderId: string,
    orderItem: OrderItemInsert
  ) => {
    setLoading(true);
    try {
      const { data, error } = await createOrderItemQuery({
        ...orderItem,
        order_id: orderId,
      });
      if (!data || error) throw error;

      setOrdersWithItems((prev) =>
        prev.map((orderWithItems) =>
          orderWithItems.id === orderId
            ? {
                ...orderWithItems,
                orderItems: [...orderWithItems.orderItems, data],
              }
            : orderWithItems
        )
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id: string, order: OrderUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await updateOrderById(id, order);
      if (!data || error) throw error;

      setOrdersWithItems((prev) =>
        prev.map((orderWithItems) =>
          orderWithItems.id === id
            ? { ...orderWithItems, order: data }
            : orderWithItems
        )
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderItem = async (id: string, orderItem: OrderItemUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await updateOrderItemById(id, orderItem);
      if (!data || error) throw error;

      setOrdersWithItems((prev) =>
        prev.map((orderWithItems) => ({
          ...orderWithItems,
          orderItems: orderWithItems.orderItems.map((orderItem) =>
            orderItem.id === id ? data : orderItem
          ),
        }))
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await deleteOrderById(id);
      if (error) throw error;
      setOrdersWithItems((prev) =>
        prev.filter((orderWithItems) => orderWithItems.id !== id)
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteOrderItem = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await deleteOrderItemById(id);
      if (!data || error) throw error;

      const orderId = data.order_id;
      setOrdersWithItems((prev) =>
        prev.map((orderWithItems) =>
          orderWithItems.id === orderId
            ? {
                ...orderWithItems,
                orderItems: orderWithItems.orderItems.filter(
                  (orderItem) => orderItem.id !== id
                ),
              }
            : orderWithItems
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
    ordersWithItems,
    loading,
    error,
    refetch: fetchData,
    createOrder,
    createOrderItem,
    updateOrder,
    updateOrderItem,
    deleteOrder,
    deleteOrderItem,
  };
}
