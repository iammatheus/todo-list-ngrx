import { createReducer, on } from "@ngrx/store";
import { IComparisonState } from "../../core/interface/IComparison";
import { getCountryList, getCountryListError, getCountryListSuccess, getUserList, getUserListError, getUserListSuccess } from "../actions/comparison.actions";

const userState: IComparisonState = {
  data: [],
  loading: false,
  error: '',
};

const countryState: IComparisonState = {
  data: [],
  loading: false,
  error: '',
};


export const userReducer = createReducer(
  userState,
  on(getUserList, (state): IComparisonState => {
    return { ...state, loading: true };
  }),
  on(getUserListSuccess, (state, { data }): IComparisonState => {
    return { ...state, data, loading: false };
  }),
  on(getUserListError, (state, { error }): IComparisonState => {
    return { ...state, data: [], error, loading: false };
  })
)

export const countryReducer = createReducer(
  countryState,
  on(getCountryList, (state): IComparisonState => {
    return { ...state, loading: true };
  }),
  on(getCountryListSuccess, (state, { data }): IComparisonState => {
    return { ...state, data, loading: false };
  }),
  on(getCountryListError, (state, { error }): IComparisonState => {
    return { ...state, data: [], error, loading: false };
  })
)
