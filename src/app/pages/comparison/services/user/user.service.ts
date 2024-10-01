import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IComparison } from '../../../../core/interface/IComparison';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private BASE_URL = `http://localhost:3000`;

  constructor(private http: HttpClient) { }

  get(): Observable<IComparison[]> {
    return this.http.get<IComparison[]>(`${this.BASE_URL}/user_list`).pipe(take(1));
  }
}
