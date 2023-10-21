import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * @description Show the splash screen while the new date data is loading
 * @param state
 * @param action {payload(boolean)}
 */
const newRecordLoading = (
  state: General,
  { payload }: PayloadAction<boolean>
) => {
  return {
    ...state,
    new_app_loading: payload,
  };
};

/**
 * @description Set the app date
 * @param state
 * @param date
 */
const setAppRecord = (state: General, { payload }: PayloadAction<string>) => ({
  ...state,
  app_date: payload,
});

interface General {
  new_app_loading: boolean;
  app_date: Date | string | number;
}

const initialState: General = {
  new_app_loading: false,
  app_date: null,
};

export const generalSlice = createSlice({
  name: "general_slice",
  initialState,
  reducers: { newRecordLoading, setAppRecord },
});

export default generalSlice.reducer;
