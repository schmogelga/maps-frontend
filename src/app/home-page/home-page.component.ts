import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router ) { }

  ngOnInit(): void {
  }

  navigateTo(route: string): void {
    window.open(route, '_blank'); // Abre a rota em uma nova guia
  }
  
  logout(): void {
    this.authenticationService.logout(); 
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }

  isOperador(){
    return this.authenticationService.isOperador();
  }
}
