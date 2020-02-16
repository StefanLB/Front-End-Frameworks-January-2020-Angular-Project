import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isExpanded = true;
  user: firebase.User;

  constructor(
    private auth: AuthService,
  ) { }

  @ViewChild('sidenav', {static: true}) sidenav: MatSidenav;

  ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user;
    });

    if (window.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.isExpanded = false;
    } else {
      this.sidenav.fixedTopGap = 55;
      this.isExpanded = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) {
      this.sidenav.fixedTopGap = 55;
      this.isExpanded = false;
    } else {
      this.sidenav.fixedTopGap = 55
      this.isExpanded = true;
    }
  }
}