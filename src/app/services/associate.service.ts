import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Associate } from '../Store/Model/Associate.model';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
baseUrl:string = 'http://localhost:3000/associate';
  constructor(private http:HttpClient) { }

  GetAll() {
    return this. http.get<Associate[]>(this.baseUrl);
  }
  Getbycode(code:number) {
    return this.http.get<Associate>(this.baseUrl+'/'+code);
  }
  Delete(code:number) {
    return this.http.delete(this.baseUrl+'/'+code);
  }
  Update(data: Associate) {
    return this.http.put<Associate>(this.baseUrl+'/'+data.id,data);
  }
  Create(data: Associate) {
    return this.http.post<Associate>(this.baseUrl,data);
  }
}
