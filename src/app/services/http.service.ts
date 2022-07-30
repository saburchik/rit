import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Planet } from '../models/planet';
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
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
