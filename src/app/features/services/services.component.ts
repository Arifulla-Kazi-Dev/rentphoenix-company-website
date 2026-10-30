import { Component, OnInit, AfterViewInit, OnDestroy, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, Code2, Globe, Smartphone,
  Landmark, Zap, BarChart3, Check
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

interface Service {
  /** Anchor id, so other pages can link straight to a service. */
  id: string;
  icon: typeof Code2;
  title: string;
  short: string;
  desc: string;
  capabilities: string[];
  link?: { label: string; path: string };
}

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private observer?: IntersectionObserver;

  readonly ArrowRight = ArrowRight;
  readonly Check = Check;

  readonly services: Service[] = [
    {
      id: 'custom-software',
      icon: Code2,
      title: 'Custom Software Development',
      short: 'Purpose-built systems from scratch.',
      desc: 'We design and build software to match your exact workflow. No templates, no forced fits. Architecture designed first, then built with precision.',
      capabilities: [
        'System architecture and technical design',
        'Backend API and database design',
        'Frontend application development',
        'Testing and QA workflows',
        'Deployment and DevOps setup',
      ]
    },
    {
      id: 'web-apps',
      icon: Globe,
      title: 'Web Applications',
      short: 'Fast, focused, production-grade web apps.',
      desc: 'Modern web applications built with Angular and React ecosystems. Emphasis on performance, clear user experience, and maintainable codebases.',
      capabilities: [
        'SPA and multi-page applications',
        'Real-time features with Firebase',
        'Admin dashboards and internal tools',
        'Authentication and role-based access',
        'API integration and data management',
      ]
    },
    {
      id: 'mobile-apps',
      icon: Smartphone,
      title: 'Mobile Applications',
      short: 'Cross-platform apps built to perform.',
      desc: 'Cross-platform mobile development for Android and iOS. Single codebase, native performance, consistent experience across platforms.',
      capabilities: [
        'Flutter and React Native development',
        'Offline-first architecture',
        'Push notifications',
        'Device hardware integration',
        'App store deployment and maintenance',
      ]
    },
    {
      id: 'automation',
      icon: Zap,
      title: 'Automation & Workflow Tools',
      short: 'Eliminate repetitive work at scale.',
      desc: 'Systems that automate manual processes — data collection, notifications, document generation, scheduling, and coordination tasks.',
      capabilities: [
        'Process automation design',
        'Scheduled task and trigger systems',
        'Notification and alert pipelines',
        'Data transformation and ETL',
        'Integration between existing tools',
      ]
    },
    {
      id: 'government',
      icon: Landmark,
      link: { label: 'Government solutions in detail', path: '/government-solutions' },
      title: 'Government Solutions',
      short: 'Secure civic and administrative software.',
      desc: 'Digital platforms for government departments and public service organizations. Focus on compliance, security, and transparency.',
      capabilities: [
        'Citizen-facing portals and services',
        'Administrative workflow systems',
        'Document and record management',
        'Multi-user role access with audit trails',
        'Reporting and data visualization',
      ]
    },
    {
      id: 'enterprise',
      icon: BarChart3,
      title: 'Enterprise Platforms',
      short: 'Coordination tools for complex organizations.',
      desc: 'Multi-user platforms and dashboards for organizations with complex operations. Built for teams that need visibility and reliable data.',
      capabilities: [
        'Multi-tenant SaaS platform architecture',
        'Role-based dashboards and reporting',
        'Real-time data and live updates',
        'Audit trails and compliance logging',
        'Scalable cloud infrastructure',
      ]
    },
  ];

  readonly process = [
    { step: '01', title: 'Discovery', desc: 'We start by understanding the actual problem. Clear requirements, realistic scope, honest timeline.' },
    { step: '02', title: 'Architecture', desc: 'We design the system before writing a line of code. Data models, component structure, integrations — decided up front.' },
    { step: '03', title: 'Build', desc: 'Iterative development with regular working builds. We communicate blockers early, not after.' },
    { step: '04', title: 'Refine', desc: 'Feedback cycles before handoff. We stay until the software works the way it should.' },
    { step: '05', title: 'Deliver', desc: 'Deployment, documentation, and transition. No drop-and-run.' },
  ];

  readonly stack = ['Angular', 'React', 'Flutter', 'React Native', 'Firebase'];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Services — Custom Software, Web & Mobile Apps, Automation',
      description: 'Software development services from RentPhoenix Technologies: web apps, mobile, automation, government solutions, and enterprise platforms.',
      keywords: 'software development services India, web application development, mobile app development, automation software'
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
