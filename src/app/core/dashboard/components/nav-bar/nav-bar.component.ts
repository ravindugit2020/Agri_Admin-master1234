import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  public isMenuOpen = true;
  @Output() event = new EventEmitter<boolean>();

  ngOnInit(): void {
  }

  sendNavState(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.event.emit(this.isMenuOpen);
  }

  logout(): void {
    this.router.navigate(['../Authentication']);
  }

}
