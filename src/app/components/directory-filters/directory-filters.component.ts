import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';
import { IconChevronDownComponent } from '../icon-chevron-down/icon-chevron-down.component';
import { IconFilterComponent } from '../icon-filter/icon-filter.component';
import { IconXComponent } from '../icon-x/icon-x.component';
import { IconSearchComponent } from '../icon-search/icon-search.component';
import { FilterOptions } from '../../models/filter-options.model';



@Component({
  selector: 'app-directory-filters',
  templateUrl: './directory-filters.component.html',
  styleUrls: ['./directory-filters.component.scss'],
  imports: [
    BadgeComponent, IconChevronDownComponent, IconFilterComponent, IconXComponent, IconSearchComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DirectoryFiltersComponent {
  @Input() filters!: FilterOptions;
  @Input() availableTags: string[] = [];
  @Input() availableLocations: string[] = [];

  @Output() filtersChange = new EventEmitter<Partial<FilterOptions>>();
  @Output() clearFilters = new EventEmitter<void>();

  isOpen = false;

  handleTagToggle(tag: string) {
    const tags = this.filters.tags.includes(tag)
      ? this.filters.tags.filter(t => t !== tag)
      : [...this.filters.tags, tag];
    this.filtersChange.emit({ tags });
  }

  removeTag(tag: string) {
    const tags = this.filters.tags.filter(t => t !== tag);
    this.filtersChange.emit({ tags });
  }

  get hasActiveFilters(): boolean {
    const f = this.filters;
    return !!(f.search || f.tags.length || f.location || f.showDiscounted || f.minPrice > 0 || f.maxPrice < 50);
  }

  getBadgeVariant(tag: string): 'default' | 'outline' {
    return this.filters.tags.includes(tag) ? 'default' : 'outline';
  }
}
