import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';
import { Product } from '../utils';
import { ProductType } from '../interfaces/interfaces';

type UseProductsResult = {
  data: Product | Product[] | null;
  isLoading: boolean;
  error: string;
};


type CategoryType={title:string,id:string}

type ProductQueryParams={
  categoryId:number| undefined,
  search:string | undefined,
  page:number | undefined,
} 

export default function useProducts({categoryId,search,page}:ProductQueryParams,productId?: string): UseProductsResult {
  const [data, setData] = useState<Product | Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const endpoint = productId ? `/products/${productId}` : '/products/';

    apiClient
      .get(endpoint,{
        params: {
        category:categoryId,
        search,
        page
        }
    }

    )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Erro ao buscar dados');
        setIsLoading(false);
      });
  }, [productId,categoryId,search,page]);

  return { data, isLoading, error };
}






// import { useEffect, useState } from 'react';
// import apiClient from '../services/api-client';
// import { ProductType } from '../interfaces/interfaces';

type UseProductResult = {
  data: ProductType | null;
  isLoading: boolean;
  error: string;
};

export  function useProduct(productId?: string): UseProductResult {
  const [data, setData] = useState<ProductType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);

    apiClient
      .get(`/products/${productId}`)
      .then((res) => {
        setData(res.data);
        setError('');
      })
      .catch((err) => {
        setError(err.message || 'Erro ao buscar produto');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  return { data, isLoading, error };
}