'use client';
import { useAuth } from "@/context/auth/useAuth";
import { AddProductForm } from "./add-product-form/AddProductForm";

export default function AddProduct(){
    const {user} = useAuth();
    return (
        <div className="min-h-screen flex items-center justify-center flex-col bg-gray-100">
            <AddProductForm userId={user?.uid || ""}/>
        </div>
    )
}