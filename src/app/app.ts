import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Theme } from './services/theme.service';
import { ThemeService } from './services/theme.service';
import { AuthService } from './services/auth.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { IconLogOutComponent } from './components/icon-log-out/icon-log-out.component';
import { IconHeartComponent } from './components/icon-heart/icon-heart.component';
import { IconMoonComponent } from './components/icon-moon/icon-moon.component';
import { IconPaletteComponent } from './components/icon-palette/icon-palette.component';
import { IconUsersComponent } from './components/icon-users/icon-users.component';
import { IconPlusComponent } from './components/icon-plus/icon-plus.component';
import { IconShieldComponent } from './components/icon-shield/icon-shield.component';
import { PerformerDirectoryComponent } from './components/performer-directory/performer-directory.component';
import { FavoritesViewComponent } from './components/favorites-view/favorites-view.component';
import { AddPerformerFormComponent } from './components/add-performer-form/add-performer-form.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterModule, MatToolbarModule, MatDividerModule, MatButtonModule, MatIconModule, MatProgressBarModule, ThemeToggleComponent, IconLogOutComponent, IconHeartComponent, IconUsersComponent, IconPlusComponent, IconShieldComponent, PerformerDirectoryComponent, FavoritesViewComponent, AddPerformerFormComponent, AdminDashboardComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Demo Portal');
  currentTheme: Theme = 'light';
  private readonly themeService = inject(ThemeService);
  public readonly authService = inject(AuthService);
  currentYear = new Date().getFullYear();
  loading = false;
  isProduction = environment.production;
  activeTab: 'directory' | 'favorites' | 'add' | 'admin' = 'directory';

  constructor(private router: Router,
    public auth: AuthService,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading = false;
      }
    });

    effect(() => {
      this.currentTheme = this.themeService.themeSig();
    });
  }

  ngOnInit() {
    console.log(`Built at ${environment.buildDate}`);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isActive(url: string): boolean {
    return this.router.url === url;
  }

  setActiveTab(tab: 'directory' | 'favorites' | 'add' | 'admin') {
    this.activeTab = tab;
  }

  logout() {
    this.auth.logout();
  }
}
