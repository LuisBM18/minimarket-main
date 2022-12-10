import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductosComponent } from './pages/productos/productos.component';
import { DetalleProductosComponent } from './pages/detalle-productos/detalle-productos.component';
import { DetalleVentasComponent } from './pages/detalle-ventas/detalle-ventas.component';
import { ClientesComponent } from './pages/clientes/clientes.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    canActivate: [AuthGuard],
    path:'home',
    component:HomeComponent
  },
  {
    canActivate: [AuthGuard],
    path:'productos',
    component:ProductosComponent
  },
  {
    canActivate: [AuthGuard],
    path:'detalleProductos',
    component:DetalleProductosComponent
  },
  {
    canActivate:[AuthGuard],
    path:'detalleVentas',
    component:DetalleVentasComponent
  },
  {
    canActivate:[AuthGuard],
    path:'clientes',
    component:ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
