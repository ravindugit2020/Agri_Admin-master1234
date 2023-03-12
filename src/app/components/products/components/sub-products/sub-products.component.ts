import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProductsService} from "../../services/products.service";
import {ProductsDTO} from "../../dto/ProductsDTO";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {ProductDTOS} from "../../dto/ProductDTOS";
import {UpdateProductComponent} from "../update-product/update-product.component";

@Component({
  selector: 'app-sub-products',
  templateUrl: './sub-products.component.html',
  styleUrls: ['./sub-products.component.scss']
})
export class SubProductsComponent implements OnInit {


  idLoading = true;
  apiResponse!: false;
  ProductUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http: HttpClient,
              private productsService:ProductsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource(this.components);
  }

  ngOnInit(): void {
    this.ProductUserFrom = new FormGroup({
      farmer_name: new FormControl('', [
        Validators.required,
      ]),
      farmer_contact: new FormControl('', [
        Validators.required,
      ]),
      product_title: new FormControl('', [
        Validators.required,
      ]),
      product_desc: new FormControl('', [
        Validators.required
      ]),
      product_img: new FormControl('', [
        Validators.required,
      ]),
      product_price: new FormControl('', [
        Validators.required,
      ]),
      fertilizer: new FormControl('', [
        Validators.required,
      ]),
      status: new FormControl('', [
        Validators.required,
      ])
    });

    this.onNoClick();
  }

  onNoClick() {
    this.ProductUserFrom.setValue({
      farmer_name: 'F-',
      farmer_contact: '',
      product_title: '',
      product_desc: '',
      product_img: '',
      product_price: '',
      fertilizer:'',
      status:''
    });
  }

  saveProducts() {
    this.productsService.saveProduct(new ProductsDTO(
      this.ProductUserFrom.get('farmer_name')?.value,
      this.ProductUserFrom.get('farmer_contact')?.value,
      this.ProductUserFrom.get('product_title')?.value,
      this.ProductUserFrom.get('product_desc')?.value,
      this.ProductUserFrom.get('product_img')?.value,
      this.ProductUserFrom.get('product_price')?.value,
      this.ProductUserFrom.get('fertilizer')?.value,
      this.ProductUserFrom.get('status')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.code==='201'){
        this.openSnackBar();
        this.refreshTable();
      }else{
        this.openFailureSnackBar();

      }
    })
  }


  openFailureSnackBar(){
    this._snackBar.open('Product added Unsuccessful!!', 'Try Again',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  openSnackBar(){
    let snackBarRef = this._snackBar.open('Product Added successfully!!', 'ok',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['green-snackbar', 'login-snackbar']
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log("The snackbar is dismissed");
    });
    snackBarRef.onAction().subscribe(() => {
      console.log("The snackbar action was triggered!");
      this.onNoClick();
    })
  }

  // ====================================================================================================

  components!: Array<ProductDTOS>[];
  displayedColumns: string[] = ['product_id', 'product_title', 'product_desc', 'product_img', 'product_price', 'fertilizer','farmer_name','farmer_contact','status', 'action'];
  dataSource: MatTableDataSource<Array<ProductDTOS>>;
  private allComponentsSub!: Subscription;
  tempPageEvent!: PageEvent;
  searchedWords!: string[];
  options: string[] = ['Chemical', 'Natural', 'Both'];


  ngAfterViewInit(): void {
    this.refreshTable();
  }

  Test($event: KeyboardEvent): void {
    console.log($event);
  }

  public refreshTable(): void {
    this.loadTable();
  }


  public loadTable(): void {
    this.allComponentsSub = this.productsService.getAllProducts()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        this.dataSource = result.data;
      }, error => {
        console.log(error);
      });
  }

  updateProduct(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateProductComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  deleteProduct(row: any): void {
    const approval = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.product_id+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.productsService.deleteComponent(row.product_id).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.product_id+' Is Not Deleted')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            this.refreshTable();

          }
        })
      }
    });
  }


}
