import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TDetalleVenta } from 'src/app/models/detalleVenta';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {

  constructor(private http:HttpClient) { }
  private url:string = "http://localhost:3000/detalleVenta";
  getDetalleVenta(){
    return this.http.get<TDetalleVenta[]>(this.url);
  }
  getDetalleVentaById(id:any){
    let url = this.url+"/"+ id;
    return this.http.get<TDetalleVenta>(url);
  }
  postDetalleVenta(tProducto:any){
    return this.http.post(this.url,tProducto);
  }
  putDetalleVenta(id:any,tProducto:any){//update
    let url = this.url+"/"+ id;
    return this.http.put(url,tProducto);
  }
  deleteDetalleVenta(id:any){
    let url = this.url+"/"+ id;
    return this.http.delete(url)
  }
}
