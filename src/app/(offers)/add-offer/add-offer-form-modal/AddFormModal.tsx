"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Offer } from "@/types/offers";
import { ProductOption } from "@/types/product";
import { Input } from "@base-ui/react";
import { useState } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from 'uuid';

export function AddFormModal({products, setNewOffer}: {products: ProductOption[], setNewOffer: React.Dispatch<React.SetStateAction<Offer[]>>}) {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [manufacturer, setManufacturer] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [totalProducts, setTotalProducts] = useState<ProductOption[]>([]);

  const onMenuOpen = () => setIsMenuOpen(true);
  const onMenuClose = () => setIsMenuOpen(false);

  const handleAddProduct = () => {
    
    if(selectedProduct  ){
        setTotalProducts(prev => [...prev, selectedProduct]);
        setSelectedProduct(null);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNewOffer(prev => [...prev, {
        id: uuidv4(),
        manufacturer,
        products: totalProducts.map(product => ({
        productId: product.id,
        productName: product.label,
        productPrice: String(product.value),
        unit: product.unit
  }))
}]);
setManufacturer("");
setTotalProducts([]);
  }

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Добавяне на продукт</Button>}
      />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Добавяне на продукт</DialogTitle>
        </DialogHeader>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Име на производител / продукт</Label>
              <Input
                className="border p-2 rounded"
                id="name-1"
                name="name"
                onChange={(e) => setManufacturer(e.target.value)}
                value={manufacturer}
                placeholder="Производител..."
              />
            </Field>
          </FieldGroup>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-2">Име на продукт</Label>
              <Select
                aria-labelledby="aria-label"
                inputId="aria-example-input"
                name="aria-live-color"
                onMenuOpen={onMenuOpen}
                onMenuClose={onMenuClose}
                onChange={(value) => setSelectedProduct(value as ProductOption)}
                options={products}
              />
              <Button variant="outline" onClick={handleAddProduct} className="mt-2">Добави продукт към офертата</Button>
            </Field>
          </FieldGroup>
       
        {/* Preview */}
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-bold mb-2">Преглед на офертата</h2>
          <p><strong>Производител:</strong> {manufacturer || "Няма въведен производител"}</p>

          {totalProducts.length > 0 ? (
            <div className="mt-2">
              <strong>Продукти:</strong>
              <ul>
                {totalProducts.map((product) => (
                  <li key={product.id}>
                    {product.label} - {product.value} {product.unit}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Няма добавени продукти</p>
          )}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Save changes</Button>
        </DialogFooter>
         </form>
      </DialogContent>
    </Dialog>
  );
}
