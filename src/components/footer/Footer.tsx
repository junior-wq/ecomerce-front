import React, { useEffect, useState } from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import apiClient from '../../services/api-client';
import { useApiList } from '../../hooks/useApi';



type ColumnItem = {
  id: number
  name: string
}

type FooterColumnType = {
  id?: number
  title: string
  footer_list_item: ColumnItem[]
}



const Footer = () => {

  const{data,error,isLoading}=useApiList<FooterColumnType>({Apiroute:'customize/footer'})


  if (isLoading) return <h1>Loading...</h1>

  return (
    <section className="footer-container">
      {data.map(column => (
        <FooterColumn key={column.id}
          title={column.title} 
          footer_list_item={column.footer_list_item} />
      ))}
    </section>
  )
}

export default Footer




const FooterColumn = ({ title,footer_list_item:items }: FooterColumnType) => {
  return (
    <div className="footer_colum">
      <h3>{title}</h3>
      {items.map(item => (
        <div key={item.id} >
          <Link to="#" >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  )
}
