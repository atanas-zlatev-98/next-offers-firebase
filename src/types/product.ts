export type Product = {
  id: string;
  productName: string;
  productPrice: number;
  manufacturer: string;
  unit: string;
  createdAt: string | null;
};

export type ProductOption = {
  id: string;
  label: string;
  value: number;
  unit: string;
};