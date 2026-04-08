export type OfferItem = {
    productId: string;
    productName: string;
    productPrice: string;
    unit: string;
}

export type Offer = {
    id: string;
    manufacturer: string;
    products: OfferItem[];
}

export type OfferListItemType = {
     offer: Offer;
     setOffer: React.Dispatch<React.SetStateAction<Offer[]>>;
     removeFromOffer: (productId: string) => void;
     removeOfferList: (offerId: string) => void;
}