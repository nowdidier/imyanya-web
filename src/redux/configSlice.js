import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import commonService from '../services/commonService';

const getAllConfig = createAsyncThunk(
  'config/getAllConfig',
  async () => {
    const resData = await commonService.getConfigs();

    return resData.data;
  },
);


export const configSlice = createSlice({
  name: 'config',
  initialState: {allConfig: null},
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllConfig.fulfilled, (state, action) => {
      state.allConfig = action.payload;
    });
  },
});

const {reducer} = configSlice;

export default reducer;
export {getAllConfig};
