import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonItem, DateConsumption, Session } from "../../../interface";

/**
 * @connect db.retrieveRouteine - cache
 * @description Load a daily routeine data
 * @param state
 * @param action {payload}
 */
const loadRecord = (
  state: DateConsumption,
  { payload }: PayloadAction<DateConsumption>
) => {
  return payload;
};

/**
 * @connect db.addItem
 * @description Add a new item to the state;
 * @param state
 * @param payload { field, data}
 */
const addNewItemToRecord = (
  state: DateConsumption,
  {
    payload: { field, data },
  }: PayloadAction<{
    field: Session;
    data: CommonItem;
  }>
) => {
  return {
    ...state,
    [field]: [...state[field], data],
  };
};

/**
 * @connect db.deleteItem
 * @description Remove a food from the state
 * @param state
 * @param action { field, id}
 * @returns new state
 */
const removeItemFromRecord = (
  state: DateConsumption,
  { payload: { field, id } }: PayloadAction<{ field: Session; id: string }>
) => {
  const new_field = [...state[field]];
  const index = new_field.findIndex((a) => a.id === id);
  if (index < 0) return;
  new_field.splice(index, 1);

  return {
    ...state,

    [field]: new_field,
  };
};

/**
 * @connect db.addWaterCup
 * @description Add the water cup to the state
 * @param state
 * @param action
 */
const addWaterCup: (state: DateConsumption, action: null) => DateConsumption = (
  state,
  any
) => {
  return {
    ...state,
    water: {
      cup_qty: state.water.cup_qty + 1,
      cup_size: state.water.cup_size,
    },
  };
};

const initialState: DateConsumption = {
  breakfast: [],
  second_breakfast: [],
  lunch: [],
  snack: [],
  dinner: [],
  dessert: [],
  extra: [],
  water: {
    cup_qty: null,
    cup_size: null,
  },
};

export const dateConsumptionSlice = createSlice({
  name: "date_consumption_slice",
  initialState,
  reducers: {
    loadRecord,
    addNewItemToRecord,
    removeItemFromRecord,

    addWaterCup,
  },
});

export default dateConsumptionSlice.reducer;
