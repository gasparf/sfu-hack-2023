import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Gender, Profile } from "../../../interface";

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
  calories_target: 5000,
  date_of_birth: {
    age: 0,
    value: "",
  },
  gender: Gender.other,
  height: 0,
  mass: 0,
  name: "",
  new_user: false,
  username: "",
  version: "",
};

export const profileSlice = createSlice({
  name: "profile_slice",
  initialState,
  reducers: { loadProfile, updateProfile },
});

export default profileSlice.reducer;
