import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductsDTO} from "../dto/ProductsDTO";
import {ProductDTOS} from "../dto/ProductDTOS";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveProduct(productsDTO: ProductsDTO): Observable<any>{
    return this.http.post(this.Url+'/product/saveProduct', {
      farmer_name: productsDTO.farmer_name,
      farmer_contact: productsDTO.farmer_contact,
      product_title: productsDTO.product_title,
      product_desc: productsDTO.product_desc,
      product_img: productsDTO.product_img,
      product_price: productsDTO.product_price,
      fertilizer: productsDTO.fertilizer,
      status: productsDTO.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getAllProducts() : Observable<any> {
    return this.http.get<any>(this.Url+'/product/searchAll', {
      headers:new HttpHeaders({

      })
    })
  }

  deleteComponent(product_id:any): Observable<any> {
    return this.http.delete(this.Url+'/product/deleteProduct/'+product_id, {
      headers:new HttpHeaders({


      })
    });
  }

  updateProduct(productDTOS: ProductDTOS): Observable<any> {
    return this.http.put(this.Url+'/product/updateProduct', {
      product_id: productDTOS.product_id,
      product_title: productDTOS.product_title,
      product_desc: productDTOS.product_desc,
      product_img: productDTOS.product_img,
      product_price: productDTOS.product_price,
      fertilizer: productDTOS.fertilizer,
      farmer_name: productDTOS.farmer_name,
      farmer_contact: productDTOS.farmer_contact,
      status: productDTOS.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }
}
