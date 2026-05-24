// // import { Link } from 'react-router-dom'
// import './styles.css'
// import React, { useEffect, useState } from 'react'

// import Baner from '../baner/Baner';
// import { useApiList } from '../../hooks/useApi';



// export type BannerType={
//   id?: number,
//   image: string
//   title: string,
//   description: string
// }



// // interface BannerProps{
// //   banners: BannerType [] 
// // }



// function Slider() {
//   const { data, isLoading } = useApiList<BannerType>({ Apiroute: 'customize/banners' });
//   const [list, setList] = useState<BannerType[]>([]);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isMoving, setIsMoving] = useState(false);

//   // Inicializa a lista quando os dados chegam da API
//   useEffect(() => {
//     if (data && data.length > 0) {
//       setList(data);
//     }
//   }, [data]);

//   const nextSlide = () => {
//     if (isMoving) return;
//     setIsMoving(true);

//     // 1. Move visualmente para a esquerda
//     setCurrentSlide(-100);

//     // 2. Após a animação, reordena o array e reseta a posição
//     setTimeout(() => {
//       setList((prev) => {
//         const [first, ...rest] = prev;
//         return [...rest, first];
//       });
//       setCurrentSlide(0);
//       setIsMoving(false);
//     }, 600); // 0.6s coincide com o tempo da transição
//   };

//   const prevSlide = () => {
//     if (isMoving) return;
//     setIsMoving(true);

//     // 1. Primeiro movemos o item no array (o último vira o primeiro)
//     setList((prev) => {
//       const last = prev[prev.length - 1];
//       const rest = prev.slice(0, -1);
//       return [last, ...rest];
//     });

//     // 2. Saltamos instantaneamente para -100% (sem transição)
//     // Isso prepara o item para "entrar" vindo da esquerda
//     setCurrentSlide(-100);

//     // 3. Pequeno delay para o React processar a mudança, depois desliza para 0
//     setTimeout(() => {
//       setCurrentSlide(0);
      
//       // Liberta o carrossel após o fim da animação
//       setTimeout(() => {
//         setIsMoving(false);
//       }, 600);
//     }, 50); 
//   };

//   if (isLoading || list.length === 0) return <div>Carregando...</div>;

//   return (
//     <div className='slider_main_container' style={{ overflow: 'hidden', position: 'relative' }}>
//       <div className='buttons-containner'>
//         <span onClick={prevSlide}>&larr;</span>
//         <span onClick={nextSlide}>&rarr;</span>
//       </div>

//       <div className='slider__container' style={{ position: 'relative', height: '100%', minHeight: '400px' }}>
//         {list.map((item, index) => (
//           <div
//             key={item.id || index}
//             style={{
//               position: 'absolute',
//               top: 0,
//               width: '100%',
//               left: 0,
//               // O segredo está aqui: index * 100 posiciona-os em fila
//               // currentSlide faz o movimento
//               transform: `translateX(${currentSlide + (index * 100)}%)`,
//               // Só aplica transição se estiver no meio de um movimento
//               transition: isMoving ? 'transform 0.6s ease' : 'none',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <Baner image={item.image} title={item.title} description={item.description} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Slider;






// import { useState, useEffect, useCallback } from 'react';
// import './styles.css';
// import Baner from '../baner/Baner';
// import { useApiList } from '../../hooks/useApi';

// export type BannerType = {
//   id?: number;
//   image: string;
//   title: string;
//   description: string;
// };

// function Slider() {
//   const { data, isLoading } = useApiList<BannerType>({ Apiroute: 'customize/banners' });
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false);

//   // Se não tiver dados, mostra loading
//   if (isLoading || !data?.length) {
//     return <div>Carregando banners...</div>;
//   }

//   const banners = data;
//   const totalSlides = banners.length;

//   const goToNext = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);
    
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 600);
//   }, [isAnimating, totalSlides]);

//   const goToPrev = useCallback(() => {
//     if (isAnimating) return;
//     setIsAnimating(true);
    
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    
//     setTimeout(() => {
//       setIsAnimating(false);
//     }, 600);
//   }, [isAnimating, totalSlides]);

//   // Auto-play (opcional)
//   useEffect(() => {
//     const interval = setInterval(goToNext, 5000);
//     return () => clearInterval(interval);
//   }, [goToNext]);

//   return (
//     <div className="slider_main_container">
//       <div className="slider__container">
//         <div 
//           className="slider__track"
//           style={{
//             transform: `translateX(-${currentSlide * 100}%)`,
//             transition: isAnimating ? 'transform 0.6s ease' : 'none',
//           }}
//         >
//           {banners.map((banner, index) => (
//             <div key={banner.id || index} className="slider__slide">
//               <Baner 
//                 image={banner.image} 
//                 title={banner.title} 
//                 description={banner.description} 
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="buttons-container">
//         <button onClick={goToPrev} className="slider__button">
//           ‹
//         </button>
//         <button onClick={goToNext} className="slider__button">
//           ›
//         </button>
//       </div>

//       {/* Indicadores/dots */}
//       <div className="slider__dots">
//         {banners.map((_, index) => (
//           <button
//             key={index}
//             className={`slider__dot ${index === currentSlide ? 'active' : ''}`}
//             onClick={() => {
//               if (isAnimating) return;
//               setIsAnimating(true);
//               setCurrentSlide(index);
//               setTimeout(() => setIsAnimating(false), 600);
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Slider;














import { useApiList } from '../../hooks/useApi'
import Baner from '../baner/Baner'
import './styles.css'
import React, { useEffect, useRef, useState } from 'react'

export type BannerType = {
  id?: number,
  image: string
  title: string,
  description: string
}

const DURATION = 500;
const AUTO_DELAY = 3500;

// ─── Banner substituto para teste ───────────────────────────────
const FAKE_DATA: BannerType[] = [
  { id: 1, image: '', title: 'Slide 1', description: 'Descrição do primeiro slide' },
  { id: 2, image: '', title: 'Slide 2', description: 'Descrição do segundo slide' },
  { id: 3, image: '', title: 'Slide 3', description: 'Descrição do terceiro slide' },
];

const COLORS = ['#4A90D9', '#E05C5C', '#5CB85C'];

function FakeBaner({ title, description, color }: { title: string; description: string; color: string }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: color,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    }}>
      <h2 style={{ color: '#fff', fontSize: 36, margin: 0 }}>{title}</h2>
      <p style={{ color: '#fff', fontSize: 18, margin: 0 }}>{description}</p>
    </div>
  );
}
// ────────────────────────────────────────────────────────────────

function Slider() {
  const { data, isLoading} = useApiList<BannerType>({ Apiroute: 'customize/banners' });
  const slides = data; // troca por: useApiList(...)
  const total = slides.length;

  // array com clones: [último, ...originais, primeiro]
  const cloned = [slides[total - 1], ...slides, slides[0]];

  const [pos, setPos] = useState(1);
  const [animated, setAnimated] = useState(false);
  const busyRef = useRef(false);
  const posRef = useRef(1);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function moveTo(nextPos: number, withAnim: boolean) {
    posRef.current = nextPos;
    setAnimated(withAnim);
    setPos(nextPos);
  }

  function goNext() {
    if (busyRef.current) return;
    busyRef.current = true;
    const next = posRef.current + 1;
    moveTo(next, true);
    setTimeout(() => {
      if (next >= cloned.length - 1) moveTo(1, false);
      busyRef.current = false;
    }, DURATION);
  }

  function goPrev() {
    if (busyRef.current) return;
    busyRef.current = true;
    const next = posRef.current - 1;
    moveTo(next, true);
    setTimeout(() => {
      if (next <= 0) moveTo(total, false);
      busyRef.current = false;
    }, DURATION);
  }

  function startAuto() {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(goNext, AUTO_DELAY);
  }




  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [isLoading]);

  const trackW = cloned.length * 100;
  const offset = (pos / cloned.length) * 100;


  if (isLoading || !data?.length) {
    return <div>Carregando banners...</div>;
  }



  return (
    <div className='slider_main_container'>
      <div className='buttons-containner'>
        <span onClick={() => { goPrev(); startAuto(); }}>&larr;</span>
        <span onClick={() => { goNext(); startAuto(); }}>&rarr;</span>
      </div>

      <div
        style={{
          display: 'flex',
          width: `${trackW}%`,
          height: '100%',
          transform: `translateX(-${offset}%)`,
          transition: animated ? `transform ${DURATION}ms ease` : 'none',
        }}
      >
        {cloned.map((item, index) => (
          <div
            key={index}
            style={{
              width: `${100 / cloned.length}%`,
              flexShrink: 0,
              height: '100%',
            }}
          >
            {/* <FakeBaner
              title={item.title}
              description={item.description}
              color={COLORS[(index - 1 + COLORS.length) % COLORS.length]}
            /> */}
            <Baner image={item.image} description={item.description} title={item.title}></Baner>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;