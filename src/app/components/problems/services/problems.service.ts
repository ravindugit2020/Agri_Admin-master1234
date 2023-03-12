import { Injectable } from '@angular/core';
import {ProblemsDTO} from "../dto/ProblemsDTO";
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentDTO} from "../dto/CommentDTO";

@Injectable({
  providedIn: 'root'
})
export class ProblemsService {

  Url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  saveProblem(problemsDTO: ProblemsDTO): Observable<any>{
    return this.http.post(this.Url+'/problem/saveProblem', {
      farmer_name: problemsDTO.farmer_name,
      farmer_image: problemsDTO.farmer_image,
      problem_title: problemsDTO.problem_title,
      problem_desc: problemsDTO.problem_desc,
      status: problemsDTO.status,
      headers:new HttpHeaders({

        // 'Authorization': 'Bearer ' + JSON.parse(this.cookieService.get('token')),
      })
    })
  }

  getProblemDetails(): Observable<any> {
    // this.cookieValues = JSON.parse(this.cookieService.get('Arr'));
    return this.http.get<any>(this.Url+'/problem/searchAll', {
      headers:new HttpHeaders({

      })
    })
  }

  getAllComments(accident_Id: any):Observable<any>  {
    return this.http.get<any>(this.Url+'/comment/getAllComments/'+accident_Id, {
      headers:new HttpHeaders({

      })
    })
  }

  addComment(commentDTO: CommentDTO):Observable<any>  {
    return this.http.post(this.Url+'/comment/AddComment', {
      comment_desc: commentDTO.comment_desc,
      status: commentDTO.status,
      expert_name: commentDTO.expert_name,
      expert_img: commentDTO.expert_img,
      problem_id: commentDTO.problem_id,
      headers:new HttpHeaders({

      })
    })
  }

  deleteComponent(problem_id: any):Observable<any>  {
    return this.http.delete(this.Url+'/problem/deleteProblem/'+problem_id, {
      headers:new HttpHeaders({


      })
    });
  }
}
