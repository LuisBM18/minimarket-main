import { Component, OnInit} from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  miFormulario:FormGroup = new FormGroup({})
  texto:boolean = false
  constructor(private formBuilder:FormBuilder,private router:Router, private loginService:LoginServiceService) { }
  ngOnInit(): void {
    let token = sessionStorage.getItem('token')
    if(token){
      this.router.navigate(['home'])
    }
    this.miFormulario= this.formBuilder.group({
      user: ['',Validators.required], 
      password: ['',Validators.required],
    })
  }
  loginUsuario(){
    if(this.miFormulario.valid){
      this.loginService.login(this.miFormulario.value.user,this.miFormulario.value.password).subscribe(
        (response) => {
          if(response == "error"){
            this.texto = true
            setTimeout(() => {
              this.texto = false
            }, 2000);
          }
          if(response.token){
            this.texto = false
            sessionStorage.setItem('token',response.token)
            this.router.navigate(['home'])
          }
        }
      )
    }
  }
}
