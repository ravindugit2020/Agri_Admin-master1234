import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {FarmerService} from "../../services/farmer.service";
import {FarmerDTOS} from "../../dto/FarmerDTOS";

@Component({
  selector: 'app-update-farmer',
  templateUrl: './update-farmer.component.html',
  styleUrls: ['./update-farmer.component.scss']
})
export class UpdateFarmerComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  FarmerUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  options: string[] = ['Chemical', 'Natural', 'Both'];

  constructor(private http: HttpClient,
              private farmerService:FarmerService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateFarmerComponent>,) { }

  ngOnInit(): void {
    this.FarmerUserFrom = new FormGroup({
      farmer_id: new FormControl('', [
        Validators.required,
      ]),
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

    this.FarmerUserFrom.setValue({
      farmer_id: this.data.farmer_id,
      farmer_name: this.data.farmer_name,
      farmer_password: this.data.farmer_password,
      farmer_contact: this.data.farmer_contact,
      farmer_image: this.data.farmer_image,
      fertilizer: this.data.fertilizer,
      status: this.data.status
    });
  }

  saveFarmers() {
    this.farmerService.updateFarmer(new FarmerDTOS(
      this.FarmerUserFrom.get('farmer_id')?.value,
      this.FarmerUserFrom.get('farmer_name')?.value,
      this.FarmerUserFrom.get('farmer_password')?.value,
      this.FarmerUserFrom.get('farmer_contact')?.value,
      this.FarmerUserFrom.get('farmer_image')?.value,
      this.FarmerUserFrom.get('fertilizer')?.value,
      this.FarmerUserFrom.get('status')?.value
    )).subscribe(res=>{
      console.log(res)
      console.log(res)
      if (res.code==='200'){
        this.dialogRef.close();
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.farmer_name+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.expert_name+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.farmer_name+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.farmer_name+' Is Not Updated');
          }
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.farmer_name+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.farmer_name+' Is Not Updated');
      }
    });
  }

}
