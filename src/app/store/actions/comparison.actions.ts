import { createAction, props } from "@ngrx/store";
import { IComparison } from "../../core/interface/IComparison";

export const getUserList = createAction('[USERS] GET');
export const getUserListSuccess = createAction('[USERS] GET SUCCESS', props<{ data: IComparison[] }>());
export const getUserListError = createAction('[USERS] GET ERROR', props<{ error: string }>());

export const getCountryList = createAction('[COUNTRIES] GET');
export const getCountryListSuccess = createAction('[COUNTRIES] GET SUCCESS', props<{ data: IComparison[] }>());
export const getCountryListError = createAction('[COUNTRIES] GET ERROR', props<{ error: string }>());
