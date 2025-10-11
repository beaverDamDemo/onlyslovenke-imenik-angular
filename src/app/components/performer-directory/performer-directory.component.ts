import { Component, OnInit, signal, computed } from '@angular/core';
import { ContentCreatorCardComponent } from '../performer-card/performer-card.component';
import { IconPercentComponent } from '../icon-percent/icon-percent.component';
import { DirectoryFiltersComponent } from '../directory-filters/directory-filters.component';
import { IconUsersComponent } from '../icon-users/icon-users.component';
import { FilterOptions } from '../../models/filter-options.model';
import { ContentCreator } from '../../models/content-creator.model';
import { ContentCreatorService } from '../../services/content-creator.service';

export function getAllTags(contentCreators: ContentCreator[]): string[] {
  const tagSet = new Set<string>();
  contentCreators.forEach(p => p.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getAllLocations(contentCreators: ContentCreator[]): string[] {
  const locationSet = new Set<string>();
  contentCreators.forEach(p => {
    if (p.location) {
      locationSet.add(p.location);
    }
  });
  return Array.from(locationSet).sort();
}

export function filterContentCreators(contentCreators: ContentCreator[], filters: FilterOptions): ContentCreator[] {
  let result = [...contentCreators];

  if (filters.search) {
    const query = filters.search.toLowerCase();
    result = result.filter(p => p.name.toLowerCase().includes(query));
  }

  if (filters.tags.length > 0) {
    result = result.filter(p => filters.tags.every(tag => p.tags.includes(tag)));
  }

  if (filters.location) {
    result = result.filter(p => p.location === filters.location);
  }

  if (filters.showDiscounted) {
    result = result.filter(p => p.isDiscounted);
  }

  result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

  switch (filters.sortBy) {
    case 'price':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'name':
      result.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'newest':
      result.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      break;
    case 'popular':
    default:
      result.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
      break;
  }

  return result;
}

@Component({
  selector: 'app-performer-directory',
  templateUrl: './performer-directory.component.html',
  styleUrl: './performer-directory.component.scss',
  imports: [ContentCreatorCardComponent, IconPercentComponent, DirectoryFiltersComponent, IconUsersComponent],
  standalone: true
})
export class ContentCreatorDirectoryComponent implements OnInit {
  contentCreatorsSig = signal<ContentCreator[]>([]);
  filtersSig = signal<FilterOptions>({
    search: '',
    minPrice: 0,
    maxPrice: 50,
    tags: [],
    location: '',
    showDiscounted: false,
    sortBy: 'popular',
  });

  activeTabSig = signal<'all' | 'deals'>('all');

  filteredContentCreatorsSig = computed(() =>
    filterContentCreators(this.contentCreatorsSig(), this.filtersSig())
  );

  discountedContentCreatorsSig = computed(() =>
    this.contentCreatorsSig().filter(c => c.isDiscounted)
  );

  availableTagsSig = computed(() =>
    getAllTags(this.contentCreatorsSig())
  );

  availableLocationsSig = computed(() =>
    getAllLocations(this.contentCreatorsSig())
  );

  constructor(private contentCreatorService: ContentCreatorService) { }

  ngOnInit(): void {
    this.contentCreatorService.getAllCreators().subscribe(creators => {
      this.contentCreatorsSig.set(creators);
    });
  }

  handleFiltersChange(newFilters: Partial<FilterOptions>): void {
    this.filtersSig.update(current => ({ ...current, ...newFilters }));
  }

  clearFilters(): void {
    this.filtersSig.set({
      search: '',
      minPrice: 0,
      maxPrice: 50,
      tags: [],
      location: '',
      showDiscounted: false,
      sortBy: 'popular',
    });
  }

  setActiveTab(tab: 'all' | 'deals'): void {
    this.activeTabSig.set(tab);
  }
}
