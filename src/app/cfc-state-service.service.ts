import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {StepFunction} from './step-function';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CfcStateServiceService {

  constructor(
    private http: HttpClient) {
  }

  getFunctions(): Observable<StepFunction[]> {
    return this.http.get<StepFunction[]>('http://119.81.195.201:8080/functions').pipe(
      tap(stepFunction => {
        return stepFunction;
      }),
      catchError(this.handleError('getFunctions', []))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

