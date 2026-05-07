"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  getOrders,
  deleteOrder,
} from "@/app/services/orders";
import type { Order } from "@/app/types/order";

// 🔥 IMPORT DINÁMICO
const IgrGrid = dynamic(
  () =>
    import("igniteui-react-grids").then(
      (m) => m.IgrGrid
    ),
  { ssr: false }
) as any;

const IgrColumn = dynamic(
  () =>
    import("igniteui-react-grids").then(
      (m) => m.IgrColumn
    ),
  { ssr: false }
) as any;

// 🔥 REGISTRO
if (typeof window !== "undefined") {
  import("igniteui-react-grids").then((m) => {
    m.IgrGridModule.register();
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando pedidos");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete = confirm(
      "¿Eliminar pedido?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);

      await loadData();
    } catch (err) {
      console.error(err);

      alert("Error eliminando pedido");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 MÉTRICAS
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (acc, order) =>
      acc + (order.totalAmount ?? 0),
    0
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando pedidos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-3xl p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 🔹 HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Pedidos
          </h1>

          <p className="text-slate-500 text-lg mt-2">
            Gestiona todos los pedidos de
            clientes desde un solo lugar.
          </p>
        </div>

        {/* 🔹 BOTÓN */}
        <Link
          href="/orders/create"
          className="
            inline-flex
            items-center
            justify-center
            px-6
            py-3
            rounded-2xl
            bg-slate-900
            text-white
            font-medium
            shadow-lg
            hover:bg-slate-800
            transition-all
            duration-200
          "
        >
          Crear Pedido
        </Link>
      </div>

      {/* 🔹 HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-indigo-600
          to-blue-700
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="uppercase tracking-widest text-blue-200 text-sm mb-3">
            Resumen de Pedidos
          </p>

          <h2 className="text-5xl font-bold mb-4">
            {totalOrders} Pedidos Activos
          </h2>

          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Supervisa compras de clientes,
            monitorea la actividad de los
            pedidos y administra ventas de
            manera eficiente.
          </p>
        </div>

        {/* DECORACIÓN */}
        <div
          className="
            absolute
            -top-20
            -right-20
            w-80
            h-80
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-16
            w-40
            h-40
            rounded-full
            bg-white/5
          "
        />
      </div>

      {/* 🔹 STATS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {/* TOTAL PEDIDOS */}
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all
          "
        >
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-blue-100
              flex
              items-center
              justify-center
              text-2xl
              mb-5
            "
          >
            Ped
          </div>

          <p className="text-slate-500 text-sm mb-2">
            Total Pedidos
          </p>

          <h3 className="text-4xl font-bold text-slate-900">
            {totalOrders}
          </h3>
        </div>

        {/* INGRESOS */}
        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-7
            shadow-sm
            hover:shadow-xl
            transition-all
          "
        >
          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-green-100
              flex
              items-center
              justify-center
              text-lg
              font-bold
              text-green-700
              mb-5
            "
          >
            $
          </div>

          <p className="text-slate-500 text-sm mb-2">
            Ingresos Totales
          </p>

          <h3 className="text-4xl font-bold text-slate-900">
            ${totalRevenue.toFixed(2)}
          </h3>
        </div>

        {/* ESTADO */}
        <div
          className="
            rounded-3xl
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            p-7
            text-white
            shadow-xl
          "
        >
          <p className="uppercase tracking-widest text-slate-400 text-sm mb-3">
            Estado
          </p>

          <h3 className="text-3xl font-bold mb-3">
            Sistema en Línea
          </h3>

          <p className="text-slate-300 leading-relaxed">
            Los pedidos se sincronizan
            correctamente y todos los
            servicios funcionan con
            normalidad.
          </p>
        </div>
      </div>

      {/* 🔹 TABLA */}
      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-sm
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div
          className="
            px-8
            py-6
            border-b
            border-slate-200
            flex
            items-center
            justify-between
            flex-wrap
            gap-4
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Tabla de Pedidos
            </h2>

            <p className="text-slate-500 mt-1">
              Lista de todos los pedidos
              de clientes.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="p-6">
          <IgrGrid
            data={orders}
            autoGenerate={false}
            height="700px"
            rowHeight="60"
          >
            <IgrColumn
              field="id"
              header="ID"
            />

            <IgrColumn
              field="orderNumber"
              header="Pedido #"
            />

            {/* CLIENTE */}
            <IgrColumn
              header="Cliente"
              bodyTemplate={(ctx: any) => {
                const order =
                  ctx.cell.row.data;

                return (
                  <div className="font-medium text-slate-800">
                    {order.customer
                      ? `${order.customer.firstName} ${order.customer.lastName}`
                      : "Sin cliente"}
                  </div>
                );
              }}
            />

            {/* TOTAL */}
            <IgrColumn
              header="Total"
              bodyTemplate={(ctx: any) => {
                const order =
                  ctx.cell.row.data;

                return (
                  <span className="font-semibold text-emerald-600">
                    $
                    {(
                      order.totalAmount ??
                      0
                    ).toFixed(2)}
                  </span>
                );
              }}
            />

            {/* FECHA */}
            <IgrColumn
              header="Fecha"
              bodyTemplate={(ctx: any) => {
                const order =
                  ctx.cell.row.data;

                return (
                  <span className="text-slate-600">
                    {order.orderDate
                      ? new Date(
                          order.orderDate
                        ).toLocaleDateString()
                      : "Sin fecha"}
                  </span>
                );
              }}
            />

            {/* ACCIONES */}
            <IgrColumn
              header="Acciones"
              bodyTemplate={(ctx: any) => {
                const order =
                  ctx.cell.row.data;

                return (
                  <div className="flex gap-2 items-center">
                    {/* VER */}
                    <Link
                      href={`/orders/${order.id}`}
                    >
                      <button
                        className="
                          px-3
                          py-2
                          rounded-xl
                          bg-blue-100
                          text-blue-700
                          font-medium
                          hover:bg-blue-200
                          transition-all
                        "
                      >
                        Ver
                      </button>
                    </Link>

                    {/* EDITAR */}
                    <Link
                      href={`/orders/${order.id}/edit`}
                    >
                      <button
                        className="
                          px-3
                          py-2
                          rounded-xl
                          bg-amber-100
                          text-amber-700
                          font-medium
                          hover:bg-amber-200
                          transition-all
                        "
                      >
                        Editar
                      </button>
                    </Link>

                    {/* ELIMINAR */}
                    <button
                      onClick={() =>
                        handleDelete(order.id)
                      }
                      className="
                        px-3
                        py-2
                        rounded-xl
                        bg-red-100
                        text-red-700
                        font-medium
                        hover:bg-red-200
                        transition-all
                      "
                    >
                      Eliminar
                    </button>
                  </div>
                );
              }}
            />
          </IgrGrid>
        </div>
      </div>
    </div>
  );
}