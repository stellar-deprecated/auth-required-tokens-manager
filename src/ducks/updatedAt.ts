import { createAction, createReducer } from "@reduxjs/toolkit";
import { getErrorString } from "helpers/getErrorString";
import { UpdatedAt } from "helpers/types";

export const Actions = {
  UPDATE_DATE: "UPDATE_DATE",
  SHOW_ERROR: "SHOW_ERROR",
  CLEAR_ERROR: "CLEAR_ERROR",
};

export const InitialState: UpdatedAt = { date: new Date(), errorMessage: null };

export const reducer = createReducer(InitialState, {
  [Actions.UPDATE_DATE]: () => {
    return { date: new Date(), errorMessage: null };
  },

  [Actions.SHOW_ERROR]: (state, action) => {
    return { ...state, errorMessage: getErrorString(action.payload) };
  },

  [Actions.CLEAR_ERROR]: (state) => {
    return { ...state, errorMessage: null };
  },
});

export const ActionCreators = {
  updateDate: createAction(Actions.UPDATE_DATE),
  showError: createAction<string>(Actions.SHOW_ERROR),
  clearError: createAction(Actions.CLEAR_ERROR),
};
