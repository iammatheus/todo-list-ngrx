import { Component } from '@angular/core';
import { IComparison } from '../../core/interface/IComparison';
import { MatListModule } from '@angular/material/list';
import { UserService } from './services/user/user.service';
import { CountryService } from './services/country/country.service';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './comparison.component.html',
  styleUrl: './comparison.component.scss'
})
export class ComparisonComponent {

  countryList: IComparison[] = [];
  userList: IComparison[] = [];

  constructor(
    private userService: UserService,
    private countryService: CountryService
  ) { }

  ngOnInit() {
    this.getUsers();
    this.getCountries();
  }

  getCountries() {
    this.countryService.get().subscribe({
      next: (res: IComparison[]) => {
        this.countryList = res;
      }
    })
  }

  getUsers() {
    this.userService.get().subscribe({
      next: (res: IComparison[]) => {
        this.userList = res;
      }
    })
  }
}
