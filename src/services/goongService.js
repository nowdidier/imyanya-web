import httpRequest from '../utils/httpRequest';
import { AUTH_CONFIG } from '../configs/constants';

const buildGoongUrl = (path, params = {}) => {
  const url = new URL(`https://rsapi.goong.io${path}`);
  const searchParams = new URLSearchParams();

  searchParams.set('api_key', AUTH_CONFIG.GOONGAPI_KEY || '');
  searchParams.set('language', AUTH_CONFIG.GOONG_LANGUAGE || 'en');

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  });

  url.search = searchParams.toString();
  return url.toString();
};

const goongService = {
  getPlaces: (input) => {
    const url = buildGoongUrl('/Place/AutoComplete', {
      input,
      limit: 15,
    });

    return httpRequest.get(url);
  },
  getPlaceDetailByPlaceId: (id) => {
    const url = buildGoongUrl('/Place/Detail', {
      place_id: id,
    });

    return httpRequest.get(url);
  },
};

export default goongService;
