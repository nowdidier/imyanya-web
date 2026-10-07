let companySeo = null;
const listeners = new Set();

export const setCompanySeo = (data) => {
  companySeo = data || null;
  listeners.forEach((listener) => listener());
};

export const getCompanySeo = () => companySeo;

export const subscribeCompanySeo = (callback) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};
