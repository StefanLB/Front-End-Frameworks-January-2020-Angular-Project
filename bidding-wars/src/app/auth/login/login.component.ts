import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': [ '', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]]
    });
  }

  loginUser(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
