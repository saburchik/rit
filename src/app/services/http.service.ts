import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, Observable, throwError } from 'rxjs'
import { environment as env } from 'src/environments/environment'
import { APIResponse, IPeople, IPlanet } from '../models/models'
import { ErrorService } from './error.service'

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  getPlanetList(): Observable<APIResponse<IPlanet>> {
    return this.http
      .get<APIResponse<IPlanet>>(`${env.BASE_URL}/planets`)
      .pipe(catchError(this.errorHandler.bind(this)))
  }
  getPlanetDetailsHttp(id: string): Observable<IPlanet> {
    return this.http
      .get<IPlanet>(`${env.BASE_URL}/planets/${id}`)
      .pipe(catchError(this.errorHandler.bind(this)))
  }
  getPeopleDetails(linkAPI: string): Observable<IPeople> {
    return this.http
      .get<IPeople>(linkAPI)
      .pipe(catchError(this.errorHandler.bind(this)))
  }
  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message)
    return throwError(() => error.message)
  }
}
