import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';
import { LucideAngularModule, UserPlus, Phone, Mail, Globe, RefreshCw } from 'lucide-angular';

/** Maximum tilt in degrees while the pointer moves across the card. */
const MAX_TILT = 12;

/** The founder's business card as an interactive 3D card that flips and tilts. */
@Component({
  selector: 'app-business-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LucideAngularModule],
  templateUrl: './business-card.component.html',
  styleUrl: './business-card.component.scss'
})
export class BusinessCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tilt') private tiltRef?: ElementRef<HTMLElement>;

  readonly UserPlus = UserPlus;
  readonly Phone = Phone;
  readonly Mail = Mail;
  readonly Globe = Globe;
  readonly RefreshCw = RefreshCw;

  readonly flipped = signal(false);

  readonly phone = '+919422194675';
  readonly phoneLabel = '+91 94221 94675';
  readonly email = 'rentphoenixtech@gmail.com';
  readonly website = 'https://www.rentphoenixos.in';

  private readonly zone = inject(NgZone);
  private frame = 0;
  private cleanup: Array<() => void> = [];

  ngAfterViewInit(): void {
    const tilt = this.tiltRef?.nativeElement;
    if (!tilt || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Pointer tracking only writes CSS variables, so it runs outside Angular
    // and never triggers change detection.
    this.zone.runOutsideAngular(() => {
      const move = (event: PointerEvent) => {
        if (event.pointerType !== 'mouse') {
          return;
        }
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => {
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
      const leave = () => {
        cancelAnimationFrame(this.frame);
        tilt.classList.remove('is-tracking');
        tilt.style.setProperty('--rx', '0deg');
        tilt.style.setProperty('--ry', '0deg');
      };

      tilt.addEventListener('pointermove', move, { passive: true });
      tilt.addEventListener('pointerleave', leave);
      this.cleanup.push(() => {
        tilt.removeEventListener('pointermove', move);
        tilt.removeEventListener('pointerleave', leave);
      });
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
    this.cleanup.forEach((dispose) => dispose());
  }

  flip(): void {
    this.flipped.update((value) => !value);
  }
}
