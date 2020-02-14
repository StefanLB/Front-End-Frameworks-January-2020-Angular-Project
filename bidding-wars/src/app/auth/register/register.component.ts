import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'userName': ['', [
        Validators.required
      ]],
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      'photoURL': ['', [
        Validators.required
      ]],
      'phoneNumber': [null, [
        Validators.required
      ]],
    });
  }

  createUser(){
    this.authService.createUser(this.registerForm.value);
  }
}
