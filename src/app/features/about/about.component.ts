import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule,
  ArrowRight, ExternalLink, Linkedin
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly Linkedin = Linkedin;

  readonly values = [
    {
      title: 'Clarity Over Cleverness',
      desc: 'The most valuable code is code that the next engineer can understand immediately. We optimize for readability and maintainability over clever abstractions.'
    },
    {
      title: 'Build to Last',
      desc: 'We design systems for the long term — architecture that scales, documentation that persists, and decisions made with maintenance in mind from day one.'
    },
    {
      title: 'Honest Communication',
      desc: 'We say what we can build, when we can build it, and what trade-offs come with each decision. No overcommitment, no silent scope creep, no hiding bad news.'
    },
    {
      title: 'Meaningful Work',
      desc: 'We choose projects where the software genuinely improves how something works — not just adding features to something that already exists in a hundred variations.'
    },
  ];

  readonly founderBio = [
    "Arifulla Kazi founded RentPhoenix Technologies to address a problem he observed firsthand — the coordination gap in rental property management. The problem was personal: navigating the friction between landlords, tenants, and property coordination with no reliable software to hold it together. The company started with a rental management platform and has expanded into a broader software studio focused on enterprise and government technology.",
    "He holds a Bachelor of Engineering in Electronics and Communication Engineering from Agnel Institute of Technology & Design, Goa (2019–2023). Prior to founding RentPhoenix, he worked as a Network Engineer at United Telecoms Limited, developing experience in infrastructure reliability, technical operations, and systems under real-world constraints.",
    "RentPhoenix Technologies is incubated at the Centre for Incubation and Business Acceleration (CIBA), Goa, and is recognized under the DPIIT Startup India program.",
  ];

  readonly founderMessage = "I started RentPhoenix because I believe most coordination problems that slow businesses down are fundamentally software problems — and that good software can solve them cleanly. We build systems that make organizations more capable, more transparent, and more efficient. That is the work we are here to do.";

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'About RentPhoenix Technologies — Company Story, Vision & Mission',
      description: 'Learn who we are, why we exist, and what we are building. RentPhoenix Technologies is an enterprise software studio from Goa, India.',
      keywords: 'RentPhoenix Technologies, about us, company story, founder, vision, mission, Goa India startup',
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
