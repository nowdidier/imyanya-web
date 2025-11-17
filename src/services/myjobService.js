

import httpRequest from '../utils/httpRequest';

const imyanyaService = {
  getFeedbacks: () => {
    const url = 'imyanya/web/feedbacks/';

    return httpRequest.get(url);
  },
  createFeedback: (data) => {
    const url = 'imyanya/web/feedbacks/';

    return httpRequest.post(url, data);
  },
  sendSMSDownloadApp: (data) => {
    const url = 'imyanya/web/sms-download-app/';

    return httpRequest.post(url, data);
  },
  getBanners: (params = {}) => {
    const url = 'imyanya/web/banner/';

    return httpRequest.get(url, { params: params });
  },
};

export default imyanyaService;
