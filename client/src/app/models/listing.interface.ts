import {Category} from './categories.interface';
import {Platform} from './platform';
import {Currency} from './currency.interface';

export interface ListingIn {
  name?: string;
  description?: string;
  price?: number;
  is_negotiable?: boolean;
  is_sealed?: boolean;
  is_digital?: boolean;
  category_id?: number;
  currency_code?: string;
  platform_code?: string;
}

export interface ListingOut {
  id: number;
  name: string;
  description: string;
  price: number;
  user_id: string;
  is_negotiable: boolean;
  is_sealed: boolean;
  is_digital: boolean;
  is_active: boolean;
  expiration_date: string;
  category: Category;
  platform: Platform;
  currency: Currency;
}
