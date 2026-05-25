import { Link } from 'react-router-dom'

import './styles.css'


export type BannerType={
  id?: number,
  image: string
  title: string,
  description: string
}



function Baner({image,title,description}:BannerType) {
  return (
       <div className='banner-container'>
        <div className='banner-container_left'>
          <p>{title}</p>

          <h1>{description}</h1>
          <Link  className='button button--primary' to={'/product-list'}>Shop now</Link>
        </div>

        <div className='banner-container_right'>
          
          <img src={image} className='image' alt="Model" />
        </div>
      </div> 
  )
}

export default Baner