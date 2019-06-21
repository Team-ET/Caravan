import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(public fb: FormBuilder) {
    this.loginForm = fb.group({
      loginFormEmailEx: ['', [Validators.required, Validators.email]],
      loginFormPasswordEx: ['', Validators.required],
    });
  }
}