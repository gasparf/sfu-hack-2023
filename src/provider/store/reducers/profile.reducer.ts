import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Profile } from "../../../interface";

/**
 * @connect db.getProfile - cache
 * @param state Profile
 * @param payload Initialdata
 */
const loadProfile = (state: Profile, { payload }: PayloadAction<Profile>) =>
  payload;

/**
 * @connet db.updateProfile
 * @param state Profile
 * @param param1 New profile field value
 */
const updateProfile = (state: Profile, { payload }: PayloadAction<any>) => ({
  ...state,
  ...payload,
});

const initialState: Profile = {
  calories_target: null,
  date_of_birth: {
    age: null,
    value: null,
  },
  gender: null,
  height: null,
  mass: null,
  name: null,
  new_user: null,
  username: null,
  version: null,
};

export const profileSlice = createSlice({
  name: "profile_slice",
  initialState,
  reducers: { loadProfile, updateProfile },
});

export default profileSlice.reducer;
