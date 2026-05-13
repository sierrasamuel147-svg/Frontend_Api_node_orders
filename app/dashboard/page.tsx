"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { IgrCard } from "igniteui-react";

import { getOrders } from "@/app/services/orders";
import type { Order } from "@/app/types/order";

// 🔥 GRID DINÁMICO (SSR OFF)
const OrdersGrid = dynamic(
  () => import("../types/orders-grid"),
  {
    ssr: false,
  }
);

export default function Dashboard() {
  // =========================
  // STATE
  // =========================
  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // 🔍 SEARCH
  const [search, setSearch] =
    useState("");

  // 📄 PAGINATION
  const [page, setPage] =
    useState(1);

  const pageSize = 5;

  // =========================
  // LOAD DATA
  // =========================
  const loadData = async () => {
    try {
      setLoading(true);

      const data =
        await getOrders();

      setOrders(data);

    } catch (err) {
      console.error(err);

      setError(
        "Error cargando dashboard"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredOrders =
    useMemo(() => {
      return orders.filter(
        (order) => {
          const query =
            search.toLowerCase();

          const customerName =
            `${order.customer.firstName} ${order.customer.lastName}`.toLowerCase();

          return (
            order.orderNumber
              ?.toLowerCase()
              .includes(query) ||

            customerName.includes(
              query
            )
          );
        }
      );
    }, [orders, search]);

  // =========================
  // PAGINATION
  // =========================
  const totalPages =
    Math.ceil(
      filteredOrders.length /
        pageSize
    );

  const paginatedOrders =
    filteredOrders.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  // =========================
  // GRID DATA
  // =========================
  const gridData =
    paginatedOrders.map(
      (order) => ({
        ...order,

        customerName:
          `${order.customer.firstName} ${order.customer.lastName}`,
      })
    );

  // =========================
  // METRICS
  // =========================
  const totalOrders =
    filteredOrders.length;

  const totalRevenue =
    filteredOrders.reduce(
      (acc, order) =>
        acc + order.totalAmount,
      0
    );

  const averageOrder =
    totalOrders > 0
      ? totalRevenue /
        totalOrders
      : 0;

  const lastOrder =
    filteredOrders.length > 0
      ? filteredOrders[
          filteredOrders.length -
            1
        ]
      : null;

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-xl animate-pulse">
          Cargando dashboard...
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-6">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 text-lg mt-2">
          Gestión avanzada de pedidos y métricas.
        </p>
      </div>

      {/* HERO */}
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

          <p className="uppercase tracking-widest text-slate-300 text-sm mb-3">
            Orders Management System
          </p>

          <h2 className="text-5xl font-bold mb-4">
            Panel de Control
          </h2>

          <p className="max-w-2xl text-slate-300 text-lg">
            Monitorea pedidos, ventas y actividad comercial en tiempo real.
          </p>

        </div>

        <div className="absolute -right-20 -top-20 w-72 h-72 bg-white/10 rounded-full" />

        <div className="absolute right-10 bottom-0 w-40 h-40 bg-white/5 rounded-full" />
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL */}
        <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="p-7">

            <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mb-6">
              📦
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Total Pedidos
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              {totalOrders}
            </h3>

          </div>
        </IgrCard>

        {/* SALES */}
        <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="p-7">

            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl mb-6">
              💰
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Total Ventas
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              $
              {totalRevenue.toFixed(
                2
              )}
            </h3>

          </div>
        </IgrCard>

        {/* AVG */}
        <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="p-7">

            <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl mb-6">
              📈
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Promedio
            </p>

            <h3 className="text-4xl font-bold text-slate-900">
              $
              {averageOrder.toFixed(
                2
              )}
            </h3>

          </div>
        </IgrCard>

        {/* LAST */}
        <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all">
          <div className="p-7">

            <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-2xl mb-6">
              🚚
            </div>

            <p className="text-slate-500 text-sm mb-2">
              Último Pedido
            </p>

            <h3 className="text-2xl font-bold text-slate-900">
              {lastOrder
                ? lastOrder.orderNumber
                : "N/D"}
            </h3>

          </div>
        </IgrCard>
      </div>

      {/* SYSTEM STATUS */}
      <IgrCard className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="p-8">

          <p className="uppercase tracking-widest text-blue-200 text-sm mb-3">
            Rendimiento
          </p>

          <h3 className="text-3xl font-bold mb-4">
            Estado del Sistema
          </h3>

          <p className="text-blue-100 leading-relaxed mb-8">
            El sistema se encuentra conectado correctamente con la API y todos los módulos principales funcionan de manera estable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">

            {/* API BUTTON */}
            <a
              href="https://ordersapi-epg9cfe7gfh4dxa5.chilecentral-01.azurewebsites.net"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1
                rounded-2xl
                bg-white
                px-6
                py-4
                text-center
                font-semibold
                text-slate-900
                transition
                hover:scale-[1.02]
                hover:bg-slate-100
              "
            >
              Ver API
            </a>

            {/* SWAGGER BUTTON */}
            <a
              href="https://ordersapi-epg9cfe7gfh4dxa5.chilecentral-01.azurewebsites.net/api-docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex-1
                rounded-2xl
                border
                border-white/30
                bg-white/10
                px-6
                py-4
                text-center
                font-semibold
                text-white
                backdrop-blur-sm
                transition
                hover:bg-white/20
              "
            >
              Ver Swagger
            </a>

          </div>
        </div>
      </IgrCard>

      {/* GRID */}
      <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="p-8">

          {/* HEADER GRID */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Pedidos
              </h2>

              <p className="text-slate-500 mt-1">
                {
                  filteredOrders.length
                } resultados encontrados
              </p>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Buscar pedido o cliente..."
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );

                setPage(1);
              }}
              className="
                w-full
                lg:w-[350px]
                rounded-2xl
                border
                border-slate-300
                px-4
                py-3
                outline-none
                transition
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />

          </div>

          {/* GRID */}
          <OrdersGrid
            data={gridData}
          />

          {/* PAGINATION */}
          <div className="flex justify-end items-center gap-4 mt-6">

            <button
              disabled={page === 1}
              onClick={() =>
                setPage(page - 1)
              }
              className="
                px-4
                py-2
                rounded-xl
                border
                border-slate-300
                disabled:opacity-50
              "
            >
              Anterior
            </button>

            <span className="text-slate-600">
              Página {page} de{" "}
              {totalPages || 1}
            </span>

            <button
              disabled={
                page === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setPage(page + 1)
              }
              className="
                px-4
                py-2
                rounded-xl
                border
                border-slate-300
                disabled:opacity-50
              "
            >
              Siguiente
            </button>

          </div>
        </div>
      </IgrCard>
    </div>
  );
}