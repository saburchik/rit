import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, People, Planet } from '../models/planet';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getPlanetList(): Observable<APIResponse<Planet>> {
    return this.http
      .get<APIResponse<Planet>>(`${env.BASE_URL}/planets`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }
  getPlanetDetails(id: string): Observable<Planet> {
    return this.http
      .get<any>(`${env.BASE_URL}/planets/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)));
  }
  getPeopleDetails(people: Array<string>): any {
    console.log(people);

    for (let i = 0; i > people.length; i++) {
      console.log(people[i]);

      this.http.get<any>(people[i]);
    }
    return;
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
