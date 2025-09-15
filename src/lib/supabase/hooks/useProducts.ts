import { useEffect, useState } from 'react';
import type {
  ImagesDraft,
  ProductInsert,
  ProductUpdate,
  ProductWithImages,
} from '../models';
import {
  getAllProducts,
  createProduct as createProductQuery,
  updateProductById,
  deleteProductById,
} from '../queries/products';
import {
  createProductImage as createProductImageQuery,
  deleteProductImageById,
  getProductImagesByProductId,
} from '../queries/productImages';
import { getProductImageUrl, uploadProductImage } from '../storage';

export function useProducts() {
  const [productsWithImages, setProductsWithImages] = useState<
    ProductWithImages[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data: productsData, error: productsError } =
        await getAllProducts();
      if (!productsData || productsError) throw productsError;

      const promises = productsData.map(async (product) => {
        const { data: productImagesData, error: productImagesError } =
          await getProductImagesByProductId(product.id);
        if (!productImagesData || productImagesError) throw productImagesError;

        return {
          ...product,
          images: productImagesData,
        } as ProductWithImages;
      });
      const enriched = await Promise.all(promises);
      setProductsWithImages(enriched);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (
    product: ProductInsert,
    productImages: ImagesDraft
  ) => {
    setLoading(true);
    try {
      const { data: productData, error: productError } =
        await createProductQuery(product);
      if (!productData || productError) throw productError;
      const productId = productData.id;

      const promises = productImages.added.map(async (productImage) => {
        const { data: uploadData, error: uploadError } =
          await uploadProductImage(productId, productImage.file);
        if (!uploadData || uploadError) throw uploadError;

        const url = await getProductImageUrl(uploadData.path);

        const { data: productImageData, error: productImageError } =
          await createProductImageQuery({
            product_id: productId,
            path: uploadData.path,
            url,
          });
        if (!productImageData || productImageError) throw productImageError;

        return productImageData;
      });

      const enriched = await Promise.all(promises);
      const newProductWithImages = {
        ...productData,
        images: enriched,
      };
      setProductsWithImages((prev) => [...prev, newProductWithImages]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (
    id: string,
    product: ProductUpdate,
    productImages: ImagesDraft
  ) => {
    setLoading(true);
    try {
      const { data: productData, error: productError } =
        await updateProductById(id, product);
      if (!productData || productError) throw error;
      const productId = productData.id;

      setProductsWithImages((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, product: productData } : product
        )
      );

      if (productImages.added.length || productImages.removedIds.length) {
        const removed = new Set(productImages.removedIds);
        for (const id of removed) {
          await deleteProductImageById(id);
        }

        const promises = productImages.added.map(async (productImage) => {
          const { data: uploadData, error: uploadError } =
            await uploadProductImage(productId, productImage.file);
          if (!uploadData || uploadError) throw uploadError;

          const url = await getProductImageUrl(uploadData.path);

          const { data: productImageData, error: productImageError } =
            await createProductImageQuery({
              product_id: productId,
              path: uploadData.path,
              url,
            });
          if (!productImageData || productImageError) throw productImageError;

          return productImageData;
        });

        const enriched = await Promise.all(promises);
        setProductsWithImages((prev) =>
          prev.map((product) => {
            if (product.id !== id) return product;
            return {
              ...product,
              images: [
                ...product.images!.filter((image) => !removed.has(image.id)),
                ...enriched,
              ],
            };
          })
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
      const { error } = await deleteProductById(id);
      if (error) throw error;
      setProductsWithImages((prev) =>
        prev.filter((product) => product.id !== id)
      );
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
    productsWithImages,
    loading,
    error,
    refetch: fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
