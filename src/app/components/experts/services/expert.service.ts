import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ExpertDTO} from "../dto/ExpertDTO";
import {Observable} from "rxjs";
import {ExpertDTOS} from "../dto/ExpertDTOS";

@Injectable({
  providedIn: 'root'
})
export class ExpertService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  savePolice(insuranceDTO: ExpertDTO): Observable<any>{
    return this.http.post(this.Url+'/expert/registerExpert', {
      expert_name: insuranceDTO.expert_name,
      expert_password: insuranceDTO.expert_password,
      expert_title: insuranceDTO.expert_title,
      expert_desc: insuranceDTO.expert_desc,
      expert_contact: insuranceDTO.expert_contact,
      expert_mail: insuranceDTO.expert_mail,
      expert_img: insuranceDTO.expert_img,
      status: insuranceDTO.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getAllExperts(): Observable<any> {
    return this.http.get<any>(this.Url+'/expert/searchAll', {
      headers:new HttpHeaders({

      })
    })
  }


  updateExpert(expertDTOS: ExpertDTOS): Observable<any> {
    return this.http.put(this.Url+'/expert/updateExpert', {
      expert_id: expertDTOS.expert_id,
      expert_name: expertDTOS.expert_name,
      expert_password: expertDTOS.expert_password,
      expert_title: expertDTOS.expert_title,
      expert_desc: expertDTOS.expert_desc,
      expert_contact: expertDTOS.expert_contact,
      expert_mail: expertDTOS.expert_mail,
      expert_img: expertDTOS.expert_img,
      status: expertDTOS.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  deleteComponent(componetID: any) {
    return this.http.delete(this.Url+'/farmer/deleteExpert/'+componetID, {
      headers:new HttpHeaders({


      })
    });
  }
}
