import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TProducto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServiceService {

  constructor(private http:HttpClient) { }
  private url:string = "http://localhost:3000/productos";
  getProductos(){
    return this.http.get<TProducto[]>(this.url);
  }
  getProductoById(id:any){
    let url = this.url+"/"+ id;
    return this.http.get<TProducto>(url);
  }
  postProducto(tProducto:any){
    return this.http.post(this.url,tProducto);
  }
  putProducto(id:any,tProducto:any){//update
    let url = this.url+"/"+ id;
    return this.http.put(url,tProducto);
  }
  deleteProducto(id:any){
    let url = this.url+"/"+ id;
    return this.http.delete(url)
  }
}
