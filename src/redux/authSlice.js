import { createSlice } from '@reduxjs/toolkit';

const VERIFY_EMAIL_STORAGE_KEY = 'imyanya_verify_email';

const getStoredVerifyEmailState = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedState = window.sessionStorage.getItem(VERIFY_EMAIL_STORAGE_KEY);
    return storedState ? JSON.parse(storedState) : null;
  } catch (error) {
    return null;
  }
};

const saveVerifyEmailState = (state) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(VERIFY_EMAIL_STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // Storage may be unavailable (private mode) — state stays in memory.
  }
};

const clearVerifyEmailState = () => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.removeItem(VERIFY_EMAIL_STORAGE_KEY);
  } catch (error) {
    // Storage may be unavailable (private mode) — nothing to clear.
  }
};

const storedVerifyEmailState = getStoredVerifyEmailState();

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAllowVerifyEmail: storedVerifyEmailState?.isAllowVerifyEmail || false,
    email: storedVerifyEmailState?.email || '',
    roleName: storedVerifyEmailState?.roleName || '',
  },
  reducers: {
    updateVerifyEmail: (state, action) => {
      state.isAllowVerifyEmail = action.payload?.isAllowVerifyEmail || false;
      state.email = action.payload?.email || '';
      state.roleName = action.payload?.roleName || '';

      if (state.isAllowVerifyEmail && state.email && state.roleName) {
        saveVerifyEmailState({
          isAllowVerifyEmail: state.isAllowVerifyEmail,
          email: state.email,
          roleName: state.roleName,
        });
      } else {
        clearVerifyEmailState();
      }
    },
  },
});

const { actions, reducer } = authSlice;
const { updateVerifyEmail } = actions;

export default reducer;
export { updateVerifyEmail };
