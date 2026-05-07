"use client";

import { useEffect, useState } from "react";
import { IgrGrid, IgrColumn } from "igniteui-react-grids";
import { getCustomers } from "@/app/services/customers";
import type { Customer } from "@/app/types/order";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (error) return <p style={{ padding: 20 }}>{error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Clientes</h1>

      <IgrGrid
        data={customers}
        autoGenerate={false}
        height="600px"
      >
        <IgrColumn field="id" header="ID" />
        <IgrColumn field="firstName" header="Nombre" />
        <IgrColumn field="lastName" header="Apellido" />
        <IgrColumn field="city" header="Ciudad" />
        <IgrColumn field="country" header="País" />
        <IgrColumn field="phone" header="Teléfono" />
      </IgrGrid>
    </div>
  );
}