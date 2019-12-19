import { Injectable } from "@angular/core";
import { Toast, EmitterService } from "../shared";
import { HttpClient } from '@angular/common/http';


import { Observable, Subject, of } from "rxjs";
import {
  map,
  catchError
} from "rxjs/operators";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  API_URL: string = environment['answerURL']

  private userName: string = '';

  constructor(
    private http: HttpClient) {
    //EmitterService.registerCommand(this, "ImportCase", this.onImportCase);
    //EmitterService.processCommands(this);
  }

  setUser(name: string) {
    this.userName = name;
    return this;
  }

  getUser() {
    return this.userName;
  }


  public get postAnswer$(): (data: any) => Observable<any> {

    if (environment.featureflags.answerservice) {
      console.log('using _postAnswer$MOCK')
      return this._postAnswer$MOCK;
    }
    return this._postAnswer$;
  }

  private _postAnswer$MOCK(data: any): Observable<any> {
    let sub = new Subject()
    let result = "testing"
    setTimeout(() => {
      sub.next(result)
    }, 100);
    return sub
  }

  public _postAnswer$(data: any): Observable<any> {
    this.API_URL = environment['answerURL'];
    const url = `${this.API_URL}`;
    return this.http.post(url, data).pipe(
      map(res => {
       // Toast.success(`${res}`, url);
        //if (res.hasOwnProperty('payload')) {
          return res;
        //}
        //throw new Error('missing payload')
      }),
      catchError(error => {
        const msg = JSON.stringify(error, undefined, 3);
        Toast.error(error.message, url);
        return of<any>();
      })
    );

  }

}
