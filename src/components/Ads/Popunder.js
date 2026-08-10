import { useEffect } from 'react';
import { POPUNDER_SRC } from './adConfig';
import useShouldShowAds from '../../hooks/useShouldShowAds';

const Popunder = () => {
  const shouldShowAds = useShouldShowAds();

  useEffect(() => {
    if (!shouldShowAds) return;

    const script = document.createElement('script');
    script.src = POPUNDER_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [shouldShowAds]);

  return null;
};

export default Popunder;