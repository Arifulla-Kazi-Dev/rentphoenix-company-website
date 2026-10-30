import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  readonly theme = signal<Theme>('light');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('rp-theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.theme.set(saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light');
      this.applyTheme(this.theme());

      effect(() => this.applyTheme(this.theme()));
    }
  }

  toggle(): void {
    this.setTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  // Only an explicit choice is saved, so visitors who never toggle keep following their system theme
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    if (isPlatformBrowser(this.platformId)) localStorage.setItem('rp-theme', theme);
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
