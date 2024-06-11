import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<{ accessToken: string, userRoles: string }> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${credentials}`
    });

    return this.http.post<{ accessToken: string, userRoles: string }>(
      environment.apiUrl + '/login',
      {},
      { headers: headers }
    );
  }

  public register(username: string, password: string, email: string, nome: string, roleId: String, imagem: string): Observable<string> {
    const roleIdValue = roleId ? roleId : null;

    const payload = {
      username: username,
      password: password,
      email: email,
      nome: nome,
      roleId: roleIdValue,
      imagem: imagem
    };

    return this.http.post<string>(
      environment.apiUrl + '/register',
      payload
    );
  }

  public validateToken(): Observable<any> {
    return this.http.get(
      environment.apiUrl + '/validate'
    );
  }

  public getRoles(): Observable<any> {
    return this.http.get(environment.apiUrl + '/roles');
  }

  public getUsers(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/usuarios');
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/usuarios/${userId}`);
  }

  public updateUser(userId: string, username: string, email: string, nome: string, roleId: String, imagem: string): Observable<string> {
    const roleIdValue = roleId ? roleId : null;

    const payload = {
      username: username,
      email: email,
      nome: nome,
      roleId: roleIdValue,
      imagem: imagem
    };

    return this.http.patch<string>(
      environment.apiUrl + '/usuarios/' + userId,
      payload
    );
  }
}
