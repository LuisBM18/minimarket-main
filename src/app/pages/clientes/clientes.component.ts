import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TCliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  AgregarClientes:boolean = false;
  clientesFormulario:FormGroup = new FormGroup({})
  public listaClientes:TCliente[] = []
  indiceCliente:number = 0; 
  constructor(private formBuilder:FormBuilder, private clienteService:ClientesService) { 
    this.getClientes();
  }

  ngOnInit(): void {
    this.clientesFormulario= this.formBuilder.group({ 
      CodCliente:['',Validators.required],
      NomCliente:['',Validators.required],
      ApellidosCliente:['',Validators.required],
      SexoCliente:['',Validators.required],
      FechaNacimientoCliente:['',Validators.required],
      TipoDocCliente:['',Validators.required],
      NumDocCliente:['',Validators.required],
      DireccionCliente:['',Validators.required],
      TelefonoCliente:['',Validators.required],
      EmailCliente:['',Validators.required],
    })
  }
  clienteVacioEditar:TCliente = {
    CodCliente:"", 
	  NomCliente:"",
	  ApellidosCliente:"",
	  SexoCliente:"",
	  FechaNacimientoCliente:"", 
	  TipoDocCliente:"",
	  NumDocCliente:"",
	  DireccionCliente:"",
	  TelefonoCliente:"",
	  EmailCliente:""
  }
  getClientes(){
    this.clienteService.getCliente().subscribe((data: TCliente[])=> {
      this.listaClientes = data;
    })
  }
  irAgregarClientes(){
    this.AgregarClientes = true;
  }
  irListaClientes(){
    this.AgregarClientes = false;
  }
  agregarClienteFormulario(){
    if(this.clientesFormulario.valid){
      const cliente = {
        CodCliente:this.clientesFormulario.value.CodCliente,
	      NomCliente:this.clientesFormulario.value.NomCliente,
	      ApellidosCliente:this.clientesFormulario.value.ApellidosCliente,
	      SexoCliente:this.clientesFormulario.value.SexoCliente,
	      FechaNacimientoCliente:this.clientesFormulario.value.FechaNacimientoCliente,
	      TipoDocCliente:this.clientesFormulario.value.TipoDocCliente,
	      NumDocCliente:this.clientesFormulario.value.NumDocCliente,
	      DireccionCliente:this.clientesFormulario.value.DireccionCliente,
	      TelefonoCliente:this.clientesFormulario.value.TelefonoCliente,
	      EmailCliente:this.clientesFormulario.value.EmailCliente
      }
      this.clienteService.postCliente(cliente).subscribe(data => {
        this.clienteService.getCliente().subscribe(data => {
          this.listaClientes = data;
        })
        alert("Cliente agregado!")
        this.clientesFormulario.reset();
      })
    }
  }
  
  eliminarCliente(){
    let cliente:TCliente = this.listaClientes[this.indiceCliente];
    this.clienteService.deleteCliente(cliente.CodCliente).subscribe(data => {
      if(data != "se elimino cliente"){
        alert("el cliente se esta usando y no se puede eliminar")
      }else{
        this.getClientes();
      }
      }
    )
  }
  capturarIndice(indice:number){
    this.indiceCliente = indice
  }
  capturarClienteEditar(i:number){
    this.indiceCliente = i
    let cliente:TCliente = this.listaClientes[i]
    this.clienteVacioEditar = cliente
  }
  editarCliente(){
    let CLIENTE:TCliente= this.listaClientes[this.indiceCliente]
    this.clienteVacioEditar = CLIENTE
    let clienteModificado = {
      CodCliente:this.clienteVacioEditar.CodCliente,
	    NomCliente:this.clienteVacioEditar.NomCliente,
	    ApellidosCliente:this.clienteVacioEditar.ApellidosCliente,
	    SexoCliente:this.clienteVacioEditar.SexoCliente,
	    FechaNacimientoCliente:this.clienteVacioEditar.FechaNacimientoCliente,
	    TipoDocCliente:this.clienteVacioEditar.TipoDocCliente,
	    NumDocCliente:this.clienteVacioEditar.NumDocCliente,
	    DireccionCliente:this.clienteVacioEditar.DireccionCliente,
	    TelefonoCliente:this.clienteVacioEditar.TelefonoCliente,
	    EmailCliente:this.clienteVacioEditar.EmailCliente
    }
    this.clienteService.putCliente(CLIENTE.CodCliente,clienteModificado).subscribe(data => {
      if(data != "error"){
        this.getClientes();
      }else{
        alert("hubo un problema al actualizar datos")
      }
    })
  }
}
