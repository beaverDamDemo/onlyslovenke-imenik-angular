export interface FilterOptions {
  search: string;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  location: string;
  showDiscounted: boolean;
  sortBy: 'popular' | 'newest' | 'name' | 'price'; // or whatever final enum you want
}
