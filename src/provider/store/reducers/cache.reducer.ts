import { Cache, CommonItem } from "../../../interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * @connect db.getFavourites - cache
 * @description Load the favourites list
 * @param state
 * @param payload {data}
 * @returns undefined
 */

const loadFavourites: (
  state: Cache,
  action: PayloadAction<Array<CommonItem>>
) => Cache = (state, { payload }) => {
  return {
    ...state,
    favourites: payload,
  };
};

/**
 * @connect db.addFavourite
 * @description Add a new item to state
 * @param state
 * @param payload {item}
 * @returns undefined
 */
const addFavouriteItem: (
  state: Cache,
  action: PayloadAction<CommonItem>
) => Cache = (state, { payload }) => {
  const favourites = [...state.favourites, payload];
  return {
    ...state,
    favourites,
  };
};

/**
 * @connect db.removeFavourite
 * @description Remove a favourite item from list
 * @param state
 * @param payload {food_name, calories}
 * @returns
 */
const removeFavouriteItem: (
  state: Cache,
  action: PayloadAction<{ food_name: string; calories: number }>
) => Cache = (state, { payload }) => {
  const favourites = [...state.favourites];
  const index = favourites.findIndex(
    (a) => a.food_name === payload.food_name && a.calories === payload.calories
  );
  if (index < 0) return;
  console.log(index);
  favourites.splice(index, 1);
  return {
    ...state,
    favourites,
  };
};

/**
 * @connect db.clearFavourites
 * @description Clear all the favourite list from the state
 */
const clearFavourites: (state: Cache, action: any) => Cache = (state, _) => ({
  ...state,
  favourites: [],
});

const initialState: Cache = {
  favourites: [],
  dateConsumptions: [],
};

export const cacheSlice = createSlice({
  name: "cache_slice",
  initialState,
  reducers: {
    loadFavourites,
    addFavouriteItem,
    removeFavouriteItem,
    clearFavourites,
  },
});

export default cacheSlice.reducer;
