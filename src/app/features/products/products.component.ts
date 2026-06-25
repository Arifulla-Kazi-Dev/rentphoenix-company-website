import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, CheckCircle2, FileText, Bell,
  Users, BarChart3, Shield, Zap, Lock, RefreshCw
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;

  // Real product modules
  readonly modules = [
    {
      icon: FileText,
      title: 'Rent Tracking',
      desc: 'Track rent collection status, payment history, and outstanding amounts. Replaces the scattered spreadsheet.'
    },
    {
      icon: Bell,
      title: 'Automated Reminders',
      desc: 'Configurable notification workflows for rent due dates, overdue alerts, and lease renewal.'
    },
    {
      icon: Users,
      title: 'Tenant Management',
      desc: 'Tenant profiles, contact details, lease terms, and communication history in one organized place.'
    },
    {
      icon: FileText,
      title: 'Digital Documents',
      desc: 'Agreements, receipts, and records stored digitally. No more paper files or WhatsApp screenshots.'
    },
    {
      icon: BarChart3,
      title: 'Reports & Overview',
      desc: 'Aggregate view of your property portfolio status, collection rates, and payment trends.'
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      desc: 'Separate access levels for landlords, agents, and property managers. Each sees what they need.'
    },
    {
      icon: Zap,
      title: 'Real-Time Sync',
      desc: 'Updates reflected immediately across all devices. No refresh, no stale data.'
    },
    {
      icon: Lock,
      title: 'Secure by Design',
      desc: 'Firestore Security Rules enforced at the database level. Data isolation per account.'
    },
  ];

  readonly problemPoints = [
    'Rent payments tracked in WhatsApp messages',
    'Payment receipts stored as phone photos',
    'Tenant agreements in paper folders',
    'Overdue follow-ups done manually per tenant',
    'No clear view of who has paid this month',
    'New property managers have no context',
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'RentPhoenix OS — Rental Management Platform',
      description: 'RentPhoenix OS is a rental management system built to replace scattered spreadsheets, WhatsApp follow-ups, and paper records with one organized platform.',
      keywords: 'rental management software, landlord software India, property management platform, rent tracking app'
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
