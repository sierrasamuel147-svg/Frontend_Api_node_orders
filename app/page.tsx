"use client";

import Link from "next/link";
import { IgrCard } from "igniteui-react";

export default function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sistema de Gestión</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>

        <IgrCard style={{ padding: 20, minWidth: 200 }}>
          <h3>Pedidos</h3>
          <p>Gestiona los pedidos del sistema</p>
          <Link href="/orders">Ir a pedidos</Link>
        </IgrCard>

        <IgrCard style={{ padding: 20, minWidth: 200 }}>
          <h3>Productos</h3>
          <p>Administra el catálogo de productos</p>
          <Link href="/products">Ir a productos</Link>
        </IgrCard>

        <IgrCard style={{ padding: 20, minWidth: 200 }}>
          <h3>Clientes</h3>
          <p>Gestiona los clientes</p>
          <Link href="/customers">Ir a clientes</Link>
        </IgrCard>

      </div>
    </div>
  );
}