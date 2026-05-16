import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() { }

  navbarCollapseSubj = new BehaviorSubject(false);
  navbarCollapseObs = this.navbarCollapseSubj.asObservable();

  modalAutoOpen : boolean = true;

}
