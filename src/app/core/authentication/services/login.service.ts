import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFiles(value: any): Observable<any> {
    return this.http.get<any>(this.Url+'/user/search/'+value, {
      headers:new HttpHeaders({

      })
    })
  }
}
