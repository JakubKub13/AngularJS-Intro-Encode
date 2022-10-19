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

  requestTokens(body: any) {
    return this.http.post("http://localhost:3000/request-voting-tokens", body);
  }

  getBalContractAddress(): Observable<any> {
    return this.http.get("http://localhost:3000/ballot-address");
  }

  mint(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/mint", body)
  }

  vote(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/vote", body)
  }

  delegate(body: any): Observable<any> {
    return this.http.post("http://localhost:3000/delegate", body)
  }

  checkVotingPower(address: any): Observable<any> {
    return this.http.get(`http://localhost:3000/vote-power?address=${address}`)
  }

}
