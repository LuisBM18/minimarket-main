import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TCliente } from 'src/app/models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http:HttpClient) { }
  private url:string = "http://localhost:3000/clientes";
  getCliente(){
    return this.http.get<TCliente[]>(this.url);
  }
  getClienteById(id:any){
    let url = this.url+"/"+ id;
    return this.http.get<TCliente>(url);
  }
  postCliente(tProducto:any){
    return this.http.post(this.url,tProducto);
  }
  putCliente(id:any,tProducto:any){//update
    let url = this.url+"/"+ id;
    return this.http.put(url,tProducto);
  }
  deleteCliente(id:any){
    let url = this.url+"/"+ id;
    return this.http.delete(url)
  }
}
