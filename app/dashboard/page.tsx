"use client";

import { useEffect, useState } from "react";
import { IgrCard } from "igniteui-react";
import { getOrders } from "@/app/services/orders";
import type { Order } from "@/app/types/order";

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const data = await getOrders();

      setOrders(data);
    } catch (err) {
      console.error(err);

      setError(
        "Error cargando datos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔹 MÉTRICAS
  const totalOrders = orders.length;

  const totalRevenue = orders.reduce(
    (acc, order) =>
      acc + order.totalAmount,
    0
  );

  const averageOrder =
    totalOrders > 0
      ? totalRevenue / totalOrders
      : 0;

  const lastOrder =
    orders.length > 0
      ? orders[orders.length - 1]
      : null;

  // 🔹 LOADING
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando dashboard...
        </div>
      </div>
    );
  }

  // 🔹 ERROR
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 🔹 HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 text-lg">
          Resumen general de pedidos,
          ventas y métricas del
          sistema.
        </p>
      </div>

      {/* 🔹 HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-slate-900
          to-slate-800
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="text-slate-300 text-sm uppercase tracking-widest mb-3">
            Sistema de Gestión de
            Pedidos
          </p>

          <h2 className="text-5xl font-bold mb-4">
            Bienvenido de nuevo 
          </h2>

          <p className="max-w-2xl text-slate-300 text-lg leading-relaxed">
            Controla tus ventas,
            monitorea pedidos y
            administra productos desde
            un dashboard moderno y
            profesional.
          </p>
        </div>

        {/* 🔹 DECORACIÓN */}
        <div
          className="
            absolute
            -right-16
            -top-16
            w-72
            h-72
            bg-white/10
            rounded-full
          "
        />

        <div
          className="
            absolute
            right-20
            bottom-0
            w-40
            h-40
            bg-white/5
            rounded-full
          "
        />
      </div>

      {/* 🔹 TARJETAS */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >
        {/* TOTAL PEDIDOS */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <div className="p-7">
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
                mb-6
              "
            >
              📦
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Total de Pedidos
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              {totalOrders}
            </h3>
          </div>
        </IgrCard>

        {/* TOTAL VENDIDO */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <div className="p-7">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              "
            >
              💰
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Total Vendido
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              $
              {totalRevenue.toFixed(2)}
            </h3>
          </div>
        </IgrCard>

        {/* PROMEDIO */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <div className="p-7">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-orange-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              "
            >
              📈
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Promedio por Pedido
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              $
              {averageOrder.toFixed(2)}
            </h3>
          </div>
        </IgrCard>

        {/* ÚLTIMO PEDIDO */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
          "
        >
          <div className="p-7">
            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
                text-2xl
                mb-6
              "
            >
              🚚
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Último Pedido
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              {lastOrder
                ? `#${lastOrder.id}`
                : "N/D"}
            </h3>
          </div>
        </IgrCard>
      </div>

      {/* 🔹 SECCIÓN EXTRA */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        "
      >
        {/* RESUMEN */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Resumen de Pedidos
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Total de Pedidos
                </span>

                <span className="font-semibold">
                  {totalOrders}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Total Vendido
                </span>

                <span className="font-semibold">
                  $
                  {totalRevenue.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Promedio de Venta
                </span>

                <span className="font-semibold">
                  $
                  {averageOrder.toFixed(
                    2
                  )}
                </span>
              </div>
            </div>
          </div>
        </IgrCard>

        {/* ESTADO */}
        <IgrCard
          className="
            rounded-3xl
            border
            border-slate-200
            bg-gradient-to-br
            from-blue-600
            to-indigo-700
            text-white
            shadow-xl
          "
        >
          <div className="p-8">
            <p className="uppercase tracking-widest text-blue-200 text-sm mb-3">
              Estado del Sistema
            </p>

            <h3 className="text-3xl font-bold mb-4">
              Todo funciona
              correctamente
            </h3>

            <p className="text-blue-100 leading-relaxed">
              El dashboard está
              conectado exitosamente y
              todos los servicios se
              encuentran operativos.
            </p>
          </div>
        </IgrCard>
      </div>
    </div>
  );
}