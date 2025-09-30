import { Component, OnInit } from '@angular/core';
import { PerformerCardComponent } from '../performer-card/performer-card.component';
import { IconPercentComponent } from '../icon-percent/icon-percent.component';
import { DirectoryFiltersComponent } from '../directory-filters/directory-filters.component';
import { IconUsersComponent } from '../icon-users/icon-users.component';
export interface Performer {
  id: number;
  name: string;
  avatarUrl: string;
  tags: string[];
  description: string;
  location?: string;
  price: number;
  discount?: number;
  discountPrice?: number;
  isDiscounted?: boolean;
  popularityScore?: number;
  age?: number;
  onlyfansUrl: string;
  isVerified?: boolean;
}
export const dataStore = {
  getPerformers(): Performer[] {
    return [
      {
        id: 1,
        name: 'Lana Luxe',
        avatarUrl: 'slovenian-woman-portrait-blonde.jpg',
        description: 'Fitness enthusiast with a love for ink.',
        location: 'Ljubljana',
        tags: ['fitness', 'tattoos'],
        price: 25,
        onlyfansUrl: 'https://onlyfans.com/lanaluxe',
        age: 28,
        isVerified: true,
      },
      {
        id: 2,
        name: 'Maja Moon',
        avatarUrl: 'slovenian-woman-portrait-brunette.jpg',
        description: 'Cosplayer and gamer girl with a playful vibe.',
        location: 'Maribor',
        tags: ['cosplay', 'gaming'],
        price: 30,
        discount: 10,
        discountPrice: 27,
        isDiscounted: true,
        onlyfansUrl: 'https://onlyfans.com/majamoon',
        age: 25,
        isVerified: false,
      },
      {
        id: 3,
        name: 'Nina Noir',
        avatarUrl: 'slovenian-woman-portrait-dark-hair.jpg',
        description: 'Fashion-forward creator with a bold aesthetic.',
        location: 'Koper',
        tags: ['fashion', 'makeup'],
        price: 45,
        onlyfansUrl: 'https://onlyfans.com/ninanoir',
        age: 30,
        isVerified: true,
      },
      {
        id: 4,
        name: 'Eva Ember',
        avatarUrl: 'slovenian-woman-portrait-redhead.jpg',
        description: 'Alternative style and fiery personality.',
        location: 'Ljubljana',
        tags: ['tattoos', 'alt'],
        price: 20,
        discount: 5,
        discountPrice: 19,
        isDiscounted: true,
        onlyfansUrl: 'https://onlyfans.com/evaember',
        age: 26,
        isVerified: false,
      },
    ];
  },

  getDiscountedPerformers(): Performer[] {
    return this.getPerformers().filter(p => p.isDiscounted);
  },
};

export function getAllTags(performers: Performer[]): string[] {
  const tagSet = new Set<string>();
  performers.forEach(p => p.tags.forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

export function getAllLocations(performers: Performer[]): string[] {
  const locationSet = new Set<string>();
  performers.forEach(p => {
    if (p.location) {
      locationSet.add(p.location);
    }
  });
  return Array.from(locationSet).sort();
}

export interface FilterOptions {
  search: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  location: string;
  showDiscounted: boolean;
  sortBy: 'popular' | 'priceLow' | 'priceHigh';
}

export function filterPerformers(performers: Performer[], filters: FilterOptions): Performer[] {
  let result = [...performers];

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
    case 'priceLow':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'priceHigh':
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => a.id - b.id);
      break;
  }

  return result;
}

@Component({
  selector: 'app-performer-directory',
  templateUrl: './performer-directory.component.html',
  styleUrl: './performer-directory.component.scss',
  imports: [PerformerCardComponent, IconPercentComponent, DirectoryFiltersComponent, IconUsersComponent],
})
export class PerformerDirectoryComponent implements OnInit {
  performers: Performer[] = [];
  filteredPerformers: Performer[] = [];
  discountedPerformers: Performer[] = [];
  availableTags: string[] = [];
  availableLocations: string[] = [];
  activeTab: 'all' | 'deals' = 'all';

  filters: FilterOptions = {
    search: '',
    minPrice: 0,
    maxPrice: 50,
    tags: [],
    location: '',
    showDiscounted: false,
    sortBy: 'popular',
  };

  ngOnInit(): void {
    const allPerformers = dataStore.getPerformers();
    const discounted = dataStore.getDiscountedPerformers();

    this.performers = allPerformers;
    this.discountedPerformers = discounted;
    this.availableTags = getAllTags(allPerformers);
    this.availableLocations = getAllLocations(allPerformers);

    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredPerformers = filterPerformers(this.performers, this.filters);
  }

  handleFiltersChange(newFilters: Partial<FilterOptions>): void {
    this.filters = { ...this.filters, ...newFilters };
    this.applyFilters();
  }

  clearFilters(): void {
    this.filters = {
      search: '',
      minPrice: 0,
      maxPrice: 50,
      tags: [],
      location: '',
      showDiscounted: false,
      sortBy: 'popular',
    };
    this.applyFilters();
  }

  setActiveTab(tab: 'all' | 'deals'): void {
    this.activeTab = tab;
  }
}
