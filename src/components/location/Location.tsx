import { useApi } from '../../hooks/useApi';
import Spiner from '../spiner/Spiner';
import './styles.css';
import { FiMapPin, FiPhone, FiMail, FiClock, FiNavigation } from 'react-icons/fi';


interface ContactSectionProps {
  latitude?: number;
  longitude?: number;
  address?: string;
  phone?: string;
  email?: string;
  storeName?: string;
}

// Dados hardcoded como fallback
const defaultData: ContactSectionProps = {
  latitude: -17.878, 
  longitude: 36.888,
  address: "Avenida dos Heróis, 123, Quelimane, Moçambique",
  phone: "+258 87 078 6266",
  email: "ola@novastore.com",
  storeName: "Nova Store"
};

const ContactSection = () => {
  const { data, error, isLoading } = useApi<ContactSectionProps>('customize/location');
  console.log(data)
  if (error) console.log(error)


  const contactData={
    email : data?.email || defaultData.email,
    phone : data?.phone || defaultData.phone,
    address : data?.address || defaultData.address,
    storeName : defaultData.storeName,
    latitude :data?.latitude || defaultData.latitude,
    longitude :data?.longitude ||  defaultData.longitude,
  }

  const {email,phone ,storeName,latitude,longitude,address }=contactData
  
  const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
  const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div className="contact">
      {/* Título centralizado */}
      <div className="contact__header">
        <h2 className="contact__title">Nos localize</h2>
      </div>
      
      <div className="contact__grid">
        {/* Informações com ícones */}
        <div className="contact__info">
          <div className="info__item">
            <div className="info__icon">
              <FiMapPin size={16} />
            </div>
            <div>
              <div className="info__label">Endereço</div>
              <div className="info__value">{address}</div>
            </div>
          </div>
          
          <div className="info__item">
            <div className="info__icon">
              <FiPhone size={16} />
            </div>
            <div>
              <div className="info__label">Telefone</div>
              <div className="info__value">
                <a href={`tel:${phone?.replace(/\s/g, '') || ''}`}>{phone}</a>
              </div>
            </div>
          </div>
          
          <div className="info__item">
            <div className="info__icon">
              <FiMail size={16} />
            </div>
            <div>
              <div className="info__label">Email</div>
              <div className="info__value">
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>
          </div>
          
          <div className="info__item">
            <div className="info__icon">
              <FiClock size={16} />
            </div>
            <div>
              <div className="info__label">Horário</div>
              <div className="hours">
                <div className="hours__row">
                  <span>Segunda – Sexta</span>
                  <span>09h – 18h</span>
                </div>
                <div className="hours__row">
                  <span>Sábado</span>
                  <span>09h – 13h</span>
                </div>
                <div className="hours__row closed">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mapa */}
        <div className="map">
          <div className="map__frame">
            <iframe 
              src={mapUrl}
              title={`Mapa de localização da ${storeName}`}
              loading="lazy"
              allowFullScreen
            />
          </div>
          <a 
            href={mapsLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="map__link"
          >
            <FiNavigation size={14} />
            Abrir no Google Maps
          </a>
        </div>
      </div>
      
    </div>
  );
};

export default ContactSection;