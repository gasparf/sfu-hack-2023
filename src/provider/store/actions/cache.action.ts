import { RootDispatch, RootState } from "..";
import db from "@/global/db";
import { CommonItem } from "@/interface"; 
import { cacheSlice } from "../reducers/cache.reducer";

const AddFavouriteItem =
  (item: CommonItem) =>
  async (dispatch: RootDispatch, getState: () => RootState) => {
    try {
      await db.addFavourite(item);
      dispatch(cacheSlice.actions.addFavouriteItem(item));
    } catch (error) {
      console.log(error.message);
    }
  };

const RemoveFavouriteItem =
  (food_name: string, calories: number) =>
  async (dispatch: RootDispatch, getState: () => RootState) => {
    try {
      await db.removeFavourite(food_name, calories);

      dispatch(
        cacheSlice.actions.removeFavouriteItem({
          food_name,
          calories,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

export default {
  AddFavouriteItem,
  RemoveFavouriteItem,
};
