import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TVenta } from 'src/app/models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http:HttpClient) { }
  private url:string = "http://localhost:3000/venta";
  getVenta(){
    return this.http.get<TVenta[]>(this.url);
  }
  getVentaById(id:any){
    let url = this.url+"/"+ id;
    return this.http.get<TVenta>(url);
  }
  postVenta(tProducto:any){
    return this.http.post(this.url,tProducto);
  }
  putVenta(id:any,tProducto:any){//update
    let url = this.url+"/"+ id;
    return this.http.put(url,tProducto);
  }
  deleteVenta(id:any){
    let url = this.url+"/"+ id;
    return this.http.delete(url)
  }
}
