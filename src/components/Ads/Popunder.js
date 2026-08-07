import { useEffect } from 'react';
import { POPUNDER_SRC } from './adConfig';

const Popunder = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = POPUNDER_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default Popunder;