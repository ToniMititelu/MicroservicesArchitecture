export interface Order {
  _id?: string;
  listingId: number;
  ownerId: string;
  totalAmount: number;
  currency: string;
  userId?: string;
  shippingAddressId: string;
  status?: string;
}
