import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ProblemsService} from "../../services/problems.service";
import {ProblemsDTO} from "../../dto/ProblemsDTO";
import {CommentDTO} from "../../dto/CommentDTO";
import {ApprovelDialogComponent} from "../../../../core/approvel-dialog/approvel-dialog.component";
import {ApprovalDialogConfig} from "../../../../core/approvel-dialog/model/ApprovalDialogConfig";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-sub-problems',
  templateUrl: './sub-problems.component.html',
  styleUrls: ['./sub-problems.component.scss']
})
export class SubProblemsComponent implements OnInit {

  idLoading = true;
  apiResponse!: false;
  ProblemUserFrom!: FormGroup;
  checked = false;
  disabled = false;
  fileObj:any
  selectedFiles?: FileList;
  fileInfos?: Observable<any>;

  fieldArray: Array<any> = [];
  newAttribute: any = {};
  itemDetailsForm!: FormGroup;
  cookieValues :any
  cookieValue :any
  addCommentForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private http: HttpClient,
              private problemsService:ProblemsService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.ProblemUserFrom = new FormGroup({
      farmer_name: new FormControl('', [
        Validators.required,
      ]),
      farmer_image: new FormControl('', [
        Validators.required,
      ]),
      problem_title: new FormControl('', [
        Validators.required,
      ]),
      problem_desc: new FormControl('', [
        Validators.required
      ]),
      status  : new FormControl('', [
        Validators.required,
      ]),
    });
    this.addCommentForm = new FormGroup({
      comment_desc: new FormControl('', [
        Validators.required
      ]),
    });
    this.GetAllProblems()
    this.onNoClick();
  }

  onNoClick() {
    this.ProblemUserFrom.setValue({
      farmer_name: 'F-',
      farmer_image: '',
      problem_title: '',
      problem_desc: '',
      status: '',
    });
  }

  saveItemss() {
    this.problemsService.saveProblem(new ProblemsDTO(
      this.ProblemUserFrom.get('farmer_name')?.value,
      this.ProblemUserFrom.get('farmer_image')?.value,
      this.ProblemUserFrom.get('problem_title')?.value,
      this.ProblemUserFrom.get('problem_desc')?.value,
      this.ProblemUserFrom.get('status')?.value
    )).subscribe(res=>{
      console.log(res)
      if (res.code==='201'){
        this.openSnackBar();

      }else{
        this.openFailureSnackBar();

      }
    })
  }

  openFailureSnackBar(){
    this._snackBar.open('Problem added Unsuccessful!!', 'Try Again',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar','login-snackbar']
    });
  }

  openSnackBar(){
    let snackBarRef = this._snackBar.open('Problem Added successfully!!', 'ok',{
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

  private allComponentsSub2!: Subscription;
  private allComponentsSub3!: Subscription;
  serviceProblems! :any[];
  serviceComments! :any[];
  panelOpenState = false;


  GetAllProblems(){
    this.allComponentsSub2 = this.problemsService.getProblemDetails().subscribe(result => {
      console.log("serviceProblems")
      this.serviceProblems = result.data;
      console.log(this.serviceProblems)
    }, error => {
      console.log(error);
    });
  }

  GetAllComments(problem_id: any) {
    this.allComponentsSub3 = this.problemsService.getAllComments(problem_id).subscribe(result => {
      console.log(result.data)
      this.serviceComments = result.data;
    }, error => {
      console.log(error);
    });
  }

  submitComment(problem_id: any) {
    const userVal ="active"
    this.problemsService.addComment(new CommentDTO(
      this.addCommentForm.get('comment_desc')?.value,
      userVal,
      this.cookieValues.expert_name,
      this.cookieValues.expert_img,
      problem_id
    )).subscribe(res=>{
      console.log(res)
      if (res.code==='201'){
        this.addCommentForm.setValue({
          comment_desc:''
        });
        this.openSnackBar();
      }else{
        this.addCommentForm.setValue({
          comment_desc:''
        });
        this.openFalureSnackBar();
      }
    });
  }
  openFalureSnackBar(){
    this._snackBar.open('Adding Unsuccessful!!', 'ok',{
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: ['red-snackbar', 'login-snackbar']
    });
  }


  currentOpenedItemId!: any;

  public handleOpened(item: any): void {
    this.currentOpenedItemId = item;
  }

  deleteProblem(problem_id: any) {
    const approval = this.dialog.open(ApprovelDialogComponent, {
      width: '350px',
      data: new ApprovalDialogConfig('Delete', 'Warning !', 'Are you sure you want to delete '+problem_id+' Item?')
    });
    approval.afterClosed().subscribe(approve => {
      if (approve) {
        console.log(approve)
        this.problemsService.deleteComponent(problem_id).subscribe(res => {
          console.log(res);
          this.GetAllProblems()
        });

      }else{
        const approval4 = this.dialog.open(ApprovelDialogComponent, {
          width: '350px',
          data: new ApprovalDialogConfig('Error', 'UnSuccessful', 'Item '+problem_id+' Is Not Deleted')
        });
        approval4.afterClosed().subscribe(approve => {
          if (approve) {
            this.GetAllProblems()

          }
        })
      }
    });
  }
}
