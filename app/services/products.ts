import { api } from "./api";
import type { Product } from "@/app/types/order";
import type { CreateProductPayload } from "@/app/types/products";

// ====================
// GET ALL
// ====================
export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products");
  return data;
};

// ====================
// GET BY ID
// ====================
export const getProduct = async (
  id: number
): Promise<Product> => {
  const { data } = await api.get<Product>(
    `/products/${id}`
  );

  return data;
};

// ====================
// CREATE
// ====================
export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const { data } = await api.post<Product>(
    "/products",
    payload
  );

  return data;
};

// ====================
// UPDATE
// ====================
export const updateProduct = async (
  id: number,
  payload: Partial<CreateProductPayload>
): Promise<Product> => {
  const { data } = await api.patch<Product>(
    `/products/${id}`,
    payload
  );

  return data;
};

// ====================
// DELETE
// ====================
export const deleteProduct = async (
  id: number
): Promise<void> => {
  await api.delete(`/products/${id}`);
};