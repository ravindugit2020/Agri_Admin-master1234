import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CookieModule} from "ngx-cookie";
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {MatDialogModule} from "@angular/material/dialog";
import { ApprovelDialogComponent } from './core/approvel-dialog/approvel-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import { ComponentNameComponent } from './component-name/component-name.component';

@NgModule({
  declarations: [
    AppComponent,
    ApprovelDialogComponent,
    ComponentNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    CookieModule.forRoot(),
    NbThemeModule.forRoot({name: 'default'}),
    NbLayoutModule,
    NbEvaIconsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
