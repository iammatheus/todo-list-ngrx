import { Component } from '@angular/core';
import { IComparison } from '../../core/interface/IComparison';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { getCountryList, getUserList } from '../../store/actions/comparison.actions';
import { selectContryList, selectUserList } from '../../store/selectors/comparison.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-comparison-ngrx',
  standalone: true,
  imports: [MatListModule, AsyncPipe],
  templateUrl: './comparison-ngrx.component.html',
  styleUrl: './comparison-ngrx.component.scss'
})
export class ComparisonNgRxComponent {

  countryList$: Observable<IComparison[]> = new Observable();
  userList$: Observable<IComparison[]> = new Observable();

  constructor(private store: Store<IAppState>) { }

  ngOnInit() {
    this.getUsers();
    this.getCountries();

    this.userList$ = this.store.select(selectUserList);
    this.countryList$ = this.store.select(selectContryList);
  }

  getCountries() {
    this.store.dispatch(getCountryList());
  }

  getUsers(): any {
    this.store.dispatch(getUserList());
  }
}
