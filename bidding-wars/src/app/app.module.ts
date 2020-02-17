import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth/auth.service';
import { BidsModule } from './bids/bids.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './material.module';
import { BidsService } from './bids/bids.service';

//Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'; // Only required for database features
import { AngularFireStorageModule } from '@angular/fire/storage'; // Only required for storage features
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';       // Only required for auth features


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'bidding-wars'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BidsModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    BidsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
