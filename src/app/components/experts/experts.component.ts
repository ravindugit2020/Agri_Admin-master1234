import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.scss']
})
export class ExpertsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      document.body.classList.remove('nb-theme');
    });
  }

}
