import toastMessages from './toastMessages';

const errorHandling = (error, setError = null) => {
  const res = error.response;

  switch (res.status) {
    case 400:
      const errors = res.data?.errors;
      if ('errorMessage' in errors) {
        toastMessages.error(errors.errorMessage.join(' '));
      } else {
        setError && setError(errors);
      }
      break;
    case 403:
      toastMessages.error('You do not have permission, please go back!');
      break;
    default:
      toastMessages.error('An error occurred, please try again!');
  }
};

export default errorHandling;

