import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router,
    private snackBar: MatSnackBar

  ) { }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/bids']);
        }
      }).catch(err => {
        this.snackBar.open('Incorrect Email or Password!', 'Dismiss', { duration: 5000 });
      });
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then(() => {
        this.router.navigate(['/bids']);
      }).catch(() => {
        this.snackBar.open('Error Logging in!', 'Dismiss', { duration: 5000 });
      })
  }

  logout() {
    return this.afAuth.auth.signOut().then(() => {
      this.snackBar.open('Successfully logged out!', 'Dismiss', { duration: 2000 });
      this.router.navigate(['/']);
    });
  }

  getUserState() {
    return this.afAuth.authState;
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.userData = user;

        userCredential.user.updateProfile({
          displayName: user.userName,
          photoURL: user.photoURL
        });

        this.insertUserData(userCredential)
          .then(() => {
            this.router.navigate(['/bids']);
          });
      }).catch(() => {
        this.snackBar.open('Error during registration!', 'Dismiss', { duration: 5000 });
      });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.afs.doc(`Users/${userCredential.user.uid}`).set({
      email: this.userData.email,
      userName: this.userData.userName,
      phoneNumber: this.userData.phoneNumber,
      photoURL: this.userData.photoURL,
      role: 'network user'
    })
  }

  updateUser(userData) {
    this.afAuth.auth.currentUser.updateProfile({
      displayName: userData.userName,
      photoURL: userData.imageUrl
    }).then(() => {
      this.snackBar.open('Profile successfully updated!', 'Dismiss', { duration: 2000 });
      this.router.navigate(['/bids']);
    }
    ).catch(() => {
      this.snackBar.open('Error during profile update!', 'Dismiss', { duration: 5000 });
    });
  }
}
