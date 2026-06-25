import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  ArrowRight, Code2, Globe, Smartphone, Zap, BarChart3, Landmark,
  Building2, Briefcase, TrendingUp, Home as HouseIcon,
  CheckCircle2, ChevronRight
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  // Icons
  readonly ArrowRight = ArrowRight;
  readonly CheckCircle2 = CheckCircle2;
  readonly ChevronRight = ChevronRight;

  readonly services = [
    { icon: Code2,      title: 'Custom Software Development', desc: 'Purpose-built systems engineered to your exact requirements — not adapted from templates.' },
    { icon: Globe,      title: 'Web Applications',            desc: 'Production-grade web apps built for speed, reliability, and long-term maintainability.' },
    { icon: Smartphone, title: 'Mobile Applications',         desc: 'Cross-platform iOS and Android apps with native-quality performance and user experience.' },
    { icon: Zap,        title: 'AI & Automation',             desc: 'Intelligent workflow systems that eliminate repetitive work and surface what matters.' },
    { icon: BarChart3,  title: 'Enterprise Platforms',        desc: 'Multi-user coordinated systems and operational dashboards for complex organizations.' },
    { icon: Landmark,   title: 'Government Solutions',        desc: 'Secure, compliant digital infrastructure for public sector and government organizations.' },
  ];

  readonly industries = [
    {
      icon: HouseIcon,
      title: 'Real Estate & Property',
      desc: 'Rental management, property coordination, and landlord-tenant systems. RentPhoenix OS was built for this vertical.'
    },
    {
      icon: Building2,
      title: 'Government & Public Sector',
      desc: 'Digital infrastructure, citizen service portals, document management, and administrative workflow automation.'
    },
    {
      icon: Briefcase,
      title: 'Enterprise & Corporate',
      desc: 'Internal platforms, operational dashboards, and process automation systems for large and mid-size organizations.'
    },
    {
      icon: TrendingUp,
      title: 'Startups & Growing Businesses',
      desc: 'MVPs, SaaS products, and scalable platforms for companies that need to move fast without cutting corners.'
    },
  ];

  readonly differentiators = [
    {
      num: '01',
      title: 'Technical Depth',
      desc: 'We design at the architecture level — data models, system boundaries, component contracts — before writing a line of code. The quality shows in maintainability, not just first launch.'
    },
    {
      num: '02',
      title: 'Focused Team, High Ownership',
      desc: 'Small team means you work directly with the engineers building your software. No delegation chain, no context loss between specification and implementation.'
    },
    {
      num: '03',
      title: 'Built to Last',
      desc: 'We build software the next engineer can understand and extend. Documentation, clean architecture, and code quality are part of the deliverable, not afterthoughts.'
    },
    {
      num: '04',
      title: 'Transparent Process',
      desc: 'We commit to what we can deliver. Honest timelines, clear communication, and early escalation when something changes. No surprise scope creep.'
    },
  ];

  readonly processSteps = [
    { num: '01', title: 'Discovery',    desc: 'Understanding the real problem before writing a single line of code.' },
    { num: '02', title: 'Architecture', desc: 'System design, data models, and technical decisions made upfront.' },
    { num: '03', title: 'Build',        desc: 'Iterative development with regular working builds and clear communication.' },
    { num: '04', title: 'Refine',       desc: 'Feedback cycles, quality review, and adjustments before handoff.' },
    { num: '05', title: 'Deliver',      desc: 'Deployment, documentation, and transition support included.' },
  ];

  readonly capabilities = [
    'Custom Software Development',
    'Web & Mobile Applications',
    'AI & Automation Platforms',
    'Government Technology',
    'Enterprise Solutions',
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'RentPhoenix Technologies — Enterprise Software Built With Purpose',
      description: 'Custom digital products, automation platforms, and enterprise solutions designed for businesses and government organizations. Built with technical depth from Goa, India.',
      keywords: 'enterprise software, custom software development, web applications, mobile apps, government technology, Goa India',
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
