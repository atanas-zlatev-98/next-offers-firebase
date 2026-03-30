export type OfferItem = {
    productId: string;
    productName: string;
    productPrice: string;
}

export type Offer = {
    id: string;
    products: OfferItem[];
    createdBy: string;
    createdAt: string;
}