export interface Order {
  _id?: string;
  listingId: number;
  totalAmount: number;
  currency: string;
  userId?: string;
  shippingAddressId: string;
  status?: string;
}
