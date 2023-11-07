import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk(
  "type/getTypeList",
  async (_, action) => {
    const response = await getType();
    return response.data;
  },
);
const typeSlice = createSlice({
  name: "type",
  initialState: {
    typeList: [],
  },
  reducers: {},
  extraReducers: {
    [getTypeList.fulfilled]: (state, { payload }) => {
      state.typeList = payload;
    },
  },
});

export default typeSlice.reducer;
