import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public router: Router
  ) { }

  login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        if (userCredential) {
          this.router.navigate(['/']);
        }
      }).catch(err => {
        console.log(err);
      })
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/']);
      }).catch((error) => {
        console.log(error)
      })
  }

  logout() {
    return this.afAuth.auth.signOut();
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
            this.router.navigate(['/']);
          });
      }).catch(err => {
        console.log(err);
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
    })
  }
}
