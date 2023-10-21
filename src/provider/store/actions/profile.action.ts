import { RootDispatch, RootState } from "..";
import db from "../../../global/db";
import { profileSlice } from "../reducers/profile.reducer";

const UpdateProfile =
  (update: any) =>
  async (dispatch: RootDispatch, getState: () => RootState) => {
    try {
      await db.updateProfile(update);
      dispatch(profileSlice.actions.updateProfile(update));
    } catch (error) {
      console.log(error.message);
    }
  };

export default {
  UpdateProfile,
};
