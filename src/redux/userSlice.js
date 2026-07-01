import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../services/authService';
import tokenService from '../services/tokenService';

const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async () => {
    const resData = await authService.getUserInfo();

    return resData.data;
  }
);

const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async (data) => {
    const resData = await authService.updateUser(data);

    return resData.data;
  }
);

const removeUserInfo = createAsyncThunk(
  'user/removeUserInfo',
  async (data) => {
    /**
     * Khong revoktoken
     * RevokToken -> token app -> chet theo
     */
    try {
      if (data?.accessToken && data?.backend) {
        await authService.revokeToken(data.accessToken, data.backend);
      }
    } catch (error) {
      // Logout should still continue locally even if the token revoke call fails.
      console.warn('Failed to revoke auth token during logout', error);
    }

    const removeResult =
      tokenService.removeAccessTokenAndRefreshTokenFromCookie();

    if (!removeResult) {
      throw new Error("Can't remove token in Cookie");
    }
  }
);

const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (formData) => {
    const resData = await authService.updateAvatar(formData);

    return resData.data;
  }
);

const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async () => {
    const resData = await authService.deleteAvatar();

    return resData.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated =true;
      state.currentUser = action.payload;
    });

    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated =true;
      state.currentUser = action.payload;
    });

    builder.addCase(removeUserInfo.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatarUrl: action.payload?.avatarUrl || null,
        },
      };
    });

    builder.addCase(deleteAvatar.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        avatarUrl: action.payload?.avatarUrl || null,
      };
    });
  },
});

const { reducer } = userSlice;

export default reducer;
export {
  getUserInfo,
  updateUserInfo,
  removeUserInfo,
  updateAvatar,
  deleteAvatar,
};
