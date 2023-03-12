import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ExpertService} from "../../services/expert.service";
import {ExpertDTO} from "../../dto/ExpertDTO";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ExpertDTOS} from "../../dto/ExpertDTOS";
import {UpdateExpertComponent} from "../update-expert/update-expert.component";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";

@Component({
  selector: 'app-sub-expert',
  templateUrl: './sub-expert.component.html',
  styleUrls: ['./sub-expert.component.scss']
})
export class SubExpertComponent implements OnInit {


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
              public dialog: MatDialog,) {
    this.dataSource = new MatTableDataSource(this.components);
  }

  ngOnInit(): void {
    this.PoliceUserFrom = new FormGroup({
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

    this.onNoClick();
  }

  onNoClick() {
    this.PoliceUserFrom.setValue({
      expert_name: 'E-',
      expert_password: '',
      expert_title: '',
      expert_desc: '',
      expert_contact: '',
      expert_mail: '',
      expert_img: '',
      status: '',
    });
  }

  saveItemss() {
    this.expertService.savePolice(new ExpertDTO(
      this.PoliceUserFrom.get('expert_name')?.value,
      this.PoliceUserFrom.get('expert_password')?.value,
      this.PoliceUserFrom.get('expert_title')?.value,
      this.PoliceUserFrom.get('expert_desc')?.value,
      this.PoliceUserFrom.get('expert_contact')?.value,
      this.PoliceUserFrom.get('expert_mail')?.value,
      this.PoliceUserFrom.get('expert_img')?.value,
    this.PoliceUserFrom.get('status')?.value
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
    this._snackBar.open('Expert added Unsuccessful!!', 'Try Again',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  openSnackBar(){
    let snackBarRef = this._snackBar.open('Expert Added successfully!!', 'ok',{
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

  components!: Array<ExpertDTOS>[];
  displayedColumns: string[] = ['expert_id', 'expert_name', 'expert_password', 'expert_title', 'expert_desc', 'expert_contact','expert_mail','expert_img','status', 'action'];
  dataSource: MatTableDataSource<Array<ExpertDTOS>>;
  private allComponentsSub!: Subscription;
  tempPageEvent!: PageEvent;
  searchedWords!: string[];


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
    this.allComponentsSub = this.expertService.getAllExperts()
      // .pipe(timeout(4000))
      .subscribe(result => {
        console.log(result)
        this.dataSource = result.data;
      }, error => {
        console.log(error);
      });
  }




  updateExpert(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    console.log(row);
    console.log('----------------------------');
    const dialogRef = this.dialog.open(UpdateExpertComponent, dialogConfig);
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
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+row.componetName+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.expertService.deleteComponent(row.expert_id).subscribe(res => {
          console.log(res);
          this.refreshTable();
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+row.expert_id+' Is Not Deleted')
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
