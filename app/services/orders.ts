import { api } from "./api";
import type {
  Order,
  OrderItem,
  CreateOrderPayload,
  AddItemPayload,
} from "@/app/types/order";

// ====================
// ORDERS
// ====================

// Obtener lista de pedidos
export const getOrders = async (): Promise<Order[]> => {
  const { data } = await api.get<Order[]>("/orders");
  return data;
};

// Obtener un pedido por ID
export const getOrder = async (id: number): Promise<Order> => {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
};

// Crear pedido (usa customerId + items)
export const createOrder = async (
  payload: CreateOrderPayload
): Promise<Order> => {
  const { data } = await api.post<Order>("/orders", payload);
  return data;
};

// 🔥 ACTUALIZAR ORDEN (LO QUE TE FALTABA)
export const updateOrder = async (
  orderId: number,
  payload: {
    status?: string;
    orderDate?: string;
    customerId?: number;
  }
): Promise<Order> => {
  const { data } = await api.patch<Order>(
    `/orders/${orderId}`,
    payload
  );
  return data;
};

// ====================
// ORDER ITEMS
// ====================

// ⚠️ OPCIONAL: tu API ya devuelve items en getOrder
// puedes dejarlo o eliminarlo si no lo usas
export const getOrderItems = async (
  orderId: number
): Promise<OrderItem[]> => {
  const { data } = await api.get<OrderItem[]>(
    `/orders/${orderId}/items`
  );
  return data;
};

// Agregar item
export const addItem = async (
  orderId: number,
  payload: AddItemPayload
): Promise<OrderItem> => {
  const { data } = await api.post<OrderItem>(
    `/orders/${orderId}/items`,
    payload
  );
  return data;
};

// 🔥 IMPORTANTE: payload correcto (no uses todo OrderItem)
export const updateItem = async (
  orderId: number,
  itemId: number,
  payload: {
    quantity?: number;
    unitPrice?: number;
  }
): Promise<OrderItem> => {
  const { data } = await api.patch<OrderItem>(
    `/orders/${orderId}/items/${itemId}`,
    payload
  );
  return data;
};

// Eliminar item
export const deleteItem = async (
  orderId: number,
  itemId: number
): Promise<void> => {
  await api.delete(`/orders/${orderId}/items/${itemId}`);
};

// ====================
// DELETE ORDER
// ====================
export const deleteOrder = async (orderId: number): Promise<void> => {
  await api.delete(`/orders/${orderId}`);
};