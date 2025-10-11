export interface ContentCreator {
  id?: number;
  name: string;
  avatarUrl: string;
  description: string;
  location: string;
  price: number;
  onlyfansUrl: string;
  age: number;
  isVerified: boolean;
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
  discount?: number;
  discountPrice?: number;
  isDiscounted?: boolean;
  popularityScore?: number;
}

