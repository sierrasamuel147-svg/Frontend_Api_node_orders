export interface CreateProductPayload {
  productName: string;
  supplierId: string;
  unitPrice: number;
  package: string;
  isDiscontinued: boolean;
}