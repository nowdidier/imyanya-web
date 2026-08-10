import { useEffect } from 'react';
import { SOCIAL_BAR_SRC } from './adConfig';
import useShouldShowAds from '../../hooks/useShouldShowAds';

const SocialBar = () => {
  const shouldShowAds = useShouldShowAds();

  useEffect(() => {
    if (!shouldShowAds) return;

    const script = document.createElement('script');
    script.src = SOCIAL_BAR_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [shouldShowAds]);

  return null;
};

export default SocialBar;