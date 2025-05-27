import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
 
import { Provider } from 'react-redux';
import store from './redux/store';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/en';

// Import dayjs configuration
import './configs/moment-config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <LocalizationProvider 
        dateAdapter={AdapterDayjs}
        adapterLocale="en"
        dateFormats={{ monthAndYear: "MM/YYYY" }}
        localeText={{
          okButtonLabel: "OK",
          cancelButtonLabel: "Cancel",
          clearButtonLabel: "Clear",
          todayButtonLabel: "Today",
        }}
        adapterLocaleData={{ timezone: 'Africa/Kigali' }}
      >
        <App />
      </LocalizationProvider>
    </BrowserRouter>
  </Provider>
);