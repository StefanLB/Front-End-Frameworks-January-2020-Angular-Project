import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../../user/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  registerForm: FormGroup;
  hide = true;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'userName': [this.user.userName, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      'photoURL': [this.user.photoURL, [
        Validators.required
      ]],
      'phoneNumber': [this.user.phoneNumber, [
        Validators.required
      ]],
    });
  }

  createUser(frm){
    this.authService.createUser(frm.value);
  }
}
