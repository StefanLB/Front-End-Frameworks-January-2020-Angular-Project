import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../material.module';
import { MatProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
