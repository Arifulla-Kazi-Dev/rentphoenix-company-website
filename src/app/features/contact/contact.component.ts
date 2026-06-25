import { Component, OnInit, AfterViewInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LucideAngularModule, Mail, Linkedin, ArrowRight, Send } from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly ArrowRight = ArrowRight;
  readonly Send = Send;
  readonly Mail = Mail;
  readonly Linkedin = Linkedin;

  submitted = signal(false);
  sending = signal(false);
  sendError = signal(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    organization: [''],
    type: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(20)]]
  });

  readonly inquiryTypes = [
    'Software Development Project',
    'Government Digital Transformation',
    'Product Demo (RentPhoenix OS)',
    'Partnership / Collaboration',
    'Career / Internship',
    'General Inquiry'
  ];

  readonly contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@rentphoenixos.in',
      href: 'mailto:support@rentphoenixos.in'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'arifulla-kazi-b73743243',
      href: 'https://www.linkedin.com/in/arifulla-kazi-b73743243'
    },
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Contact',
      description: 'Get in touch with RentPhoenix Technologies. For project inquiries, product demos, or general questions.',
      keywords: 'contact RentPhoenix, software development inquiry Goa, enterprise software consultation India'
    });
  }

  ngAfterViewInit(): void {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.sending.set(true);
    this.sendError.set(false);

    const { name, email, organization, type, message } = this.contactForm.value;

    this.http.post('https://api.web3forms.com/submit', {
      access_key: '3faf3864-2d1a-45a5-99bc-abba941c2f13',
      subject: `New Inquiry: ${type}`,
      from_name: name,
      email,
      organization: organization || 'Not provided',
      inquiry_type: type,
      message
    }).subscribe({
      next: () => {
        this.sending.set(false);
        this.submitted.set(true);
      },
      error: () => {
        this.sending.set(false);
        this.sendError.set(true);
      }
    });
  }

  get f() { return this.contactForm.controls; }
}
