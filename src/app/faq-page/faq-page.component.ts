import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css']
})
export class FaqPageComponent {

  li_1: string = 'What is GRE?';
  li_2: string = "What's on the GRE?";
  li_3: string = 'What is the GMAT?';
  li_4: string = "What's on the GMAT?";
  li_5: string = 'What is the TOEFL?';
  li_6: string = 'What is the SAT?';
  li_7: string = 'How is the SAT scored?';

}
