import { Component, OnInit, AfterViewInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ArrowRight, ArrowUpRight, Globe, Play, Package, Wallet, MapPin
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { FOUNDER_PHOTO, STORY_STEPS } from '../../core/data/company';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private observer?: IntersectionObserver;

  // Icons
  readonly ArrowRight = ArrowRight;
  readonly ArrowUpRight = ArrowUpRight;
  readonly Globe = Globe;
  readonly Play = Play;
  readonly Package = Package;
  readonly Wallet = Wallet;
  readonly MapPin = MapPin;

  readonly webAppUrl = 'https://www.rentphoenixos.in/listing';
  readonly playStoreUrl = 'https://play.google.com/store/apps/details?id=in.rentphoenixos.www.twa&pcampaignid=web_share';
  readonly email = 'support@rentphoenixos.in';

  readonly founderPhoto = FOUNDER_PHOTO;

  readonly facts = [
    { value: '2',        label: 'products live in production' },
    { value: '3',        label: 'recognitions: DPIIT, Startup India, CIBA Goa' },
    { value: '1–2 days', label: 'to hear back from us' },
    { value: 'Direct',   label: 'access to the engineers building your software' },
  ];

  readonly story = STORY_STEPS;

  readonly services = [
    { title: 'Custom software',         desc: 'Built to your exact workflow. No templates, no forced fits.' },
    { title: 'Web applications',        desc: 'Fast, focused, production-grade web apps.' },
    { title: 'Mobile applications',     desc: 'Android and iOS from one codebase, with native performance.' },
    { title: 'Automation & workflows',  desc: 'Tools that eliminate repetitive work at scale.' },
    { title: 'Enterprise platforms',    desc: 'Coordination tools and dashboards for complex organisations.' },
    { title: 'Government solutions',    desc: 'Citizen portals, record management, reporting and audit trails.' },
  ];

  readonly values = [
    { title: 'Clarity over cleverness', desc: 'Code the next engineer can understand immediately.' },
    { title: 'Built to last',           desc: 'Documentation and clean architecture are part of the deliverable.' },
    { title: 'Honest communication',    desc: 'No overcommitment, no silent scope creep, no hiding bad news.' },
    { title: 'Meaningful work',         desc: 'Software that genuinely improves how something works.' },
  ];

  readonly roles = [
    'Business Development & Market Research Intern',
    'Quality Assurance (QA) Intern',
    'Customer Success & Operations Intern',
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'RentPhoenix Technologies — A Young Software Company, Built Properly',
      description: 'RentPhoenix Technologies is a DPIIT-recognised software company from Goa. We build and run RentPhoenix OS and CO-Founder, and build custom software for businesses and government.',
      keywords: 'RentPhoenix, software company Goa, rental management software, startup finance software, custom software development, government technology India',
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
