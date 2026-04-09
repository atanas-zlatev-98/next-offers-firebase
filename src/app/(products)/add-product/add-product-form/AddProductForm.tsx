
'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createNewProduct } from "@/services/productActions"
import { useRouter } from "next/navigation"

export function AddProductForm({ userId }: { userId: string }) {

    const navigate = useRouter();

    const [productName, setProductName] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [unit, setUnit] = useState<'kg' | 'br'>("kg");
    const [productPrice, setProductPrice] = useState("");

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await createNewProduct(userId, { productName, productPrice, manufacturer, unit });

            if(response.success){
                setProductName("");
                setManufacturer("");
                setUnit("kg");
                setProductPrice("");
                navigate.push("/");
            }
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        
        <CardTitle>Създаване на продукт</CardTitle>
        
        <CardDescription>
           {/* TODO Error Handling */}
        </CardDescription>

      </CardHeader>

      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-6">

            <div className="grid gap-2">
              <Label htmlFor="productName">Име на продукта</Label>
              <Input
                id="productName"
                type="text"
                placeholder="Име..."
                onChange={(e)=>setProductName(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="productPrice">Цена на продукта</Label>
              <Input
                id="productPrice"
                type="text"
                placeholder="Цена..."
                onChange={(e)=>setProductPrice(e.target.value)}
                required
              />

            </div>
              <div className="grid gap-2">
              <Label htmlFor="unit">Единица</Label>
                <select className="p-1 border rounded" onChange={(e) => setUnit(e.target.value as 'kg' | 'br')} required>
                  <option value="kg">Килограм</option>
                  <option value="br">Брой</option>
                </select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="manufacturer">Производител</Label>
              <Input
                id="manufacturer"
                type="text"
                placeholder="Производител..."
                onChange={(e)=>setManufacturer(e.target.value)}
                required
              />
            </div>
          </div>
          <Button className="w-full mt-6 cursor-pointer" type="submit">Добави продукт</Button>
        </form>
      </CardContent>
    </Card>
  )
}
