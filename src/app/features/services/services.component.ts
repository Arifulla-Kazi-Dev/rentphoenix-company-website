import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, Code2, Globe, Smartphone,
  Landmark, Zap, BarChart3, CheckCircle2
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-services',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;

  readonly services = [
    {
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
      icon: Landmark,
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

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Services',
      description: 'Software development services from RentPhoenix Technologies: web apps, mobile, automation, government solutions, and enterprise platforms.',
      keywords: 'software development services India, web application development, mobile app development, automation software'
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
