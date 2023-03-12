import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FarmerDTO} from "../dto/FarmerDTO";
import {FarmerDTOS} from "../dto/FarmerDTOS";

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveFarmer(insuranceDTO: FarmerDTO): Observable<any>{
    return this.http.post(this.Url+'/farmer/registerFarmer', {
      farmer_name: insuranceDTO.farmer_name,
      farmer_password: insuranceDTO.farmer_password,
      farmer_contact: insuranceDTO.farmer_contact,
      farmer_image: insuranceDTO.farmer_image,
      fertilizer: insuranceDTO.fertilizer,
      status: insuranceDTO.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getAllFarmers(): Observable<any> {
    return this.http.get<any>(this.Url+'/farmer/searchAll', {
      headers:new HttpHeaders({

      })
    })
  }

  updateFarmer(farmerDTOS: FarmerDTOS): Observable<any> {
    return this.http.put(this.Url+'/farmer/updateFarmer', {
      farmer_id: farmerDTOS.farmer_id,
      farmer_name: farmerDTOS.farmer_name,
      farmer_contact: farmerDTOS.farmer_contact,
      farmer_image: farmerDTOS.farmer_image,
      farmer_password: farmerDTOS.farmer_password,
      fertilizer: farmerDTOS.fertilizer,
      status: farmerDTOS.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  deleteComponent(farmer_id:any) {
    return this.http.delete(this.Url+'/farmer/deleteFarmer/'+farmer_id, {
      headers:new HttpHeaders({


      })
    });
  }
}
