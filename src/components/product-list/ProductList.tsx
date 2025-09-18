import React, { useEffect, useState } from 'react'
import './styles.css'
import { Link } from 'react-router-dom';
import apiClient from '../../services/api-client';
import {ProductListType, Product as ProductType } from '../../utils';
import Product from '../product/Product';
import useProducts from '../../hooks/useProducts';


export default function ProductList() {


  const { data: products, isLoading, error } = useProducts();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
  <div className='product-list-containner' id='product-list'>
    <h2 className='our-collection'>Our collection</h2>
    <div className='products-grid'>
      {(products as ProductType[]).map((product, index) => {
          return (
            <Link to={`/product/${product.id}`}>
              <Product
                key={index}
                product={product}
              />
            </Link>
          );
        })}
    </div>
    </div>
  )
}
