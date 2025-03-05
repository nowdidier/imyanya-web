import httpRequest from '../utils/httpRequest';

const imyanyaService = {
  getFeedbacks: () => {
    const url = '/api/imyanya/web/feedbacks/';

    return httpRequest.get(url);
  },
  createFeedback: (data) => {
    const url = '/api/imyanya/web/feedbacks/';

    return httpRequest.post(url, data);
  },
  sendSMSDownloadApp: (data) => {
    const url = '/api/imyanya/web/sms-download-app/';

    return httpRequest.post(url, data);
  },
  getBanners: (params = {}) => {
    const url = '/api/imyanya/web/banner/';

    return httpRequest.get(url, { params: params });
  },
};

export default imyanyaService;
