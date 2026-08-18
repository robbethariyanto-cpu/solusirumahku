export interface Category {
  id: string;
  name: string;
  icon?: string;
  order?: number;
}

export interface Product {
  id: string;
  categoryId: string;
  brand: string;
  name: string;
  price: number;
  description: string;
  specs: string[];
  image: string;
  images?: string[];
  stock: number;
  favoriteRank?: number;
  packingQuantity?: number;
  packingUnit?: string;
  order?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ProfileMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  description: string;
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string;
  aboutText: string;
  contactText: string;
  logoUrl?: string;
  heroMediaUrl?: string;
  heroMediaType?: 'image' | 'video';
  backgroundUrl?: string;
  profileMedia?: ProfileMedia[];
}

export interface TrendInfo {
  id: string;
  title: string;
  description: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  date: string;
}
