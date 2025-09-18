import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Product } from '../utils';

type UseProductsResult = {
  data: Product | Product[] | null;
  isLoading: boolean;
  error: string;
};

export default function useProducts(productId?: string): UseProductsResult {
  const [data, setData] = useState<Product | Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const endpoint = productId ? `/products/${productId}` : '/products/';

    apiClient
      .get(endpoint)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erro ao buscar dados');
        setIsLoading(false);
      });
  }, [productId]);

  return { data, isLoading, error };
}
