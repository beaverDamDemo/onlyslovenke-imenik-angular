import { DOCUMENT, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private $currentTheme = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.$currentTheme.asObservable();

  constructor() {
    const theme = this.getThemeFromLocalStorage();
    this.setTheme(theme);
  }

  toggleTheme() {
    if (this.$currentTheme.value === 'light') {
      this.setTheme('dark');
    } else {
      this.setTheme('light');
    }
  }

  setTheme(theme: Theme) {
    this.$currentTheme.next(theme);
    if (theme === 'dark') {
      this.document.documentElement.classList.add('dark-mode');
    } else {
      this.document.documentElement.classList.remove('dark-mode');
    }
    this.setThemeInLocalStorage(theme);
  }

  getThemeFromLocalStorage(): Theme {
    return localStorage.getItem('preferred-theme') as Theme ?? 'light';
  }

  setThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('preferred-theme', theme);
  }
}
