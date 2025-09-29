import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type ColorScheme = 'yellow-purple' | 'cyan-coral';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  themeSig = signal<Theme>('light');
  colorSchemeSig = signal<ColorScheme>('yellow-purple');

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    const savedColorScheme = (localStorage.getItem('colorScheme') as ColorScheme) || 'yellow-purple';

    this.setTheme(savedTheme);
    this.setColorScheme(savedColorScheme);
  }

  setTheme(theme: Theme) {
    this.themeSig.set(theme);
    this.document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    const newTheme = this.themeSig() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setColorScheme(scheme: ColorScheme) {
    this.colorSchemeSig.set(scheme);
    this.document.documentElement.setAttribute('data-color-scheme', scheme);
    localStorage.setItem('colorScheme', scheme);
  }

  toggleColorScheme() {
    const newScheme = this.colorSchemeSig() === 'yellow-purple' ? 'cyan-coral' : 'yellow-purple';
    this.setColorScheme(newScheme);
  }
}
