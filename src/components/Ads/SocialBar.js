import { useEffect } from 'react';
import { SOCIAL_BAR_SRC } from './adConfig';

const SocialBar = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = SOCIAL_BAR_SRC;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

export default SocialBar;