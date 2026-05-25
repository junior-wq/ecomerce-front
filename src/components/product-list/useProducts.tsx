// import apiClient from "../../services/api-client";

// const useProducts = (category?: string, page: number = 1) => {
//   return useQuery({
//     queryKey: ['products', category, page],
//     queryFn: async () => {
//       const res = await apiClient.get('/products/', {
//         params: { category, page }
//       });
//       return res.data;
//     }
//   });
// };

// function useQuery(arg0: { queryKey: (string | number | undefined)[]; queryFn: () => Promise<any>; }) {
//     throw new Error("Function not implemented.");
// }
