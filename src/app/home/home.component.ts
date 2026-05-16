import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{

  @ViewChild("modalBtn") contactBtn! : ElementRef;

  constructor( private stateService: StateService){}
  ngOnInit(): void {
    this.stateService.navbarCollapseSubj.next(false);
  }
  ngAfterViewInit(): void {
    if(this.stateService.modalAutoOpen){
      this.contactBtn.nativeElement.click();
      this.stateService.modalAutoOpen = false;
    }

  }
}
