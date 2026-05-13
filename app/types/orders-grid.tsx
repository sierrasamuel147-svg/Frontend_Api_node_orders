"use client";

import {
  IgrGrid,
  IgrColumn,
} from "igniteui-react-grids";

import type { Order } from "@/app/types/order";

type GridOrder = Order & {
  customerName: string;
};

type Props = {
  data: GridOrder[];
};

export default function OrdersGrid({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <IgrGrid
        data={data}
        autoGenerate={false}
        height="600px"
        width="100%"
        rowSelection="single"
        allowFiltering={true}
        moving={true}
      >
        {/* ID */}
        <IgrColumn
          field="id"
          header="ID"
          sortable={true}
          filterable={true}
        />

        {/* ORDER NUMBER */}
        <IgrColumn
          field="orderNumber"
          header="Order #"
          sortable={true}
          filterable={true}
        />

        {/* CUSTOMER */}
        <IgrColumn
          field="customerName"
          header="Cliente"
          sortable={true}
          filterable={true}
        />

        {/* TOTAL */}
        <IgrColumn
          field="totalAmount"
          header="Total"
          sortable={true}
          filterable={true}
        />

        {/* DATE */}
        <IgrColumn
          field="orderDate"
          header="Fecha"
          sortable={true}
          filterable={true}
        />
      </IgrGrid>
    </div>
  );
}
