import {
  Component, OnInit, AfterViewInit, inject, signal,
  ChangeDetectionStrategy, HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  LucideAngularModule,
  ArrowRight, Mail, Clock,
  TrendingUp, Bug, Users, ChevronDown, ChevronUp,
  X, Link, CheckCircle
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-careers',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.scss'
})
export class CareersComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly ArrowRight = ArrowRight;
  readonly Mail = Mail;
  readonly Clock = Clock;
  readonly ChevronDown = ChevronDown;
  readonly ChevronUp = ChevronUp;
  readonly X = X;
  readonly Link = Link;
  readonly CheckCircle = CheckCircle;

  // Job card accordion
  expandedRole = signal<number | null>(null);

  toggleRole(index: number): void {
    this.expandedRole.update(current => current === index ? null : index);
  }

  // Application modal
  applyingFor = signal<string | null>(null);
  applicationSubmitted = signal(false);
  applicationSending = signal(false);
  applicationError = signal(false);

  applicationForm: FormGroup = this.fb.group({
    name:       ['', [Validators.required, Validators.minLength(2)]],
    email:      ['', [Validators.required, Validators.email]],
    resumeLink: [''],
  });

  get af() { return this.applicationForm.controls; }

  openApplication(event: Event, roleTitle: string): void {
    event.stopPropagation();
    this.applyingFor.set(roleTitle);
    this.applicationSubmitted.set(false);
    this.applicationError.set(false);
    this.applicationForm.reset();
    document.body.style.overflow = 'hidden';
  }

  closeApplication(): void {
    this.applyingFor.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    if (this.applyingFor() !== null) this.closeApplication();
  }

  submitApplication(): void {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    this.applicationSending.set(true);
    this.applicationError.set(false);

    const { name, email, resumeLink } = this.applicationForm.value;

    this.http.post('https://api.web3forms.com/submit', {
      access_key: '3faf3864-2d1a-45a5-99bc-abba941c2f13',
      subject: `Internship Application — ${this.applyingFor()}`,
      from_name: name,
      email,
      role: this.applyingFor(),
      resume_link: resumeLink || 'Not provided — applicant will email resume separately',
    }).subscribe({
      next: () => {
        this.applicationSending.set(false);
        this.applicationSubmitted.set(true);
      },
      error: () => {
        this.applicationSending.set(false);
        this.applicationError.set(true);
      }
    });
  }

  readonly roles = [
    {
      icon: TrendingUp,
      title: 'Business Development & Market Research Intern',
      location: 'Mapusa, Goa / Remote',
      duration: '2–3 Months',
      type: 'Internship · Unpaid',
      experience: 'Freshers Welcome',
      whatYoullDo: [
        'Conduct market research and competitor analysis',
        'Build databases of landlords and property managers',
        'Assist in lead generation and customer outreach',
        'Gather customer feedback and market insights',
      ],
      whatYoullLearn: [
        'Business Development', 'Sales & Lead Generation',
        'Market Research', 'Customer Communication', 'Startup Growth Strategies'
      ],
      benefits: [
        'Internship Certificate',
        'Letter of Recommendation (Performance Based)',
        'LinkedIn Recommendation',
        'Direct Founder Mentorship',
        'Hands-on Startup Experience',
        'Potential Future Paid Opportunities',
      ],
    },
    {
      icon: Bug,
      title: 'Quality Assurance (QA) Intern',
      location: 'Mapusa, Goa / Remote',
      duration: '2–3 Months',
      type: 'Internship · Unpaid',
      experience: 'Freshers Welcome',
      whatYoullDo: [
        'Test web and mobile workflows',
        'Identify and report bugs clearly',
        'Verify fixes and improve product quality',
        'Perform usability and responsiveness testing',
      ],
      whatYoullLearn: [
        'Software Testing', 'Manual QA',
        'Bug Reporting & Documentation', 'Product Thinking', 'SaaS Development Lifecycle'
      ],
      benefits: [
        'Internship Certificate',
        'Letter of Recommendation (Performance Based)',
        'Direct Founder Mentorship',
        'Real Startup Experience',
        'Portfolio Projects',
        'Potential Future Paid Opportunities',
      ],
    },
    {
      icon: Users,
      title: 'Customer Success & Operations Intern',
      location: 'Mapusa, Goa / Remote',
      duration: '2–3 Months',
      type: 'Internship · Unpaid',
      experience: 'Freshers Welcome',
      whatYoullDo: [
        'Assist with onboarding and support processes',
        'Manage documentation and operational workflows',
        'Collect customer feedback and improve processes',
      ],
      whatYoullLearn: [
        'Customer Success Management', 'Business Operations',
        'Process Documentation', 'Startup Operations'
      ],
      benefits: [
        'Internship Certificate',
        'Letter of Recommendation (Performance Based)',
        'Founder Mentorship',
        'Real Startup Experience',
      ],
    },
  ];

  readonly values = [
    { title: 'Clarity over cleverness', desc: 'We write software that is clear to read and reason about, not software that impresses with its complexity.' },
    { title: 'Ownership without micromanagement', desc: 'You take a problem from understanding to delivery. We expect judgment, not just execution.' },
    { title: 'Honest communication', desc: 'Say what you know, say what you do not know. Blockers raised early are solved problems — raised late, they become incidents.' },
    { title: 'Build for real users', desc: 'Every line of code reaches a person trying to complete a task. That context matters to everything we decide.' },
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Careers',
      description: 'Explore internship opportunities at RentPhoenix Technologies. Work directly with the founder and gain real startup experience from Goa, India.',
      keywords: 'careers RentPhoenix, internship Goa, startup internship India, tech internship'
    });
  }

  ngAfterViewInit(): void {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => io.observe(el));
  }
}
