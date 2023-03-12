import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemsRoutingModule } from './problems-routing.module';
import { ProblemsComponent } from './problems.component';
import { SubProblemsComponent } from './components/sub-problems/sub-problems.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    ProblemsComponent,
    SubProblemsComponent
  ],
  imports: [
    CommonModule,
    ProblemsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class ProblemsModule { }
