// import React, { useState } from 'react';
// import './styles.css';
// import { Link } from 'react-router-dom';

// import Product from '../product/Product';
// import useProducts from '../../hooks/useProducts';
// import { Filters } from '../product-filters/product-filters';
// import Pagination from '../pagination/pagination';
// import { useApiList } from '../../hooks/useApi';
// import { ProductType } from '../../interfaces/interfaces';
// import { useSearchContext } from '../../state-management/cart-store/context/SearchContext';
// import Spiner from '../spiner/spiner';


// type CategoryType = {
//   id: number;
//   title: string;
// };


// export default function ProductList() {
//   const { data: categories } = useApiList<CategoryType>({
//     Apiroute: 'product-categories',
//   });

//   const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
//   const [page, setPage] = useState(1);

//   const{searchQuery}=useSearchContext();

//   const {
//     data: products,
//     isLoading,
//     error,
//   } = useProducts({
//     categoryId,
//     search:searchQuery,
//     page,
//   });

//   if (isLoading) return <div style={{display:'flex',height:'100vh',alignItems:'center',justifyContent:'center'}}><Spiner></Spiner></div>;
//   if (error) return <p>Erro: {error}</p>;

//   return (
//     <div className="product-list-containner">
//       <h2 className="our-collection">Our collection</h2>

//       <Filters
//         categories={categories || []}
//         selectedCategory={categoryId}
//         onSelect={(cat: CategoryType | null) => {
//           setCategoryId(cat ? cat.id : undefined);
//           setPage(1);
//         }}
//       />
      
//       <div className="products-grid">
//         {products.map((product:ProductType) => (
//           <Link to={`/product/${product.id}`} key={product.id}>
//             <Product product={product} />
//           </Link>
//         ))}
//       </div>

      
//       <Pagination
//         page={page}
//         totalPages={5} // depois vem do backend
//         onPageChange={setPage}
//       />
//     </div>
//   );
// }



import React, { useState, useCallback } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import Product from '../product/Product';
import useProducts from '../../hooks/useProducts';
import { Filters } from '../product-filters/product-filters';
import Pagination from '../pagination/pagination';
import { useApiList } from '../../hooks/useApi';
import { ProductType } from '../../interfaces/interfaces';
import { useSearchContext } from '../../state-management/cart-store/context/SearchContext';
// import Spiner from '../spiner/spiner';

type CategoryType = {
  id: number;
  title: string;
};

export default function ProductList() {
  const { data: categories } = useApiList<CategoryType>({
    Apiroute: 'product-categories',
  });

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  const { searchQuery } = useSearchContext();

  const {
    data: products = [],
    isLoading,
    error,
  } = useProducts({
    categoryId,
    search: searchQuery,
    page,
  });

  // 🔥 evita recriação da função
  const handleCategorySelect = useCallback((cat: CategoryType | null) => {
    setCategoryId(cat ? cat.id : undefined);
    setPage(1);
  }, []);

  if (error) return <p>Erro: {error}</p>;

  return (
    <div id="products"  className="product-list-containner">
      <h2 className="our-collection">Our collection</h2>

      <Filters
        categories={categories || []}
        selectedCategory={categoryId}
        onSelect={handleCategorySelect}
      />
{/* style={{ display: 'flex', justifyContent: 'center', width: '100%', background:'red',flex:1,minHeight:'100vh' }} */}
      <div  className="products-grid">
        {isLoading ? (
          <div style={{display: 'flex', justifyContent: 'center',alignItems:'center'}}  >
            {/* <Spiner /> */}<p>Carregando...</p>
          </div>
        ) : (
          products.map((product: ProductType) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          ))
        )}
      </div>

      <Pagination
        page={page}
        totalPages={5} // depois liga ao backend
        onPageChange={setPage}
      />
    </div>
  );
}