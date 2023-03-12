import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SubProductsComponent } from './components/sub-products/sub-products.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import { UpdateProductComponent } from './components/update-product/update-product.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ProductsComponent,
    SubProductsComponent,
    UpdateProductComponent
  ],
    imports: [
        CommonModule,
        ProductsRoutingModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatIconModule,
        MatAutocompleteModule,
        MatDialogModule,
    ]
})
export class ProductsModule { }
