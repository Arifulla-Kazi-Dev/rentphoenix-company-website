import {
  Component, inject, signal, computed, HostListener, ChangeDetectionStrategy
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  LucideAngularModule,
  Menu, X, Sun, Moon, ChevronDown, ArrowRight,
  Code2, Globe, Smartphone, Zap, BarChart3, Shield,
  Package, Wallet
} from 'lucide-angular';
import { ThemeService } from '../../../core/services/theme.service';

export interface PanelLink {
  icon: any;
  label: string;
  desc: string;
  path: string;
  /** Section id on the target page, e.g. a service on /services. */
  fragment?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private theme = inject(ThemeService);

  // Icons
  readonly MenuIcon = Menu;
  readonly XIcon = X;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;
  readonly ChevronIcon = ChevronDown;
  readonly ArrowIcon = ArrowRight;
  readonly PackageIcon = Package;
  readonly WalletIcon = Wallet;

  // State
  isScrolled = signal(false);
  activePanel = signal<string | null>(null);
  mobileOpen = signal(false);
  mobileExpanded = signal<string | null>(null);
  isDark = computed(() => this.theme.theme() === 'dark');

  private closeTimer: ReturnType<typeof setTimeout> | null = null;

  readonly navItems = [
    { id: 'products', label: 'Products' },
    { id: 'services', label: 'Services' },
  ];

  readonly pageLinks = [
    { label: 'Our story', path: '/about'   },
    { label: 'Team',      path: '/team'    },
    { label: 'Careers',   path: '/careers' },
  ];

  readonly servicesLinks: PanelLink[] = [
    { icon: Code2,      label: 'Custom Software',      desc: 'Purpose-built systems from scratch',     path: '/services', fragment: 'custom-software' },
    { icon: Globe,      label: 'Web Applications',     desc: 'Production-grade web apps',              path: '/services', fragment: 'web-apps' },
    { icon: Smartphone, label: 'Mobile Applications',  desc: 'Cross-platform iOS & Android',           path: '/services', fragment: 'mobile-apps' },
    { icon: Zap,        label: 'Automation',           desc: 'Workflow tools that remove busywork',    path: '/services', fragment: 'automation' },
    { icon: BarChart3,  label: 'Enterprise Platforms', desc: 'Multi-user coordinated systems',         path: '/services', fragment: 'enterprise' },
    { icon: Shield,     label: 'Government Solutions', desc: 'Secure public sector software',          path: '/government-solutions' },
  ];

  @HostListener('window:scroll')
  onScroll(): void { this.isScrolled.set(window.scrollY > 12); }

  // ── Desktop panel management (timer-based, zero hover gap) ──

  openPanel(id: string): void {
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
    this.activePanel.set(id);
  }

  scheduleClose(): void {
    this.closeTimer = setTimeout(() => {
      this.activePanel.set(null);
      this.closeTimer = null;
    }, 150);
  }

  cancelClose(): void {
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
  }

  togglePanel(id: string): void {
    if (this.activePanel() === id) this.activePanel.set(null);
    else this.openPanel(id);
  }

  closePanel(): void {
    this.activePanel.set(null);
    if (this.closeTimer) { clearTimeout(this.closeTimer); this.closeTimer = null; }
  }

  // ── Mobile ──

  toggleMobile(): void {
    const next = !this.mobileOpen();
    this.mobileOpen.set(next);
    if (!next) this.mobileExpanded.set(null);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
    this.mobileExpanded.set(null);
    document.body.style.overflow = '';
  }

  toggleMobileExpand(id: string): void {
    this.mobileExpanded.update(v => v === id ? null : id);
  }

  closeAll(): void {
    this.closePanel();
    this.closeMobile();
  }

  toggleTheme(): void { this.theme.toggle(); }
}
