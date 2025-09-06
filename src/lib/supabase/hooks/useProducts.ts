import { useEffect, useState } from 'react';
import type { Product, ProductInsert, ProductUpdate } from '../models';
import {
  getAllProducts,
  createProduct as createProductQuery,
  updateProductById,
  deleteProductById,
} from '../queries/products';
import { uploadProductImage } from '../storage';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllProducts();
      if (error) throw error;
      setProducts(data ?? []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductInsert, file?: File | null) => {
    setLoading(true);
    try {
      const { data, error } = await createProductQuery(product);
      if (error) throw error;
      if (data) {
        setProducts((prev) => [...prev, data]);
        if (file) {
          await updateProduct(data.id, product, file);
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    id: string,
    product: ProductUpdate,
    file?: File | null
  ) => {
    setLoading(true);
    console.log('Product ', product);
    console.log('File ', file);
    try {
      let payload: ProductUpdate = { ...product };

      if (file) {
        const url = await uploadProductImage(id, file);
        payload = { ...payload, image_url: url };
      } else if (!file && product.image_url === null) {
        payload.image_url = null;
      }

      const { data, error } = await updateProductById(id, payload);
      if (error) throw error;
      if (data) {
        setProducts((prev) =>
          prev.map((product) => (product.id === id ? data : product))
        );
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await deleteProductById(id);
      if (error) throw error;
      if (data) {
        setProducts((prev) => prev.filter((product) => product.id !== id));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
