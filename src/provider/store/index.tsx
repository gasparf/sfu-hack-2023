import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import dateConsumptionReducer from "./reducers/dateConsumption.reducer";
import generalReducer from "./reducers/general.reducer";
import profileReducer from "./reducers/profile.reducer";
import cacheReducer from "./reducers/cache.reducer";

const store = configureStore({
  reducer: {
    dateConsumption: dateConsumptionReducer,
    profile: profileReducer,
    general: generalReducer,
    cache: cacheReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["profile.date_of_birth.value"],
        ignoredActionPaths: ["payload.date_of_birth.value"],
      },
    }),
  devTools: true,
});

export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootState: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export const withRoot = (Component, reducer) => {
  return (props) => {
    const state = useSelector<RootState>((state) => state[reducer]);
    const dispatch = useDispatch<RootDispatch>();

    return <Component {...props} state={state} dispatch={dispatch} />;
  };
};

export default store;
