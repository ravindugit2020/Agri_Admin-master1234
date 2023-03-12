import {Component, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import { faLaptopHouse, faUser, faTractor,faUserTie, faCarrot,faSeedling,faChartBar } from '@fortawesome/free-solid-svg-icons';
import {faFacebookMessenger} from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({
      })),
      state('false', style({
        width: '0px',
      })),
      transition('true => false', animate('500ms')),
      transition('false => true', animate('500ms'))
    ])
  ]
})
export class SideBarComponent implements OnInit {

  faLaptopHouse= faLaptopHouse;
  faUser= faUser;
  faTractor=faTractor;
  faUserTie=faUserTie;
  faCarrot= faCarrot
  faSeedling=faSeedling
  faFacebookMessenger=faFacebookMessenger
  faChartBar=faChartBar


  constructor() { }

  @Input() navState = true;
  title!: string;

  ngOnInit(): void {
  }

}
