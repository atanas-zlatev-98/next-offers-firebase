import { Button } from "@/components/ui/button";
import { OfferListItemType } from "@/types/offers";
import { Input } from "@base-ui/react";

export const OfferListItem = ({ offer, setOffer, removeFromOffer, removeOfferList }: OfferListItemType) => {

  const handleChangePrice = (productId: string, newPrice: string) => {
    setOffer((prevOffers) =>
      prevOffers.map((offer) => ({
        ...offer,
        products: offer.products.map((product) =>
          product.productId === productId
            ? { ...product, productPrice: newPrice }
            : product,
        ),
      })),
    );
  };

  return (
    <li className="list-none border p-3 sm:p-4 mb-2 rounded-md shadow-md w-full">

      {offer.manufacturer && (
        <div className="flex flex-row items-center gap-2 mb-2">
          <Button
            onClick={() => removeOfferList(offer.id)}
            className="font-bold cursor-pointer shrink-0"
          >
            X
          </Button>
          <h2 className="font-bold text-xl sm:text-2xl truncate">{offer.manufacturer}</h2>
        </div>
      )}

      <div>
        {offer.products.map((product) => (
          <div
            key={product.productId}
            className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 border-b py-2 mb-1 ${offer.manufacturer ? "sm:ms-5" : ""}`}
          >
            {/* Product name + remove button */}
            <div className="flex flex-row items-center gap-2 min-w-0">
              <Button
                onClick={() => removeFromOffer(product.productId)}
                className="font-bold cursor-pointer shrink-0"
              >
                X
              </Button>
              <h3 className="border-0 p-0 text-base sm:text-lg font-medium truncate">
                {product.productName}
              </h3>
            </div>

            {/* Price inputs */}
            <div className="flex flex-col gap-0.5 sm:items-end pl-9 sm:pl-0">
              <div className="flex flex-row items-center gap-1">
                <Input
                  min={0}
                  type="number"
                  className="field-sizing-content text-black font-bold text-base sm:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  value={Number(product.productPrice) === 0 ? "" : product.productPrice}
                  onChange={(e) => handleChangePrice(product.productId, e.target.value)}
                />
                <p className="text-black font-bold text-base sm:text-xl whitespace-nowrap">
                  {product.unit === "kg" ? "€ / кг" : "€ / бр."}
                </p>
              </div>

              <div className="flex flex-row gap-1 text-sm sm:text-base text-gray-600">
                <p className="whitespace-nowrap">
                  {(Number(product.productPrice) * 1.95583).toFixed(2)}{" "}
                  {product.unit === "kg" ? "лв. / кг" : "лв. / бр."}
                </p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </li>
  );
};