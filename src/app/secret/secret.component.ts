import { Component, OnInit } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthenticationService } from './../services/authentication.service';
import { AuthenticationClient } from './../clients/authentication.client'; // Importe o AuthenticationClient

import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-secret',
  templateUrl: './secret.component.html',
  styleUrls: ['./secret.component.css'],
})
export class SecretComponent implements OnInit {
  
  constructor(
    private authenticationClient: AuthenticationClient, // Use o AuthenticationClient
    private authenticationService: AuthenticationService, // Use o AuthenticationClient
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authenticationService.logout(); // Chame o método logout() do AuthenticationClient
  }
  
  validateToken(): void {
    this.authenticationClient.validateToken().subscribe(
      () => {
        console.log('Sucesso');
        // Faça o que quiser aqui, como exibir uma mensagem na tela
      },
      error => {
        if (error.status === 200) {
          console.log('Sucesso');
          // Faça o que quiser aqui, como exibir uma mensagem na tela
        } else {
          console.error('Erro ao validar token:', error);
          // Lida com o erro, se necessário
        }
      }
    );
  }

  navigateTo(route: string): void {
    this.router.navigate([route]); // Navegue para a rota especificada
  }

  isAdmin(){
    return this.authenticationService.isAdmin();
  }

  isOperador(){
    return this.authenticationService.isOperador();
  }
}
