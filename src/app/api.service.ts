import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getContractAddress(): Observable<any> {
    return this.http.get("http://localhost:3000/token-address");
  }

  getTotalSupply(): Observable<any> {
    return this.http.get("http://localhost:3000/total-supply");
  }
}
