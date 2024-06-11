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
    this.router.navigate([route]); // Navegue para a rota especificada
  }

  logout(): void {
    this.authenticationService.logout(); // Chame o método logout() do AuthenticationClient
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }

  isOperador(){
    return this.authenticationService.isOperador();
  }
}
