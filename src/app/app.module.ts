import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubUsersComponent } from './github-users/github-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParticlesModule } from 'angular-particle';
import { MatProgressSpinnerModule, MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatTableModule } from '@angular/material'
import { HttpClientModule} from "@angular/common/http";
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    GithubUsersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ParticlesModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    FormsModule,
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
