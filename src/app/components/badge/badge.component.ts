import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  @Input() variant: 'default' | 'outline' | 'secondary' = 'default';

  get classes(): string {
    switch (this.variant) {
      case 'outline':
        return 'border border-muted-foreground text-muted-foreground px-2 py-0.5 rounded-md text-sm';
      case 'secondary':
        return 'bg-muted text-muted-foreground px-2 py-0.5 rounded-md text-sm';
      default:
        return 'bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-sm';
    }
  }
}
