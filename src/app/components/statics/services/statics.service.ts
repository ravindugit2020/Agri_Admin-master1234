import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StaticsService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  Barpercentage(): Observable<any> {
    return this.http.get<any>(this.Url+'/farmer/countAll', {
      headers:new HttpHeaders({

      })
    })
  }

  Daughpercntage(): Observable<any> {
    return this.http.get<any>(this.Url+'/product/countAll', {
      headers:new HttpHeaders({

      })
    })
  }
}
