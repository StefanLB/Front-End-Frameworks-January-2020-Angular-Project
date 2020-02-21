import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: firebase.User;
  editProfileForm: FormGroup;


  constructor(
    private auth: AuthService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.updateProfileForm();

    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;

        this.editProfileForm.patchValue({
          userName: this.user.displayName,
          imageUrl: this.user.photoURL
        })
      });
  }

  updateProfileForm() {
    this.editProfileForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(6)]],
      imageUrl: ['', [Validators.required]]
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editProfileForm.controls[controlName].hasError(errorName);
  }

  logout() {
    this.auth.logout().then(() => {
        this.router.navigate(['/']);
      }
    );
  }

  updateProfile() {
    this.auth.updateUser({
      userName: this.editProfileForm.get('userName').value ? this.editProfileForm.get('userName').value : this.user.displayName,
      imageUrl: this.editProfileForm.get('imageUrl').value ? this.editProfileForm.get('imageUrl').value : this.user.photoURL
    });
  }
}
