import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, ExternalLink, Github } from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly Github = Github;

  // Verified from portfolio: https://arifullakaziportfolio-git-main-arifulla-kazis-projects.vercel.app/
  readonly projects = [
    {
      title: 'Expense Tracker',
      desc: 'A personal finance management application for tracking income and expenses across categories. Includes filtering, summary views, and CSV export.',
      category: 'Web App',
    },
    {
      title: 'Gamified Learning Platform',
      desc: 'An educational platform with gamification mechanics — points, streaks, and progress tracking to increase engagement in learning modules.',
      category: 'Platform',
    },
    {
      title: 'Smart Traffic Light System',
      desc: 'An IoT-adjacent simulation system for intelligent traffic signal management using sensor data to optimize signal timing.',
      category: 'Systems',
    },
    {
      title: 'Learning Dashboard',
      desc: 'A student-facing dashboard for tracking course completion, assignment progress, and learning analytics.',
      category: 'Dashboard',
    },
    {
      title: 'Amazon Clone',
      desc: 'A front-end recreation of the Amazon shopping experience with product listings, cart functionality, and authentication.',
      category: 'UI Clone',
    },
    {
      title: 'Recipe Finder',
      desc: 'A web application that fetches and displays recipes from an external API, with filtering by ingredients and cuisine type.',
      category: 'Web App',
    },
    {
      title: 'RentPhoenix OS',
      desc: 'The flagship product — a rental management platform replacing scattered landlord-tenant coordination with a single organized system.',
      category: 'SaaS Product',
      flagship: true,
    },
    {
      title: 'CO-Founder',
      desc: 'A multi-tenant finance OS for startup founders — funding, expenses, salaries, compliance, and runway tracking with role-based team access.',
      category: 'SaaS Product',
      flagship: true,
    },
  ];

  readonly categories = ['All', 'Web App', 'Platform', 'Dashboard', 'SaaS Product', 'Systems', 'UI Clone'];
  selectedCategory = 'All';

  get filteredProjects() {
    if (this.selectedCategory === 'All') return this.projects;
    return this.projects.filter(p => p.category === this.selectedCategory);
  }

  selectCategory(cat: string): void {
    this.selectedCategory = cat;
  }

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Portfolio',
      description: 'Software projects by RentPhoenix Technologies. Real work: web apps, platforms, dashboards, and the RentPhoenix OS product.',
      keywords: 'software portfolio India, Angular projects, Firebase projects, Goa developer portfolio'
    });
  }

  ngAfterViewInit(): void {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => io.observe(el));
  }
}
