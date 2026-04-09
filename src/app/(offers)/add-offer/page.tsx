"use client";

import { useEffect, useState } from "react";
import { AddFormModal } from "./add-offer-form-modal/AddFormModal";
import { ProductOption } from "@/types/product";
import { getAllProducts } from "@/services/productActions";
import { Offer } from "@/types/offers";
import { Input } from "@/components/ui/input";
import { OfferListItem } from "../offer-list-item/OfferListItem";
import dynamic from "next/dynamic";
import { DocumentOffer } from "../generate-offer/DocumentOffer";
import { Button } from "@/components/ui/button";

export default function AddOfferPage() {

  const [products, setProducts] = useState<ProductOption[]>([]);
  const [newOffer, setNewOffer] = useState<Offer[]>([]);
  const [listName, setListName] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setProducts(response);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const removeFromOfferProducts = (productId: string) => {
    setNewOffer((prevOffers) =>
      prevOffers.map((offer) => ({
        ...offer,
        products: offer.products.filter(
          (product) => product.productId !== productId,
        ),
      })),
    );
  };

  const removeOfferList = (offerId: string) => {
    setNewOffer((prevOffers) =>
      prevOffers.filter((offer) => offer.id !== offerId),
    );
  };
  console.log(newOffer);
  const PDFDownloadLink = dynamic(() => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),{ ssr: false });

  return (
    <div className="pt-20 flex justify-center items-center flex-col gap-10">
      <h1 className="text-2xl font-bold text-center">Създаване на оферта / ценова листа</h1>

      <AddFormModal products={products} setNewOffer={setNewOffer} />
      {newOffer.length > 0 && (
        <div className="flex flex-col justify-center items-center max-w-300 w-full">
            <div className="ps-5 pe-5 w-full">
                <Input
            placeholder="Име на оферта / ценова листа"
            className="w-full mb-10"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
          />
            </div>
          
          {listName && <h2 className="text-3xl font-bold mt-4">{listName}</h2>}

          <div className="p-6 w-full">
            <div className="w-full border-b mb-5">
              {newOffer.length > 0 && (
                <div className="flex flex-row gap-20 justify-between p-2 font-bold">
                  <h1 className="text-2xl">Продукти:</h1>
                  <h1 className="text-2xl">Цена на продуктите:</h1>
                </div>
              )}
            </div>

            <ul className="list-disc list-inside">
              {newOffer.map((offer) => (
                <OfferListItem
                  key={offer.id}
                  setOffer={setNewOffer}
                  removeFromOffer={removeFromOfferProducts}
                  removeOfferList={removeOfferList}
                  offer={offer}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
       {newOffer.length > 0 && (
      <PDFDownloadLink document={<DocumentOffer listName={listName} offers={newOffer} />} fileName="Оферта.pdf">
        {({ loading }) => (
          <Button
            className="w-full md:w-auto mt-4 px-6 py-2 text-white rounded disabled:opacity-50 cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Генериране...' : 'Изтегли оферта (PDF)'}
          </Button>
        )}
      </PDFDownloadLink>
    )}
    </div>
  );
}
