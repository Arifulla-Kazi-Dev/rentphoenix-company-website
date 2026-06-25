import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, Shield, FileText, Users,
  BarChart3, Lock, Globe, CheckCircle2
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-government',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './government.component.html',
  styleUrl: './government.component.scss'
})
export class GovernmentComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;

  readonly solutions = [
    {
      icon: Globe,
      title: 'Citizen Service Portals',
      desc: 'Public-facing web applications for service requests, applications, and status tracking. Designed for low-bandwidth users and accessibility.'
    },
    {
      icon: FileText,
      title: 'Document & Record Management',
      desc: 'Digitizing paper records and document workflows. Searchable archives, version control, and role-based access for internal teams.'
    },
    {
      icon: Users,
      title: 'Administrative Workflow Systems',
      desc: 'Internal platforms that coordinate work between departments, eliminate redundant data entry, and create traceable approval chains.'
    },
    {
      icon: BarChart3,
      title: 'Reporting & Data Visualization',
      desc: 'Dashboards for decision-makers that surface real-time status, trends, and operational data — replacing spreadsheet-based reporting.'
    },
    {
      icon: Shield,
      title: 'Audit Trails & Compliance',
      desc: 'Every action logged, every change tracked. Systems designed for accountability and inspection by oversight bodies.'
    },
    {
      icon: Lock,
      title: 'Secure Data Architecture',
      desc: 'Role-based access controls, data encryption at rest and in transit, and security rules enforced at the database level.'
    },
  ];

  readonly principles = [
    'Security and access control designed in from the start, not added later',
    'Audit trails for all sensitive data operations',
    'Accessibility for users with varying technical literacy',
    'Documentation and handoff so internal IT teams can maintain and extend',
    'No dependency on a single vendor for ongoing operations',
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Government Solutions',
      description: 'Digital software solutions for government departments and civic organizations. Secure, compliant, and built for public sector accountability.',
      keywords: 'government software India, civic technology, digital public services, e-governance development'
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
