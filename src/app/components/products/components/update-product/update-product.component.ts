import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {ProductDTOS} from "../../dto/ProductDTOS";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  ProductUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  options: string[] = ['Chemical', 'Natural', 'Both'];

  constructor(private http: HttpClient,
              private productsService:ProductsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateProductComponent>,) {

  }

  ngOnInit(): void {
    this.ProductUserFrom = new FormGroup({
      product_id: new FormControl('', [
        Validators.required,
      ]),
      product_title: new FormControl('', [
        Validators.required,
      ]),
      product_desc: new FormControl('', [
        Validators.required,
      ]),
      product_img: new FormControl('', [
        Validators.required
      ]),
      product_price: new FormControl('', [
        Validators.required,
      ]),
      fertilizer: new FormControl('', [
        Validators.required,
      ]),
      farmer_name: new FormControl('', [
        Validators.required,
      ]),
      farmer_contact: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', [
        Validators.required,
      ])
    });

    this.ProductUserFrom.setValue({
      product_id: this.data.product_id,
      product_title: this.data.product_title,
      product_desc: this.data.product_desc,
      product_img: this.data.product_img,
      product_price: this.data.product_price,
      fertilizer: this.data.fertilizer,
      farmer_name: this.data.farmer_name,
      farmer_contact: this.data.farmer_contact,
      status: this.data.status
    });

  }

  saveProducts() {
    this.productsService.updateProduct(new ProductDTOS(
      this.ProductUserFrom.get('product_id')?.value,
      this.ProductUserFrom.get('product_title')?.value,
      this.ProductUserFrom.get('product_desc')?.value,
      this.ProductUserFrom.get('product_img')?.value,
      this.ProductUserFrom.get('product_price')?.value,
      this.ProductUserFrom.get('fertilizer')?.value,
      this.ProductUserFrom.get('farmer_name')?.value,
    this.ProductUserFrom.get('farmer_contact')?.value,
      this.ProductUserFrom.get('status')?.value
    )).subscribe(res=>{
      console.log(res)
      console.log(res)
      if (res.code==='200'){
        this.dialogRef.close();
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.product_id+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.product_id+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.product_id+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.product_id+' Is Not Updated');
          }
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.product_id+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.product_id+' Is Not Updated');
      }
    });
  }

}
