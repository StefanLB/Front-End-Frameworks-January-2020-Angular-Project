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
        Validators.required,
        Validators.minLength(6)
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
      'confirmPassword' : ['', [
      ]],
      'photoURL': ['', [
        Validators.required
      ]],
      'phoneNumber': [null, [
        Validators.required
      ]],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  noMatch() {
    if(this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value){
      this.registerForm.get('confirmPassword').setErrors({'incorrect': true})
    } else {
      this.registerForm.get('confirmPassword').setErrors(null);
    }
    return this.registerForm.get('password').value !== this.registerForm.get('confirmPassword').value;
  }

  createUser(){
    this.authService.createUser(this.registerForm.value);
  }
}
