// email-form.component.ts
import { AfterViewInit, Component } from '@angular/core';
import { StateService } from '../services/state.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit {

  from_name:any;
  to_name = 'Success Learning';
  from_email: any;
  from_phone: any;
  subject = 'Admission enquiry'
  message: any;

  constructor(private stateService: StateService) {

  }

  ngAfterViewInit(): void {

  }

  async send(form: any){
  if(form.invalid) {
    alert('Please fill in all required fields.');
    return;
  }

  emailjs.init('7JlnJeB9KtPPLeYge');

  try {
    let response = await emailjs.send('service_cwwzwbl','template_875inr8',{
      from_name: this.from_name,
      to_name: this.to_name,
      from_email: this.from_email,
      from_phone: this.from_phone,
      subject: this.subject,
      message: this.message,
    });
    console.log("SUCCESS!", response.status, response.text);
    alert('Your message was sent!');
    form.reset();  // 👈 RESET AFTER SENDING
  } catch (err) {
    console.error("FAILED...", err);
    alert("Failed to send message.");
  }
}



  // async send(form: any){
  //   form.reset();
  //   if(form.invalid) {
  //     alert('Please fill in all required fields.');
  //     return;
  //   };
  //   emailjs.init('7JlnJeB9KtPPLeYge');
  //   let response = await emailjs.send('service_cwwzwbl','template_875inr8',{
  //     from_name: this.from_name,
  //     to_name: this.to_name,
  //     from_email: this.from_email,
  //     from_phone: this.from_phone,
  //     subject: this.subject,
  //     message: this.message,
  //   })    

  //   alert('Message sent!');

  //   this.from_name = '';
  //   this.to_name='';
  //   this.from_email = '';
  //   this.from_phone = '';
  //   this.subject = '';
  //   this.message= '';

  // }

}
