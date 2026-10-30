import {
  Component, OnInit, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild,
  ChangeDetectionStrategy, computed, inject, signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, ArrowRight, ArrowUpRight, RotateCw, LayoutGrid, Network, Plus } from 'lucide-angular';
import { SeoService } from '../../core/services/seo.service';
import { TEAM, TeamMember } from '../../core/data/team';

type Filter = 'all' | 'leadership' | 'team' | 'alumni';
type View = 'badges' | 'structure';

/** Maximum badge tilt in degrees while the pointer moves across it. */
const MAX_TILT = 9;

@Component({
  selector: 'app-team',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private zone = inject(NgZone);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;
  private cleanups: (() => void)[] = [];

  @ViewChild('badgeGrid') private badgeGrid?: ElementRef<HTMLElement>;

  readonly ArrowRight = ArrowRight;
  readonly ArrowUpRight = ArrowUpRight;
  readonly RotateCw = RotateCw;
  readonly LayoutGrid = LayoutGrid;
  readonly Network = Network;
  readonly Plus = Plus;

  readonly team = TEAM;
  // Current people by group; anyone who has finished their time with us is listed under alumni
  readonly leadership = TEAM.filter(m => m.group === 'leadership' && !m.former);
  readonly members = TEAM.filter(m => m.group === 'team' && !m.former);
  readonly alumni = TEAM.filter(m => m.former);

  // Empty groups are hidden, e.g. "Team" while every current team member is in leadership
  readonly filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all' as Filter,  label: 'Everyone',   count: TEAM.length },
    { id: 'leadership' as Filter, label: 'Leadership', count: this.leadership.length },
    { id: 'team' as Filter, label: 'Team',       count: this.members.length },
    { id: 'alumni' as Filter, label: 'Alumni',     count: this.alumni.length },
  ].filter(f => f.id === 'all' || f.count > 0);

  readonly filter = signal<Filter>('all');
  readonly view = signal<View>('badges');
  readonly flipped = signal<ReadonlySet<string>>(new Set());
  /** Badge briefly highlighted after it is picked in the structure view. */
  readonly spotlight = signal<string | null>(null);

  readonly filterIndex = computed(() => this.filters.findIndex(f => f.id === this.filter()));
  readonly visible = computed(() => {
    switch (this.filter()) {
      case 'leadership': return this.leadership;
      case 'team':       return this.members;
      case 'alumni':     return this.alumni;
      default:           return this.team;
    }
  });

  // Hero counters animate from zero once
  private readonly statTargets = [
    { label: "people who've been part of the team", value: TEAM.length },
    { label: 'directors on the board', value: TEAM.filter(m => m.group === 'leadership').length },
    { label: 'the year we were founded', value: 2025 },
  ];
  readonly stats = signal(this.statTargets.map(s => ({ ...s, shown: 0 })));

  setFilter(id: Filter): void {
    this.filter.set(id);
  }

  setView(view: View): void {
    this.view.set(view);
    // Re-attach tilt once the badge grid is back in the DOM
    if (view === 'badges') setTimeout(() => this.attachTilt());
  }

  isFlipped(id: string): boolean {
    return this.flipped().has(id);
  }

  toggleFlip(id: string): void {
    const next = new Set(this.flipped());
    next.has(id) ? next.delete(id) : next.add(id);
    this.flipped.set(next);
  }

  /** Mouse convenience: clicking a badge flips it, unless the click was on a link or button. */
  onBadgeClick(event: MouseEvent, id: string): void {
    if ((event.target as HTMLElement).closest('a, button')) return;
    this.toggleFlip(id);
  }

  /** From the structure chart: jump to that person's badge and light it up. */
  showMember(member: TeamMember): void {
    this.filter.set('all');
    this.setView('badges');
    this.spotlight.set(member.id);
    setTimeout(() => {
      document.getElementById('badge-' + member.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
    setTimeout(() => this.spotlight.set(null), 1800);
  }

  firstName(member: TeamMember): string {
    return member.name.split(' ')[0];
  }

  ngOnInit(): void {
    this.seo.setMeta({
      title: 'Our Team — The People Behind RentPhoenix Technologies',
      description: 'Meet the founder, directors and team building RentPhoenix OS, CO-Founder and custom software at RentPhoenix Technologies, Goa.',
      keywords: 'RentPhoenix team, Arifulla Kazi, RentPhoenix Technologies directors, Goa software company team',
    });
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    this.host.nativeElement.querySelectorAll('.reveal').forEach((el: Element) => this.observer!.observe(el));
    this.countUp();
    this.attachTilt();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.cleanups.forEach(fn => fn());
  }

  private get reducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  private countUp(): void {
    if (this.reducedMotion) {
      this.stats.set(this.statTargets.map(s => ({ ...s, shown: s.value })));
      return;
    }
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      this.stats.set(this.statTargets.map(s => ({ ...s, shown: Math.round(s.value * eased) })));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /** Pointer-following 3D tilt and glare on the badges. Mouse only, outside Angular's change detection. */
  private attachTilt(): void {
    this.cleanups.forEach(fn => fn());
    this.cleanups = [];
    const grid = this.badgeGrid?.nativeElement;
    if (!grid || this.reducedMotion) return;

    this.zone.runOutsideAngular(() => {
      let frame = 0;
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') return;
        const tilt = (event.target as HTMLElement).closest<HTMLElement>('.badge__tilt');
        if (!tilt) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const rect = tilt.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          tilt.classList.add('is-tracking');
          tilt.style.setProperty('--ry', `${(x - 0.5) * 2 * MAX_TILT}deg`);
          tilt.style.setProperty('--rx', `${(0.5 - y) * 2 * MAX_TILT}deg`);
          tilt.style.setProperty('--gx', `${x * 100}%`);
          tilt.style.setProperty('--gy', `${y * 100}%`);
        });
      };
      const leave = (event: PointerEvent) => {
        const tilt = (event.target as HTMLElement).closest<HTMLElement>('.badge__tilt');
        if (!tilt || tilt.contains(event.relatedTarget as Node)) return;
        cancelAnimationFrame(frame);
        tilt.classList.remove('is-tracking');
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      };
      grid.addEventListener('pointermove', move, { passive: true });
      grid.addEventListener('pointerout', leave);
      this.cleanups.push(() => {
        grid.removeEventListener('pointermove', move);
        grid.removeEventListener('pointerout', leave);
      });
    });
  }
}
