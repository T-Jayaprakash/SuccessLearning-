import { Component, OnInit } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  formData = { name: '', email: '', phone: '', course: '', message: '' };
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  courseOptions = ['IELTS', 'TOEFL', 'GRE', 'GMAT', 'Spoken English', 'German', 'French', 'Japanese', 'PTE/OET/Duolingo', 'Other'];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMeta({
      title: 'Contact Us — Success Learning | Trichy',
      description: 'Contact Success Learning Trichy for course enquiries. Visit us at Thillai Nagar or call 98409 79292. IELTS, TOEFL, GRE, Spoken English coaching.',
    });
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.submitStatus = 'idle';
    try {
      emailjs.init('y95dSCGUGzkBBEd12');
      await emailjs.send('service_huorezr', 'template_c5m6c7y', {
        from_name: this.formData.name,
        from_email: this.formData.email,
        subject: `Enquiry: ${this.formData.course}`,
        message: `Phone: ${this.formData.phone}\nCourse: ${this.formData.course}\n\n${this.formData.message}`,
      });
      this.submitStatus = 'success';
      this.formData = { name: '', email: '', phone: '', course: '', message: '' };
    } catch {
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
}
