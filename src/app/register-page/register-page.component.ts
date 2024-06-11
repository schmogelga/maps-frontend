import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    if (this.registerForm.valid) {
      this.authenticationService.register(
        this.registerForm.value.username,
        this.registerForm.value.password,
        this.registerForm.value.email,
        this.registerForm.value.nome,
        ""
      );
    }
  }
}
