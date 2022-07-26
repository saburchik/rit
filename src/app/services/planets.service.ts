import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { IPlanet } from '../models/planet';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class PlanetsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getAllPlanets(): Observable<IPlanet[]> {
    return this.http
      .get<IPlanet[]>('https://swapi.dev/api/planets')
      .pipe(delay(2000), catchError(this.errorHandler.bind(this)));
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
