import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TVenta } from 'src/app/models/venta';
import { VentasService } from 'src/app/services/ventas/ventas.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  AgregarVenta:boolean = false;
  ventasFormulario:FormGroup = new FormGroup({})
  public listaVentas:TVenta[] = []
  indiceVenta:number = 0; 
  constructor(private formBuilder:FormBuilder, private ventaService:VentasService) { 
    this.getVentas();
  }

  ngOnInit(): void {
    this.ventasFormulario= this.formBuilder.group({
      CodVenta: ['',Validators.required], 
      CodCliente: ['',Validators.required],
      CodTrabajador: ['',Validators.required],
      Fecha: ['',Validators.required],
      TipoComprobante: ['',Validators.required]
    })
  }
  ventaVacioEditar:TVenta = {
    CodVenta: "", 
    CodCliente: "", 
    CodTrabajador: "", 
    Fecha: "", 
    TipoComprobante: ""
  }
  getVentas(){
    this.ventaService.getVenta().subscribe((data: TVenta[])=> {
      this.listaVentas = data;
    })
  }
  irAgregarVentas(){
    this.AgregarVenta = true;
  }
  irListaVentas(){
    this.AgregarVenta = false;
  }
  agregarVentaFormulario(){
    if(this.ventasFormulario.valid){
      const venta = {
        CodVenta: this.ventasFormulario.value.CodVenta, 
        CodCliente: this.ventasFormulario.value.CodCliente,
        CodTrabajador: this.ventasFormulario.value.CodTrabajador,
        Fecha: this.ventasFormulario.value.Fecha,
        TipoComprobante:this.ventasFormulario.value.TipoComprobante
      }
      this.ventaService.postVenta(venta).subscribe(data => {
        if(data != 'error'){
          this.ventaService.getVenta().subscribe(data => {
            this.listaVentas = data;
          })
          alert("Venta agregado!")
          this.ventasFormulario.reset();
        }
        else{
          alert("verifica que los datos ingresados sean los correctos")
        }
      })
    }
  }
  
  eliminarVenta(){
    let producto:TVenta = this.listaVentas[this.indiceVenta];
    this.ventaService.deleteVenta(producto.CodVenta).subscribe(data => {
      if(data != "se elimino"){
        alert("La venta se esta usando y no se puede eliminar")
      }else{
        this.getVentas();
      }
      }
    )
  }
  capturarIndice(indice:number){
    this.indiceVenta = indice
  }
  capturarVentaEditar(i:number){
    this.indiceVenta = i
    let venta:TVenta = this.listaVentas[i]
    this.ventaVacioEditar = venta
  }
  editarVenta(){
    let venta:TVenta = this.listaVentas[this.indiceVenta]
    this.ventaVacioEditar = venta
    let ventaModificado = {
      CodCliente: this.ventaVacioEditar.CodCliente,
      CodTrabajador: this.ventaVacioEditar.CodTrabajador,
      Fecha: this.ventaVacioEditar.Fecha,
      TipoComprobante: this.ventaVacioEditar.TipoComprobante,
    }
    this.ventaService.putVenta(venta.CodVenta,ventaModificado).subscribe(data => {
      if(data != "error"){
        this.getVentas();
      }else{
        alert("hubo un problema al actualizar datos")
      }
    })
  }

}
