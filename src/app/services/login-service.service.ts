import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http:HttpClient) { }
  login(usuario:string, contrasenia:string):Observable<any>{
    let body = {
      user:usuario,
      password:contrasenia
    }
    return this.http.post('http://localhost:3000/login',body)
  }
}
