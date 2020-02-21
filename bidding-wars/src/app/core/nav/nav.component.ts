import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  user: firebase.User;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user;
    });
  }

  login() {
    this.router.navigate(['/'])
  }

  logout(){
    this.auth.logout().then(() => {
        this.router.navigate(['/']);
      }
    );
  }

  register() {
    this.router.navigate(['/register'])
  }

}
