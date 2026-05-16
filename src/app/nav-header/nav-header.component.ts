import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit, OnDestroy{

  from_name:any;
  to_name: any;
  from_email: any;
  subject = 'Admission enquiry'
  message: any;
  
  constructor (public stateService: StateService){
  }
  isNavbarCollapse: boolean = false;
  navbarCollapseSubsc!: Subscription;

  @ViewChild('navBar') navBar! : ElementRef;

  ngOnInit(): void {
    this.navbarCollapseSubsc = this.stateService.navbarCollapseObs.subscribe(collapseStatus => {
      this.isNavbarCollapse = collapseStatus;      
    })
  }

  get navBarHeight(){
    return this.navBar.nativeElement.offsetHeight;
  }

  navBtnClick(){
    this.isNavbarCollapse = !this.isNavbarCollapse;
  }

  ngOnDestroy(): void {
    this.navbarCollapseSubsc.unsubscribe();
  }

  async send(){
    emailjs.init('y95dSCGUGzkBBEd12');
    let response = await emailjs.send('service_huorezr','template_c5m6c7y',{
      from_name: this.from_name,
      to_name: this.to_name,
      from_email: this.from_email,
      subject: this.subject,
      message: this.message,
    })
    
    this.from_name = '';
    this.to_name='';
    this.from_email = '';
    this.subject = '';
    this.message= '';
  }

  modalOpen() {

  }

}
