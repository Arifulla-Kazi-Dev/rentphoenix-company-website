import { Component, OnInit, AfterViewInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideAngularModule, ArrowRight, ExternalLink, CheckCircle2, Wallet, Receipt,
  Banknote, Landmark, TrendingUp, CalendarCheck, Clock3, UsersRound, NotebookPen,
  ShieldCheck, Lock
} from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { ProductSwitcherComponent } from '../../shared/components/product-switcher/product-switcher.component';

@Component({
  selector: 'app-co-founder',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, RouterLink, LucideAngularModule, ProductSwitcherComponent],
  templateUrl: './co-founder.component.html',
  styleUrl: './co-founder.component.scss'
})
export class CoFounderComponent implements OnInit, AfterViewInit {
  private seo = inject(SeoService);

  readonly ArrowRight = ArrowRight;
  readonly ExternalLink = ExternalLink;
  readonly CheckCircle2 = CheckCircle2;
  readonly appUrl = 'https://arifulla-kazi-dev.github.io/Expense-Tracker-for-Founders/';

  readonly problems = [
    {
      icon: '📊',
      title: 'No Real-Time Runway View',
      desc: 'Funding in one sheet, expenses in another, salaries tracked from memory. By the time you calculate runway, the number is already out of date.'
    },
    {
      icon: '📅',
      title: 'Compliance Deadlines Slip Through',
      desc: 'GST filings, ROC renewals, license dates — spread across reminders, emails, and a CA’s WhatsApp message you saw too late.'
    },
    {
      icon: '🤷',
      title: 'Spend Decisions Made Blind',
      desc: 'Six months later nobody remembers why a cost was approved, what it was expected to return, or who signed off on it.'
    }
  ];

  readonly modules = [
    {
      icon: Wallet,
      title: 'Funding Tracker',
      desc: 'Record every source of company capital — grants, investor checks, owner contributions, revenue, credit lines — in one ledger.'
    },
    {
      icon: Receipt,
      title: 'Expense Manager',
      desc: 'Control paid, pending, and recurring expenses across categories, with partial payments and funding-source attribution.'
    },
    {
      icon: Banknote,
      title: 'Team Payments',
      desc: 'Manage salaries, stipends, and contractor payments — including unpaid or equity-only co-founders — against monthly commitments.'
    },
    {
      icon: Landmark,
      title: 'Startup Costs',
      desc: 'Track one-time company setup costs — registration, legal, trademark, domains — in a permanent ledger, not lost in a folder.'
    },
    {
      icon: TrendingUp,
      title: 'Recurring Costs & Auto-Billing',
      desc: 'Subscriptions bill themselves. An auto-billing engine runs catch-up charges and projects burn before it compounds.'
    },
    {
      icon: CalendarCheck,
      title: 'Compliance Calendar',
      desc: 'GST, ROC filings, licenses, and renewals on a calendar that auto-advances due dates the moment you mark one done.'
    },
    {
      icon: Clock3,
      title: 'Attendance & Leave',
      desc: 'Daily rotating check-in codes for your team, plus a full leave-request and approval workflow — founders are always shown present.'
    },
    {
      icon: UsersRound,
      title: 'Team & Role-Based Access',
      desc: 'Ten distinct roles — co-founder, finance, HR, mentor, investor, auditor, CA — each with permission-scoped access via invite link.'
    },
    {
      icon: NotebookPen,
      title: 'Founder Notes',
      desc: 'A lightweight decision journal — reason, expected benefit, priority, ROI — attached to the spend it explains.'
    },
    {
      icon: TrendingUp,
      title: 'Reports & Runway Analytics',
      desc: 'An operating score, quarter burn forecast, and category concentration risk — exportable as JSON, CSV, or PDF.'
    }
  ];

  readonly howItWorks = [
    {
      num: '01',
      title: 'One ledger for funding and spend.',
      desc: 'Every rupee raised and every rupee spent lives in the same place — no cross-checking a funding sheet against an expense sheet.',
      bullets: [
        'Funding sources and expenses linked by attribution',
        'Startup costs and recurring costs tracked separately from one-off spend',
        'Full history, exportable for taxes and investor updates'
      ],
      chips: ['Runway — 8.4 months', 'Burn — ₹4.2L/mo']
    },
    {
      num: '02',
      title: 'Runway you can see before it’s a crisis.',
      desc: 'The dashboard computes runway, cash allocation, and category pressure live — not a spreadsheet formula that breaks the moment someone edits the wrong cell.',
      bullets: [
        'Proactive alerts when runway drops below a healthy floor',
        'Category-level burn breakdown, not just a total',
        'Decision log ties spend to the reasoning behind it'
      ],
      chips: ['Runway below floor ⚠', 'Cash allocation — healthy']
    },
    {
      num: '03',
      title: 'Bring your team in, with real access control.',
      desc: 'Invite a co-founder, finance manager, HR lead, mentor, investor, or your CA — each sees exactly what their role allows, enforced at the database level.',
      bullets: [
        'Ten roles with sensible permission defaults',
        'Per-member permission overrides when a role needs an exception',
        'Shareable invite links, including a one-tap WhatsApp share'
      ],
      chips: ['Invite sent ✓', 'Role — Finance Manager']
    }
  ];

  readonly trustPoints = [
    {
      icon: ShieldCheck,
      title: 'Enforced at the database',
      desc: 'Company-scoped Firestore rules check role and permission on every read and write — not just hidden in the UI.'
    },
    {
      icon: Lock,
      title: 'Google sign-in only',
      desc: 'No passwords to leak. Every account is a real, verified Google identity.'
    },
    {
      icon: UsersRound,
      title: 'Permission overrides, not just roles',
      desc: 'Grant or restrict a specific member beyond their role default, without inventing a new role.'
    },
    {
      icon: CalendarCheck,
      title: 'Built for Indian compliance',
      desc: 'INR by default, GST/ROC filing categories, and an Indian public holiday calendar baked in.'
    }
  ];

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'CO-Founder — Founder Finance OS for Startups, Live Today',
      description: 'CO-Founder is a live multi-tenant finance OS for startup founders — funding, expenses, salaries, compliance, and runway tracking with role-based team access.',
      keywords: 'startup finance software, founder finance tracker, runway tracker India, startup compliance software, GST ROC tracker'
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
