import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TProducto } from 'src/app/models/producto';
import { ProductoServiceService } from 'src/app/services/producto-service.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit{
  AgregarProductos:boolean = false;
  productosFormulario:FormGroup = new FormGroup({})
  public listaProductos:TProducto[] = []
  indiceProducto:number = 0; 
  constructor(private formBuilder:FormBuilder, private productoService:ProductoServiceService) { 
    this.getProductos();
  }

  ngOnInit(): void {
    this.productosFormulario= this.formBuilder.group({
      CodProducto: ['',Validators.required], 
      NomProducto: ['',Validators.required],
      Descripcion: ['',Validators.required],
      Imagen: ['',Validators.required],
      Categoria: ['',Validators.required]
    })
  }
  productoVacioEditar:TProducto = {
    CodProducto: "",
    NomProducto: "",
    Descripcion: "",
    Imagen: "",
    Categoria:""
  }
  getProductos(){
    this.productoService.getProductos().subscribe((data: TProducto[])=> {
      this.listaProductos = data;
    })
  }
  irAgregarProductos(){
    this.AgregarProductos = true;
  }
  irListaProductos(){
    this.AgregarProductos = false;
  }
  agrearProductoFormulario(){
    if(this.productosFormulario.valid){
      const producto = {
        CodProducto: this.productosFormulario.value.CodProducto, 
        NomProducto: this.productosFormulario.value.NomProducto,
        Descripcion: this.productosFormulario.value.Descripcion,
        Imagen: this.productosFormulario.value.Imagen,
        Categoria:this.productosFormulario.value.Categoria
      }
      this.productoService.postProducto(producto).subscribe(data => {
        this.productoService.getProductos().subscribe(data => {
          this.listaProductos = data;
        })
        alert("Producto agregado!")
        this.productosFormulario.reset();
      })
    }
  }
  
  eliminarProducto(){
    let producto:TProducto = this.listaProductos[this.indiceProducto];
    this.productoService.deleteProducto(producto.CodProducto).subscribe(data => {
      if(data != "se elimino"){
        alert("el producto se esta usando y no se puede eliminar")
      }else{
        this.getProductos();
      }
      }
    )
  }
  capturarIndice(indice:number){
    this.indiceProducto = indice
  }
  capturarProductoEditar(i:number){
    this.indiceProducto = i
    let producto:TProducto = this.listaProductos[i]
    this.productoVacioEditar = producto
  }
  editarProducto(){
    let producto:TProducto = this.listaProductos[this.indiceProducto]
    this.productoVacioEditar = producto
    let productoModificado = {
      NomProducto: this.productoVacioEditar.NomProducto,
      Descripcion: this.productoVacioEditar.Descripcion,
      Imagen: this.productoVacioEditar.Imagen,
      Categoria: this.productoVacioEditar.Categoria,
    }
    this.productoService.putProducto(producto.CodProducto,productoModificado).subscribe(data => {
      if(data != "error"){
        this.getProductos();
      }else{
        alert("hubo un problema al actualizar datos")
      }
    })
  }
}
