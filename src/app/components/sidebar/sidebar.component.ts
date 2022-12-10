import { Component, OnInit} from '@angular/core';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  token:String | null = null
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token') 
  }
  logout(){
    sessionStorage.removeItem('token') //eliminando token
    this.router.navigate(['login'])
  }
}
