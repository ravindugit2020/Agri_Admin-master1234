import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {FarmerService} from "../../services/farmer.service";
import {FarmerDTO} from "../../dto/FarmerDTO";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {FarmerDTOS} from "../../dto/FarmerDTOS";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateFarmerComponent} from "../update-farmer/update-farmer.component";

@Component({
  selector: 'app-sub-farmer',
  templateUrl: './sub-farmer.component.html',
  styleUrls: ['./sub-farmer.component.scss']
})
export class SubFarmerComponent implements OnInit {


  idLoading = true;
  apiResponse!: false;
  FarmerUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any;
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http: HttpClient,
              private farmerService:FarmerService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource(this.components);
  }

  ngOnInit(): void {
    this.FarmerUserFrom = new FormGroup({
      farmer_name: new FormControl('', [
        Validators.required,
      ]),
      farmer_password: new FormControl('', [
        Validators.required,
      ]),
      farmer_contact: new FormControl('', [
        Validators.required,
      ]),
      farmer_image: new FormControl('', [
        Validators.required
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
    this.FarmerUserFrom.setValue({
      farmer_name: 'F-',
      farmer_password: '',
      farmer_contact: '',
      farmer_image: '',
      fertilizer: '',
      status: ''
    });
  }

  saveFarmers() {
    this.farmerService.saveFarmer(new FarmerDTO(
      this.FarmerUserFrom.get('farmer_name')?.value,
      this.FarmerUserFrom.get('farmer_password')?.value,
      this.FarmerUserFrom.get('farmer_contact')?.value,
      this.FarmerUserFrom.get('farmer_image')?.value,
      this.FarmerUserFrom.get('fertilizer')?.value,
      this.FarmerUserFrom.get('status')?.value
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
    this._snackBar.open('Farmer added Unsuccessful!!', 'Try Again',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  openSnackBar(){
    let snackBarRef = this._snackBar.open('Farmer Added successfully!!', 'ok',{
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

  components!: Array<FarmerDTOS>[];
  displayedColumns: string[] = ['farmer_id', 'farmer_name', 'farmer_contact', 'farmer_image', 'farmer_password', 'fertilizer','status','action'];
  dataSource: MatTableDataSource<Array<FarmerDTOS>>;
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
    this.allComponentsSub = this.farmerService.getAllFarmers()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        this.dataSource = result.data;
      }, error => {
        console.log(error);
      });
  }

  updateFarmer(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateFarmerComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log("response code1")
      console.log(result)
      console.log("response code2")
      this.refreshTable();
    });
  }

  deleteExpert(row: any): void {
    const approval = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.farmer_id+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.farmerService.deleteComponent(row.farmer_id).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.farmer_id+' Is Not Deleted')
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
