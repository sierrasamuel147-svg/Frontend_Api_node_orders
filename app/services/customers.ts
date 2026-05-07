import { api } from "./api";
import type { Customer, ApiResponse } from "@/app/types/order";

// Obtener todos los clientes
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await api.get<ApiResponse<Customer[]>>("/customers");
  return res.data.data;
};

// Obtener un cliente por ID
export const getCustomer = async (id: string): Promise<Customer> => {
  const res = await api.get<ApiResponse<Customer>>(`/customers/${id}`);
  return res.data.data;
};

// Payload para crear cliente
export interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phone: string;
}

// Crear cliente
export const createCustomer = async (
  payload: CreateCustomerPayload
): Promise<Customer> => {
  const res = await api.post<ApiResponse<Customer>>("/customers", payload);
  return res.data.data;
};

// Actualizar cliente
export const updateCustomer = async (
  id: string,
  payload: Partial<CreateCustomerPayload>
): Promise<Customer> => {
  const res = await api.patch<ApiResponse<Customer>>(
    `/customers/${id}`,
    payload
  );
  return res.data.data;
};

// Eliminar cliente
export const deleteCustomer = async (id: string): Promise<void> => {
  await api.delete(`/customers/${id}`);
};