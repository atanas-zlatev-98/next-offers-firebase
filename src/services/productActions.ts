"use server";
import { Product } from "@/types/product";
import { adminDb } from "@/config/firebase/admin";
import { FieldValue } from "firebase-admin/firestore";

export const createNewProduct = async (userId: string, product: Product) => {

  const { productName, productPrice, manufacturer,unit } = product;

 const productRef = await adminDb.collection("products").add({
    productName,
    productPrice,
    manufacturer,
    unit,
    createdBy: userId,
    createdAt: new Date(),
  });

  const userRef = adminDb.collection("users").doc(userId);

  await userRef.update({
    products: FieldValue.arrayUnion(productRef.id),
  });

  return { success: true };
};
