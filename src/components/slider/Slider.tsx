import { useApiList } from '../../hooks/useApi'
import Baner from '../baner/Baner'
import './styles.css'
import  { useEffect, useRef, useState } from 'react'

export type BannerType = {
  id?: number,
  image: string
  title: string,
  description: string
}

const DURATION = 500;
const AUTO_DELAY = 3500;


function Slider() {
  const { data:slides, isLoading} = useApiList<BannerType>({ Apiroute: 'customize/banners' });

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


  if (isLoading ) {
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
            <Baner image={item.image} description={item.description} title={item.title}></Baner>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Slider;