import {
  ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewEncapsulation,
  afterNextRender, inject, input, viewChild
} from '@angular/core';
import { initRpShowcase } from './rp-showcase.engine';

/**
 * Interactive RentPhoenix OS showcase: landlord/tenant lens, before-vs-after cards,
 * the two-phone sync simulator, setup walkthrough, tenancy journey, agreements,
 * bill split, landlord overview, privacy explorer and "Built for how India rents".
 *
 * Styles are unencapsulated (scoped under `.rpx`) because most of the phone screens
 * are rendered by the engine at runtime and would not carry Angular's _ngcontent attributes.
 */
@Component({
  selector: 'app-rp-showcase',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rp-showcase.component.html',
  styleUrl: './rp-showcase.component.scss'
})
export class RpShowcaseComponent {
  readonly playUrl = input.required<string>();
  readonly webUrl = input.required<string>();

  private readonly root = viewChild.required<ElementRef<HTMLElement>>('root');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const teardown = initRpShowcase(this.root().nativeElement, {
        playUrl: this.playUrl(),
        webUrl: this.webUrl()
      });
      destroyRef.onDestroy(teardown);
    });
  }
}
