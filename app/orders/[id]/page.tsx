"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getOrder } from "@/app/services/orders";
import type { Order } from "@/app/types/order";

export default function OrderDetail() {
  const params = useParams();

  const id = Number(params.id);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const orderData = await getOrder(id);

      setOrder(orderData);
    } catch (err) {
      console.error(err);

      setError(
        "Error cargando el pedido"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadData();
  }, [id]);

  // 🔹 TOTAL PRODUCTOS
  const totalItems =
    order?.items.reduce(
      (acc, item) => acc + item.quantity,
      0
    ) ?? 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando pedido...
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

  if (!order) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Pedido no encontrado
        </h2>

        <p className="text-slate-500">
          El pedido solicitado no existe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 🔹 HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="
                px-4
                py-1
                rounded-full
                bg-blue-100
                text-blue-700
                text-sm
                font-medium
              "
            >
              Pedido #{order.orderNumber}
            </span>

            <span className="text-slate-400">
              ID #{order.id}
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Detalles del Pedido
          </h1>

          <p className="text-slate-500 text-lg mt-3 max-w-2xl">
            Revisa la información del cliente,
            productos comprados y totales del
            pedido.
          </p>
        </div>

        {/* ACCIONES */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/orders/${order.id}/edit`}
            className="
              px-5
              py-3
              rounded-2xl
              bg-amber-500
              text-white
              font-medium
              shadow-lg
              hover:bg-amber-600
              transition-all
            "
          >
             Editar Pedido
          </Link>

          <Link
            href="/orders"
            className="
              px-5
              py-3
              rounded-2xl
              border
              border-slate-300
              bg-white
              text-slate-700
              font-medium
              hover:bg-slate-100
              transition-all
            "
          >
            ← Volver
          </Link>
        </div>
      </div>

      {/* 🔹 HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-blue-600
          to-cyan-700
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="uppercase tracking-widest text-cyan-200 text-sm mb-3">
            Resumen del Pedido
          </p>

          <h2 className="text-5xl font-bold mb-4">
            $
            {order.totalAmount.toFixed(2)}
          </h2>

          <p className="text-cyan-100 text-lg max-w-2xl leading-relaxed">
            {totalItems} productos comprados por{" "}
            {order.customer.firstName}{" "}
            {order.customer.lastName}
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

      {/* 🔹 GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* 🔹 IZQUIERDA */}
        <div className="xl:col-span-2 space-y-6">
          {/* INFORMACIÓN */}
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
              "
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Información del Pedido
              </h2>

              <p className="text-slate-500 mt-1">
                Datos principales de este
                pedido.
              </p>
            </div>

            {/* CONTENT */}
            <div className="p-8">
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-6
                "
              >
                {/* ID */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    ID del Pedido
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900">
                    #{order.id}
                  </h3>
                </div>

                {/* NÚMERO */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Número de Pedido
                  </p>

                  <h3 className="text-2xl font-bold text-blue-600">
                    {order.orderNumber}
                  </h3>
                </div>

                {/* FECHA */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Fecha del Pedido
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900">
                    {new Date(
                      order.orderDate
                    ).toLocaleDateString()}
                  </h3>
                </div>

                {/* TOTAL */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Total
                  </p>

                  <h3 className="text-2xl font-bold text-emerald-600">
                    $
                    {order.totalAmount.toFixed(
                      2
                    )}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* 🔹 PRODUCTOS */}
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
              "
            >
              <h2 className="text-2xl font-bold text-slate-900">
                Productos del Pedido
              </h2>

              <p className="text-slate-500 mt-1">
                Productos incluidos en este
                pedido.
              </p>
            </div>

            {/* ITEMS */}
            <div className="p-6 space-y-4">
              {order.items.length === 0 ? (
                <div
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    p-10
                    text-center
                  "
                >
                  <p className="text-slate-500">
                    No hay productos en este
                    pedido.
                  </p>
                </div>
              ) : (
                order.items.map((item) => (
                  <div
                    key={item.id}
                    className="
                      rounded-2xl
                      border
                      border-slate-200
                      p-5
                      hover:shadow-md
                      transition-all
                    "
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* INFO */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">
                          {
                            item.product
                              .productName
                          }
                        </h3>

                        <p className="text-slate-500 mt-2">
                          Cantidad:{" "}
                          <span className="font-semibold text-slate-800">
                            {
                              item.quantity
                            }
                          </span>
                        </p>
                      </div>

                      {/* PRECIOS */}
                      <div className="flex gap-6 flex-wrap">
                        {/* UNITARIO */}
                        <div>
                          <p className="text-sm text-slate-500 mb-1">
                            Precio Unitario
                          </p>

                          <h4 className="font-bold text-slate-900">
                            $
                            {item.unitPrice.toFixed(
                              2
                            )}
                          </h4>
                        </div>

                        {/* SUBTOTAL */}
                        <div>
                          <p className="text-sm text-slate-500 mb-1">
                            Subtotal
                          </p>

                          <h4 className="font-bold text-emerald-600">
                            $
                            {(
                              item.unitPrice *
                              item.quantity
                            ).toFixed(2)}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* 🔹 DERECHA */}
        <div className="space-y-6">
          {/* CLIENTE */}
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
                px-6
                py-5
                border-b
                border-slate-200
              "
            >
              <h2 className="text-xl font-bold text-slate-900">
                Cliente
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Información del cliente.
              </p>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-5">
              <div>
                <p className="text-sm text-slate-500 mb-1">
                  Nombre Completo
                </p>

                <h3 className="font-semibold text-slate-900">
                  {
                    order.customer
                      .firstName
                  }{" "}
                  {
                    order.customer
                      .lastName
                  }
                </h3>
              </div>

              {order.customer.phone && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Teléfono
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {
                      order.customer
                        .phone
                    }
                  </h3>
                </div>
              )}
            </div>
          </div>

          {/* RESUMEN */}
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
              Resumen del Pedido
            </p>

            <h3 className="text-4xl font-bold mb-4">
              {totalItems}
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Total de productos comprados
              en este pedido.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-2">
                Total Generado
              </p>

              <h4 className="text-3xl font-bold text-emerald-400">
                $
                {order.totalAmount.toFixed(
                  2
                )}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}