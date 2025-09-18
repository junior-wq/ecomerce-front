import { useState } from 'react';
import './styles.css';

interface ProductDetailProps {
  images: string[];
}

const ProductDetail = ({ images }: ProductDetailProps) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className='p-detail_left'>
      <div className='showcase'>
        <img src={mainImage} alt="Produto" />
      </div>
      <div className='showcase-options'>
        {images.map((image, index) => (
          <div
            onMouseEnter={() => setMainImage(image)}
            className="options-img-container"
            key={index}
          >
            <img src={image} alt={`Produto ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
