import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { IconMoonComponent } from '../icon-moon/icon-moon.component';
import { IconSunComponent } from '../icon-sun/icon-sun.component';
import { IconPaletteComponent } from '../icon-palette/icon-palette.component';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  imports: [IconMoonComponent, IconSunComponent, IconPaletteComponent],
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) { }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  toggleColorScheme() {
    this.themeService.toggleColorScheme();
  }
}
