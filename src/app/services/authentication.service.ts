import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'accessToken';
  private roleKey = 'userRoles';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe((response) => {
      const { accessToken, userRoles } = response;
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userRoles', userRoles);
  
      this.router.navigate(['/home']);
    });
  }

  public register(username: string, password: string, email: string, nome: string, roleId: string): void {
    this.authenticationClient.register(username, password, email, nome, roleId, "")
    .subscribe(
      (response) => {
        console.log('Registro realizado com sucesso!', response);
        this.login(username, password);
      },
      (error) => {
        console.error('Erro ao registrar usuário:', error);
      }
    );  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public userRoles(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.roleKey) : null;
  } 

  public isAdmin(): boolean | null {
    const roles: string | null = this.userRoles();
    return roles ? roles.includes('ADMIN') : null;
  }

  public isOperador(): boolean | null {
    const roles: string | null = this.userRoles();
    return roles ? roles.includes('OPERADOR') : null;
  }
}
