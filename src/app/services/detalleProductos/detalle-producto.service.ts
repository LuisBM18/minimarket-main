import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDetalleProducto } from 'src/app/models/detalleProducto';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  constructor(private http:HttpClient) { }
  private url:string = "http://localhost:3000/detalleProducto";
  getDetalleProducto(){
    return this.http.get<TDetalleProducto[]>(this.url);
  }
  getDetalleProductoById(id:any){
    let url = this.url+"/"+ id;
    return this.http.get<TDetalleProducto>(url);
  }
  postDetalleProducto(tProducto:any){
    return this.http.post(this.url,tProducto);
  }
  putDetalleProducto(id:any,tProducto:any){//update
    let url = this.url+"/"+ id;
    return this.http.put(url,tProducto);
  }
  deleteDetalleProducto(id:any){
    let url = this.url+"/"+ id;
    return this.http.delete(url)
  }
}
