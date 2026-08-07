let jobSeo = null;
const listeners = new Set();

export const setJobSeo = (data) => {
  jobSeo = data || null;
  listeners.forEach((listener) => listener());
};

export const getJobSeo = () => jobSeo;

export const subscribeJobSeo = (callback) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};