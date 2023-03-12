import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ExpertService} from "../../services/expert.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ExpertDTOS} from "../../dto/ExpertDTOS";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";

@Component({
  selector: 'app-update-expert',
  templateUrl: './update-expert.component.html',
  styleUrls: ['./update-expert.component.scss']
})
export class UpdateExpertComponent implements OnInit {
  idLoading = true;
  apiResponse!: false;
  PoliceUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http: HttpClient,
              private expertService:ExpertService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<UpdateExpertComponent>,) { }

  ngOnInit(): void {
    this.PoliceUserFrom = new FormGroup({
      expert_id: new FormControl('', [
        Validators.required,
      ]),
      expert_name: new FormControl('', [
        Validators.required,
      ]),
      expert_password: new FormControl('', [
        Validators.required,
      ]),
      expert_title: new FormControl('', [
        Validators.required,
      ]),
      expert_desc: new FormControl('', [
        Validators.required
      ]),
      expert_contact: new FormControl('', [
        Validators.required,
      ]),
      expert_mail: new FormControl('', [
        Validators.required,
      ]),
      expert_img  : new FormControl('', [
        Validators.required,
      ]),
      status  : new FormControl('', [
        Validators.required,
      ]),
    });

    this.PoliceUserFrom.setValue({
      expert_id: this.data.expert_id,
      expert_name: this.data.expert_name,
      expert_password: this.data.expert_password,
      expert_title: this.data.expert_title,
      expert_desc: this.data.expert_desc,
      expert_contact: this.data.expert_contact,
      expert_mail: this.data.expert_mail,
      expert_img: this.data.expert_img,
      status: this.data.status,
    });
  }

  saveItemss() {
    this.expertService.updateExpert(new ExpertDTOS(
      this.PoliceUserFrom.get('expert_id')?.value,
      this.PoliceUserFrom.get('expert_name')?.value,
      this.PoliceUserFrom.get('expert_password')?.value,
      this.PoliceUserFrom.get('expert_title')?.value,
      this.PoliceUserFrom.get('expert_desc')?.value,
      this.PoliceUserFrom.get('expert_contact')?.value,
      this.PoliceUserFrom.get('expert_mail')?.value,
      this.PoliceUserFrom.get('expert_img')?.value,
      this.PoliceUserFrom.get('status')?.value,
    )).subscribe(res=>{
      console.log(res)
      console.log(res)
      if (res.code==='200'){
        this.dialogRef.close();
        const approval5 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Alert', 'Successfully', 'Item '+this.data.expert_name+' Is Updated')
        });
        approval5.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.expert_name+' Is Updated');
          }
        });
      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.expert_name+' Is Not Updated')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            console.log('Item '+this.data.expert_name+' Is Not Updated');
          }
        });
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
    const approval4 = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+this.data.expert_name+' Is Not Updated')
    });
    approval4.afterClosed().subscribe(approve => {
      if (approve) {
        console.log('Item '+this.data.expert_name+' Is Not Updated');
      }
    });
  }
}
