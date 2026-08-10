import { useSelector } from 'react-redux';

function useShouldShowAds() {
  const { isAuthenticated = false } = useSelector((state) => state.user || {});

  return !isAuthenticated;
}

export default useShouldShowAds;
