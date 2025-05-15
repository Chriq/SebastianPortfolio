import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import emailjs from '@emailjs/browser';

const SERVICE_ID: string = '';
const TEMPLATE_ID: string = '';
const PUBLIC_KEY: string = '';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  contactForm: FormGroup;

  sending = false;
  sent = false;
  error: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) return;

    this.sending = true;
    this.error = null;

    const templateParams = {
      name: `${this.contactForm.value.firstName} ${this.contactForm.value.lastName}`,
      email: this.contactForm.value.email,
      time: new Date(),
      company: this.contactForm.value.company,
      subject: this.contactForm.value.subject,
      message: this.contactForm.value.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        this.sending = false;
        this.sent = true;
        this.contactForm.reset();
      }, (err) => {
        this.sending = false;
        this.error = 'Failed to send message. Please contact me at sebastiangsegura@gmail.com.';
        console.error('EmailJS Error:', err);
      });
  }
}
