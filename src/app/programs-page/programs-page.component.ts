import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-programs-page',
  templateUrl: './programs-page.component.html',
  styleUrls: ['./programs-page.component.css'],
})
export class ProgramsPageComponent implements OnInit{
  constructor( private stateService: StateService){}
  ngOnInit(): void {
    this.stateService.navbarCollapseSubj.next(false);
  }
  
}
