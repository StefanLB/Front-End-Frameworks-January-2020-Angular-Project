import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material.module';




@NgModule({
  declarations: [
    NavComponent, 
    FooterComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    NavComponent,
    FooterComponent
  ]
})
export class CoreModule { }
