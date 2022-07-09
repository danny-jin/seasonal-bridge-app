import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
  
const initialState = {
  value: 0,
  status: 'idle',
  isCollapsed: true
};

export const bridgeSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleSidebar(state) {
      state.isCollapsed = !state.isCollapsed;
    }
  }
});

export const { toggleSidebar } = bridgeSlice.actions;

export const selectCount = (state) => state.counter.value;

export default bridgeSlice.reducer;
