import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, ExternalLink, CheckCircle2, FileText, Bell,
  Users, BarChart3, Shield, Lock, ScanLine, QrCode, Wrench, MessageCircle,
  WifiOff, Globe, Smartphone, Play, Apple
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { ProductSwitcherComponent } from '../../shared/components/product-switcher/product-switcher.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule, ProductSwitcherComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly CheckCircle2 = CheckCircle2;
  readonly appUrl = 'https://www.rentphoenixos.in';
  readonly webAppUrl = 'https://www.rentphoenixos.in/listing';
  readonly playStoreUrl = 'https://play.google.com/store/apps/details?id=in.rentphoenixos.www.twa&pcampaignid=web_share';
  readonly Play = Play;
  readonly Apple = Apple;

  // The problem — real, specific pain points
  readonly problems = [
    {
      icon: '📱',
      title: 'WhatsApp Confusion',
      desc: '"Did you send rent?" lost in a hundred other chats. Screenshots as receipts. Receipts nowhere. Chaos every single month.'
    },
    {
      icon: '📄',
      title: 'Lost Documents',
      desc: 'Rent agreements buried in email. Deposit receipts in a folder somewhere. That Aadhaar copy from two years ago — good luck finding it.'
    },
    {
      icon: '🤔',
      title: 'Tracking From Memory',
      desc: '"Did they pay last month?" Manually cross-checking UPI screenshots across every property, every single month, and still not sure.'
    }
  ];

  // What's inside — real, shipped modules
  readonly modules = [
    {
      icon: Bell,
      title: 'WhatsApp Rent Reminders',
      badge: 'Live',
      desc: 'Automated rent-due and payment-confirmation reminders sent straight to WhatsApp. Live and running in production today.'
    },
    {
      icon: FileText,
      title: 'Rent Tracking',
      desc: 'Mark rent paid, pending, or overdue in one tap. Landlord and tenant see the same live status — no confirmation texts needed.'
    },
    {
      icon: Users,
      title: 'Tenant & Property Management',
      desc: 'Full tenant profiles, lease terms, and a property portfolio view, all in one coordinated dashboard.'
    },
    {
      icon: ScanLine,
      title: 'Digital Agreement Scanner',
      desc: 'Upload a photo or PDF of an existing rental agreement and it gets digitized automatically — no retyping the whole thing.'
    },
    {
      icon: Lock,
      title: 'Document Locker',
      desc: 'Agreements, ID copies, and receipts stored securely and accessible from any device, replacing scattered folders and screenshots.'
    },
    {
      icon: QrCode,
      title: 'Payment Analytics & QR Payments',
      desc: 'QR-based and UPI payment tracking with collection-rate analytics across your whole portfolio, exportable for records.'
    },
    {
      icon: Wrench,
      title: 'Maintenance Coordination',
      desc: 'In-app maintenance requests with status tracking, plus a private directory of electricians, plumbers, and painters you trust.'
    },
    {
      icon: MessageCircle,
      title: 'Landlord–Tenant Chat',
      desc: 'Direct in-app messaging keeps day-to-day coordination out of WhatsApp groups and in one searchable place.'
    },
    {
      icon: WifiOff,
      title: 'Offline Access',
      desc: 'Already-loaded rent, document, and tenant data stays visible with no connection. Pending uploads sync automatically once you reconnect.'
    },
  ];

  // How it works — three core workflows
  readonly howItWorks = [
    {
      num: '01',
      title: 'Rent tracking in real time.',
      desc: 'Mark rent paid with one tap. Your tenant sees it immediately on their own dashboard — not one follow-up text needed.',
      bullets: [
        'Mark paid, pending, or overdue instantly',
        'Landlord and tenant see the same live status',
        'Full monthly history, exportable for records'
      ],
      chips: ['Rent — Paid ✓', 'Next Due — 5th']
    },
    {
      num: '02',
      title: 'Documents, secure and always there.',
      desc: 'Upload rent agreements, ID copies, and receipts once. Stored securely and accessible from any device — no email threads, no lost folders.',
      bullets: [
        'Upload from phone or desktop in any format',
        'Digitize an existing agreement automatically',
        'Tenants only ever see their own documents'
      ],
      chips: ['Agreement — Active ✓', 'Documents — 4 Stored']
    },
    {
      num: '03',
      title: 'Complete tenant & property management.',
      desc: 'From onboarding to move-out, every tenant interaction lives in one place — maintenance, payment history, and lease details included.',
      bullets: [
        'Full tenant profile with payment timeline',
        'In-app maintenance requests with status tracking',
        'Automated WhatsApp reminders on every due date'
      ],
      chips: ['Tenants — 6 Active', 'Reminder Sent ✓']
    }
  ];

  readonly platforms = [
    {
      icon: Globe,
      title: 'Web App',
      desc: 'Works in any modern browser on desktop or mobile — nothing to install, and it can be added to your home screen for quick access.',
      store: { href: this.webAppUrl, icon: Globe, line1: 'Open The', line2: 'Web App' }
    },
    {
      icon: Smartphone,
      title: 'Android App',
      desc: 'A native Android app built with Flutter, carrying the full platform — rent tracking, documents, and reminders — to your pocket.',
      store: { href: this.playStoreUrl, icon: this.Play, line1: 'GET IT ON', line2: 'Google Play' }
    },
    {
      icon: Apple,
      title: 'iOS App',
      desc: 'A native iOS app is on the way, bringing the same experience to iPhone.',
      store: { disabled: true, icon: this.Apple, line1: 'COMING SOON', line2: 'iOS — Building' }
    }
  ];

  readonly trustPoints = [
    {
      icon: Shield,
      title: 'Isolated by design',
      desc: 'Firestore Security Rules enforced at the database level, with data isolated per account.'
    },
    {
      icon: Lock,
      title: 'Role-based access',
      desc: 'Landlords, tenants, and property managers each see only what they need.'
    },
    {
      icon: WifiOff,
      title: 'Offline-safe',
      desc: 'View your data with no connection; uploads sync automatically once you’re back online.'
    },
    {
      icon: Users,
      title: 'Free for tenants, always',
      desc: 'Every tenant invited to the platform uses it at no cost, for as long as they rent through it.'
    }
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'RentPhoenix OS — Rental Management Platform, Live Today',
      description: 'RentPhoenix OS is a live rental management platform for landlords and tenants — real-time rent tracking, automated WhatsApp reminders, an OCR agreement scanner, and a full Android app.',
      keywords: 'rental management software, landlord software India, property management platform, rent tracking app, WhatsApp rent reminders'
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
