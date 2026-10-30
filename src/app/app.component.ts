import { Component, OnInit, inject } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  template: `
    <app-navbar />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [`
    main { min-height: 100vh; }
  `]
})
export class AppComponent implements OnInit {
  private themeService = inject(ThemeService);

  constructor() {
    // Anchor links (e.g. /services#automation) land below the fixed navbar instead of under it
    inject(ViewportScroller).setOffset([0, 92]);
  }

  ngOnInit(): void {
    // ThemeService auto-initializes in constructor
  }
}
