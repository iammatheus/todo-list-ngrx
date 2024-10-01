import { createSelector } from "@ngrx/store";
import { IAppState } from "../app.state";
import { IComparison, IComparisonState } from "../../core/interface/IComparison";

export const selectUsers = (state: IAppState) => state.users;
export const selectContries = (state: IAppState) => state.countries;

export const selectUserList = createSelector(
  selectUsers,
  (state: IComparisonState) => state.data
);

export const selectContryList = createSelector(
  selectContries,
  (state: IComparisonState) => state.data
);
