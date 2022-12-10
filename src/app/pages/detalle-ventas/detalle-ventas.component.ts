import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TDetalleVenta } from 'src/app/models/detalleVenta';
import { DetalleVentaService } from 'src/app/services/detalleVentas/detalle-venta.service';

@Component({
  selector: 'app-detalle-ventas',
  templateUrl: './detalle-ventas.component.html',
  styleUrls: ['./detalle-ventas.component.scss']
})
export class DetalleVentasComponent implements OnInit {

  AgregarDetalleVenta:boolean = false;
  detallesVentasFormulario:FormGroup = new FormGroup({})
  public listaDetalleVentas:TDetalleVenta[] = []
  indiceDetalleVenta:number = 0; 
  constructor(private formBuilder:FormBuilder, private detalleVentaService:DetalleVentaService) { 
    this.getDetalleVentas();
  }

  ngOnInit(): void {
    this.detallesVentasFormulario= this.formBuilder.group({
      CodDetalleVenta: ['',Validators.required], 
      CodVenta: ['',Validators.required],
      CodDetalleProducto: ['',Validators.required],
      Cantidad: ['',Validators.required],
      PrecioVenta: ['',Validators.required],
      Descuento:['',Validators.required]
    })
  }
  detalleVentaVacioEditar:TDetalleVenta = {
      CodDetalleVenta: "",
      CodVenta: "",
      CodDetalleProducto: "",
      Cantidad: "",
      PrecioVenta: "",
      Descuento:""
  }
  getDetalleVentas(){
    this.detalleVentaService.getDetalleVenta().subscribe((data: TDetalleVenta[])=> {
      this.listaDetalleVentas = data;
    })
  }
  irAgregarDetalleVentas(){
    this.AgregarDetalleVenta = true;
  }
  irListaDetalleVentas(){
    this.AgregarDetalleVenta = false;
  }
  agregarDetalleVentaFormulario(){
    if(this.detallesVentasFormulario.valid){
      const detalleVenta = {
        CodDetalleVenta: this.detallesVentasFormulario.value.CodDetalleVenta, 
        CodVenta: this.detallesVentasFormulario.value.CodVenta,
        CodDetalleProducto: this.detallesVentasFormulario.value.CodDetalleProducto,
        Cantidad: this.detallesVentasFormulario.value.Cantidad,
        PrecioVenta:this.detallesVentasFormulario.value.PrecioVenta,
        Descuento:this.detallesVentasFormulario.value.Descuento
      }
      this.detalleVentaService.postDetalleVenta(detalleVenta).subscribe(data => {
        if(data != 'error'){
          this.detalleVentaService.getDetalleVenta().subscribe(data => {
            this.listaDetalleVentas = data;
          })
          alert("Detalle agregado!")
          this.detallesVentasFormulario.reset();
        }
        else{
          alert("verifica que los datos ingresados sean los correctos")
        }
      })
    }
  }
  
  eliminarDetalleVenta(){
    let detalleVenta:TDetalleVenta = this.listaDetalleVentas[this.indiceDetalleVenta];
    this.detalleVentaService.deleteDetalleVenta(detalleVenta.CodDetalleProducto).subscribe(data => {
      if(data != "se elimino"){
        alert("detalle venta se esta usando y no se puede eliminar")
      }else{
        this.getDetalleVentas();
      }
      }
    )
  }
  capturarIndice(indice:number){
    this.indiceDetalleVenta = indice
  }
  capturarDetalleVentaEditar(i:number){
    this.indiceDetalleVenta = i
    let detalleVenta:TDetalleVenta = this.listaDetalleVentas[i]
    this.detalleVentaVacioEditar = detalleVenta
  }
  editarDetalleVenta(){
    let detalleVenta:TDetalleVenta = this.listaDetalleVentas[this.indiceDetalleVenta]
    this.detalleVentaVacioEditar = detalleVenta
    let detalleVentaModificado = {
      CodVenta: this.detalleVentaVacioEditar.CodVenta,
      CodDetalleProducto: this.detalleVentaVacioEditar.CodDetalleProducto,
      Cantidad: this.detalleVentaVacioEditar.Cantidad,
      PrecioVenta: this.detalleVentaVacioEditar.PrecioVenta,
      Descuento:this.detalleVentaVacioEditar.Descuento
    }
    this.detalleVentaService.putDetalleVenta(detalleVenta.CodDetalleProducto,detalleVentaModificado).subscribe(data => {
      if(data != "error"){
        this.getDetalleVentas();
      }else{
        alert("hubo un problema al actualizar datos")
      }
    })
  }

}
