import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit{
  constructor( private stateService: StateService){}
  ngOnInit(): void {
    this.stateService.navbarCollapseSubj.next(false);
  }

}
