// ====================
// CUSTOMER (RESPUESTA)
// ====================
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  phone: string;
}

// ====================
// SUPPLIER (RESPUESTA)
// ====================
export interface Supplier {
  id: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  city: string;
  country: string;
  phone: string;
  fax: string | null;
}
// ====================
// PRODUCT (RESPUESTA)
// ====================
export interface Product {
  id: number;
  productName: string;
  unitPrice: number;
  package: string;
  isDiscontinued: boolean;

  supplier?: Supplier;
}

// ====================
// ORDER ITEM (RESPUESTA)
// ====================
export interface OrderItem {
  id: number;
  product: Product;
  unitPrice: number;
  quantity: number;
}

// ====================
// ORDER (RESPUESTA)
// ====================
export interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  totalAmount: number;
  customer: Customer;
  items: OrderItem[];
  status?: string;
}

// ====================
// PAYLOADS (LO QUE ENVÍAS)
// ====================

// 🔥 Crear orden (SEGÚN TU API REAL)
export interface CreateOrderPayload {
  customerId: number;
  items: {
    productId: number;
    quantity: number;
  }[];
}

// 🔥 Agregar item (endpoint separado)
export interface AddItemPayload {
  productId: number;
  quantity: number;
}