import { Component, ChangeDetectionStrategy, ElementRef, HostListener, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule, ArrowLeftRight } from 'lucide-angular';

const PRODUCT_PATHS = ['/products', '/products/co-founder'];

@Component({
  selector: 'app-product-switcher',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './product-switcher.component.html',
  styleUrl: './product-switcher.component.scss'
})
export class ProductSwitcherComponent {
  private router = inject(Router);
  private el = inject(ElementRef<HTMLElement>);

  readonly SwitchIcon = ArrowLeftRight;

  private touchStartX = 0;
  private touchStartY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent): void {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent): void {
    const dx = e.changedTouches[0].clientX - this.touchStartX;
    const dy = e.changedTouches[0].clientY - this.touchStartY;

    if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

    const currentIndex = PRODUCT_PATHS.indexOf(this.router.url.split('?')[0]);
    if (currentIndex === -1) return;

    const nextIndex = dx < 0 ? currentIndex + 1 : currentIndex - 1;
    const nextPath = PRODUCT_PATHS[nextIndex];
    if (nextPath) this.router.navigateByUrl(nextPath);
  }
}
