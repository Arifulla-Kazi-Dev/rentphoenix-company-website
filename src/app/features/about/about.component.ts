import { Component, OnInit, AfterViewInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, ArrowUpRight, Linkedin } from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { FOUNDER_PHOTO, STORY_STEPS } from '../../core/data/company';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private observer?: IntersectionObserver;

  readonly ArrowRight = ArrowRight;
  readonly ArrowUpRight = ArrowUpRight;
  readonly Linkedin = Linkedin;

  readonly founderPhoto = FOUNDER_PHOTO;
  readonly story = STORY_STEPS;

  readonly glance = [
    { label: 'Legal entity',  value: 'RentPhoenix Technologies Private Limited' },
    { label: 'Headquarters',  value: 'Mapusa, Goa · remote-friendly' },
    { label: 'Recognition',   value: 'DPIIT · Startup India' },
    { label: 'Incubation',    value: 'CIBA Goa' },
    { label: 'In production', value: 'RentPhoenix OS · CO-Founder' },
    { label: 'Founder',       value: 'Arifulla Kazi' },
  ];

  readonly values = [
    {
      title: 'Clarity over cleverness',
      desc: 'The most valuable code is code that the next engineer can understand immediately. We optimise for readability and maintainability over clever abstractions.'
    },
    {
      title: 'Built to last',
      desc: 'We design systems for the long term — architecture that scales, documentation that persists, and decisions made with maintenance in mind from day one.'
    },
    {
      title: 'Honest communication',
      desc: 'We say what we can build, when we can build it, and what trade-offs come with each decision. No overcommitment, no silent scope creep, no hiding bad news.'
    },
    {
      title: 'Meaningful work',
      desc: 'We choose projects where the software genuinely improves how something works — not just adding features to something that already exists in a hundred variations.'
    },
  ];

  readonly founderBio = [
    'Arifulla Kazi founded RentPhoenix Technologies to address a problem he observed first-hand — the coordination gap in rental property management. Landlords, tenants and property coordination had no reliable software to hold them together. The company started with a rental management platform and has expanded into a broader software studio focused on enterprise and government technology.',
    'Before RentPhoenix, he worked as a Network Engineer at United Telecoms Limited, building experience in infrastructure reliability, technical operations, and systems under real-world constraints.',
  ];

  readonly founderFacts = [
    { label: 'Education',  value: 'BE, Electronics & Communication Engineering — Agnel Institute of Technology & Design, Goa (2019–2023)' },
    { label: 'Previously', value: 'Network Engineer, United Telecoms Limited' },
    { label: 'Incubation', value: 'Centre for Incubation and Business Acceleration (CIBA), Goa' },
  ];

  readonly founderMessage = 'I started RentPhoenix because I believe most coordination problems that slow businesses down are fundamentally software problems — and that good software can solve them cleanly. We build systems that make organisations more capable, more transparent, and more efficient. That is the work we are here to do.';

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Our Story — RentPhoenix Technologies, a Software Company from Goa',
      description: 'How RentPhoenix Technologies started, who is behind it, and what we believe. A DPIIT-recognised software company from Goa, incubated at CIBA.',
      keywords: 'RentPhoenix Technologies, about us, company story, Arifulla Kazi, founder, vision, mission, Goa India startup',
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
