import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FarmersRoutingModule } from './farmers-routing.module';
import { FarmersComponent } from './farmers.component';
import { SubFarmerComponent } from './components/sub-farmer/sub-farmer.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import { UpdateFarmerComponent } from './components/update-farmer/update-farmer.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    FarmersComponent,
    SubFarmerComponent,
    UpdateFarmerComponent
  ],
    imports: [
        CommonModule,
        FarmersRoutingModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatAutocompleteModule,
        MatDialogModule,
    ]
})
export class FarmersModule { }
