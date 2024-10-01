import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../pages/comparison/services/user/user.service';
import { CountryService } from '../../pages/comparison/services/country/country.service';
import {
  getCountryList,
  getCountryListError,
  getCountryListSuccess,
  getUserList,
  getUserListError,
  getUserListSuccess,
} from '../actions/comparison.actions';
import { catchError, exhaustMap, filter, of, switchMap, withLatestFrom } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../app.state';
import { selectUserList } from '../selectors/comparison.selectors';

@Injectable()
export class ComparisonEffects {
  getUserList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserList.type),
      withLatestFrom(this.store.select(selectUserList)),
      filter(([_, data]) => data.length <= 0),
      switchMap(() =>
        this.userService.get().pipe(
          exhaustMap((data) => of(getUserListSuccess({ data }))),
          catchError((_error) =>
            of(getUserListError({ error: 'Error getting user list.' }))
          )
        )
      )
    )
  );

  getCountryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCountryList.type),
      exhaustMap(() =>
        this.countryService.get().pipe(
          exhaustMap((data) => of(getCountryListSuccess({ data }))),
          catchError((_error) =>
            of(getCountryListError({ error: 'Error getting country list.' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private countryService: CountryService,
    private store: Store<IAppState>
  ) { }
}
