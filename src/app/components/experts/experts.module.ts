import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpertsRoutingModule } from './experts-routing.module';
import { ExpertsComponent } from './experts.component';
import { SubExpertComponent } from './components/sub-expert/sub-expert.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import { UpdateExpertComponent } from './components/update-expert/update-expert.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ExpertsComponent,
    SubExpertComponent,
    UpdateExpertComponent
  ],
  imports: [
    CommonModule,
    ExpertsRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,

  ]
})
export class ExpertsModule { }
