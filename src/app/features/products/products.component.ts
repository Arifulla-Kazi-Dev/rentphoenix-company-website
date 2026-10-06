import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ExternalLink, Users, Shield, Lock, WifiOff, Globe, Smartphone, Play, Apple
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { ProductSwitcherComponent } from '../../shared/components/product-switcher/product-switcher.component';
import { RpShowcaseComponent } from './rp-showcase/rp-showcase.component';

@Component({
  selector: 'app-products',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule, ProductSwitcherComponent, RpShowcaseComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ExternalLink = ExternalLink;
  readonly appUrl = 'https://www.rentphoenixos.in';
  readonly webAppUrl = 'https://www.rentphoenixos.in/listing';
  readonly playStoreUrl = 'https://play.google.com/store/apps/details?id=in.rentphoenixos.www.twa&pcampaignid=web_share';
  readonly Play = Play;
  readonly Apple = Apple;

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
