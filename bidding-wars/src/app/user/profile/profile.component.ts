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
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    this.updateProfileForm();
  }

  updateProfileForm() {
    this.editProfileForm = this.fb.group({
      userName: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    })
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
    this.router.navigate(['/']);
  }
}
