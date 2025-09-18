import { useEffect, useState } from 'react';
import apiClient from '../services/api-client';


type DataListBase<T> ={data:T[]}
type DataDetailsBase<T> = {data:T | null;}

type ApiDataBase= {
  isLoading: boolean;
  error: string;
};

type ApiDataList<T> = ApiDataBase & DataListBase<T>
type ApiDataDetails<T> = ApiDataBase & DataDetailsBase<T>



type UseApiListParams = { Apiroute: string;};
type DataId = { dataId: string;};

type UseApiDetailParams = UseApiListParams & DataId



export function useApiList<T>({
  Apiroute,
}:UseApiListParams): ApiDataList<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const endpoint = `/${Apiroute}/`;

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
  }, [Apiroute]);
  
 return { data, isLoading, error };
 
}



export function useApiDetails<T>({
  Apiroute,
  dataId
}:UseApiDetailParams): ApiDataDetails<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const endpoint =`${Apiroute}/${dataId}`

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
  }, [Apiroute,dataId]);
  
  return { data, isLoading, error };
}

