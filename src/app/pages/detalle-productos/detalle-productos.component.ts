import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TDetalleProducto } from 'src/app/models/detalleProducto';
import { DetalleProductoService } from 'src/app/services/detalleProductos/detalle-producto.service';
@Component({
  selector: 'app-detalle-productos',
  templateUrl: './detalle-productos.component.html',
  styleUrls: ['./detalle-productos.component.scss']
})
export class DetalleProductosComponent implements OnInit {

  AgregarDetalleProducto:boolean = false;
  detallesProductosFormulario:FormGroup = new FormGroup({})
  public listaDetalleProductos:TDetalleProducto[] = []
  indiceDetalleProducto:number = 0; 
  constructor(private formBuilder:FormBuilder, private detalleProductosService:DetalleProductoService) { 
    this.getDetalleProductos();
  }

  ngOnInit(): void {
    this.detallesProductosFormulario= this.formBuilder.group({
      CodDetalleProducto: ['',Validators.required], 
      CodProducto: ['',Validators.required],
      PrecioCompra: ['',Validators.required],
      PrecioVenta: ['',Validators.required],
      Stock: ['',Validators.required]
    })
  }
  detalleProductoVacioEditar:TDetalleProducto = {
    CodDetalleProducto:"", 
    CodProducto:"", 
    PrecioCompra:"",
    PrecioVenta:"", 
    Stock:""
  }
  getDetalleProductos(){
    this.detalleProductosService.getDetalleProducto().subscribe((data: TDetalleProducto[])=> {
      this.listaDetalleProductos = data;
    })
  }
  irAgregarDetalleProductos(){
    this.AgregarDetalleProducto = true;
  }
  irListaDetalleProductos(){
    this.AgregarDetalleProducto = false;
  }
  agregarDetalleProductoFormulario(){
    if(this.detallesProductosFormulario.valid){
      const detalleProducto = {
        CodDetalleProducto: this.detallesProductosFormulario.value.CodDetalleProducto, 
        CodProducto: this.detallesProductosFormulario.value.CodProducto,
        PrecioCompra: this.detallesProductosFormulario.value.PrecioCompra,
        PrecioVenta: this.detallesProductosFormulario.value.PrecioVenta,
        Stock:this.detallesProductosFormulario.value.Stock
      }
      this.detalleProductosService.postDetalleProducto(detalleProducto).subscribe(data => {
        if(data != 'error'){
          this.detalleProductosService.getDetalleProducto().subscribe(data => {
            this.listaDetalleProductos = data;
          })
          alert("Detalle agregado!")
          this.detallesProductosFormulario.reset();
        }
        else{
          alert("verifica que los datos ingresados sean los correctos")
        }
      })
    }
  }
  
  eliminarDetalleProducto(){
    let detalleProducto:TDetalleProducto = this.listaDetalleProductos[this.indiceDetalleProducto];
    this.detalleProductosService.deleteDetalleProducto(detalleProducto.CodDetalleProducto).subscribe(data => {
      if(data != "se elimino"){
        alert("detalle producto se esta usando y no se puede eliminar")
      }else{
        this.getDetalleProductos();
      }
      }
    )
  }
  capturarIndice(indice:number){
    this.indiceDetalleProducto = indice
  }
  capturarDetalleProductoEditar(i:number){
    this.indiceDetalleProducto = i
    let detalleProducto:TDetalleProducto = this.listaDetalleProductos[i]
    this.detalleProductoVacioEditar = detalleProducto
  }
  editarDetalleProducto(){
    let detalleProducto:TDetalleProducto = this.listaDetalleProductos[this.indiceDetalleProducto]
    this.detalleProductoVacioEditar = detalleProducto
    let detalleProductoModificado = {
      CodProducto: this.detalleProductoVacioEditar.CodProducto,
      PrecioCompra: this.detalleProductoVacioEditar.PrecioCompra,
      PrecioVenta: this.detalleProductoVacioEditar.PrecioVenta,
      Stock: this.detalleProductoVacioEditar.Stock,
    }
    this.detalleProductosService.putDetalleProducto(detalleProducto.CodDetalleProducto,detalleProductoModificado).subscribe(data => {
      if(data != "error"){
        this.getDetalleProductos();
      }else{
        alert("hubo un problema al actualizar datos")
      }
    })
  }

}
