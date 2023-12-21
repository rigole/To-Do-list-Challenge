import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService{

  private backendUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

    login(email:any, password:any):Observable<any>{
      return this.http.post(`${this.backendUrl}/api/signin/`, {email,password});
    }

    signup(name:any, email:any, password:any):Observable<any>{
      return this.http.post(`${this.backendUrl}/api/signup/`, {name,email,password});
    }
}
