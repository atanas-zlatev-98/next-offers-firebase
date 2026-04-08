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
    <li className="list-none border p-4 mb-2 rounded-md shadow-md w-full">
      {offer.manufacturer && (<div className="flex flex-row gap-2">
        <Button onClick={() => removeOfferList(offer.id)} className="font-bold cursor-pointer">X</Button>
        <h1 className="font-bold text-2xl">{offer.manufacturer}</h1>
    </div>)}  
   

      <div>
        <div>
          {offer.products.map((product) => (
            <div className={`flex flex-row justify-between items-center border-b mb-2 ${offer.manufacturer ? "ms-5" : ""}`} key={product.productId}>
                
              <div className="flex flex-row items-center gap-2">
                <Button onClick={() => removeFromOffer(product.productId)} className="font-bold cursor-pointer">X</Button>
                    <h1 className="border-0 p-0 text-lg font-medium">
                    {product.productName}
                    </h1>
              </div>
              
              <div className="flex flex-col mb-2">

              <div className="flex flex-row gap-1">
                <Input min={0} type="number" className="field-sizing-content text-black font-bold text-base md:text-xl [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={Number(product.productPrice) === 0 ? "" : product.productPrice} onChange={(e) => handleChangePrice(product.productId, e.target.value)} />
                <p className="text-black font-bold text-base md:text-xl"> {product.unit === "kg" ? "€ / кг" : "€ / бр."}</p>
              </div>

               <div className="flex flex-row gap-1">
                <p>{(Number(product.productPrice) * 1.95583 * 1).toFixed(2)} {product.unit === "kg" ? "лв. / кг" : "лв. / бр."}</p>
              </div>

              </div>
              
            </div>
          ))}
        </div>
      </div>
    </li>
  );
};
