import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      document.body.classList.remove('nb-theme');
    });
  }

}
