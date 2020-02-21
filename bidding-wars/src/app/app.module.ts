import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BidsModule } from './bids/bids.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { MaterialModule } from './material.module';
import { BidsService } from './bids/bids.service';
import { ContactComponent } from './contact/contact.component';

//Firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage'; // Only required for storage features
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
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
    FormsModule,
    AuthModule,
    UserModule
  ],
  providers: [
    AuthService,
    BidsService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
