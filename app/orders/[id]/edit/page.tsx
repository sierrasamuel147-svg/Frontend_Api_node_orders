"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
  getOrder,
  updateOrder,
  addItem,
  updateItem,
  deleteItem,
} from "@/app/services/orders";

import { getProducts } from "@/app/services/products";

type Product = {
  id: number;
  productName: string;
  unitPrice: number;
};

export default function EditOrderPage() {
  const params = useParams();

  const orderId = Number(params.id);

  const [order, setOrder] =
    useState<any>(null);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [status, setStatus] =
    useState("");

  const [newProductId, setNewProductId] =
    useState<number | null>(null);

  const [newQuantity, setNewQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  // 🔹 cargar pedido + productos
  useEffect(() => {
    const loadData = async () => {
      try {
        const [orderData, productsData] =
          await Promise.all([
            getOrder(orderId),
            getProducts(),
          ]);

        setOrder(orderData);

        setProducts(productsData);

        setStatus(
          orderData.status || "Pendiente"
        );
      } catch (error) {
        console.error(
          "Error cargando datos",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (orderId) loadData();
  }, [orderId]);

  // 🔹 actualizar estado
  const handleUpdateStatus =
    async () => {
      try {
        await updateOrder(orderId, {
          status,
        });

        alert(
          "Estado actualizado correctamente"
        );
      } catch (error) {
        console.error(error);

        alert(
          "Error actualizando estado"
        );
      }
    };

  // 🔹 actualizar cantidad
  const handleUpdateQuantity =
    async (
      itemId: number,
      quantity: number
    ) => {
      try {
        await updateItem(orderId, itemId, {
          quantity,
        });

        setOrder((prev: any) => ({
          ...prev,
          items: prev.items.map(
            (item: any) =>
              item.id === itemId
                ? { ...item, quantity }
                : item
          ),
        }));
      } catch (error) {
        console.error(error);

        alert(
          "Error actualizando cantidad"
        );
      }
    };

  // 🔹 eliminar item
  const handleDeleteItem =
    async (itemId: number) => {
      try {
        await deleteItem(orderId, itemId);

        setOrder((prev: any) => ({
          ...prev,
          items: prev.items.filter(
            (item: any) =>
              item.id !== itemId
          ),
        }));
      } catch (error) {
        console.error(error);

        alert(
          "Error eliminando producto"
        );
      }
    };

  // 🔹 agregar item
  const handleAddItem = async () => {
    if (!newProductId) {
      alert("Selecciona un producto");

      return;
    }

    try {
      const newItem = await addItem(
        orderId,
        {
          productId: newProductId,
          quantity: newQuantity,
        }
      );

      setOrder((prev: any) => ({
        ...prev,
        items: [...prev.items, newItem],
      }));

      setNewProductId(null);

      setNewQuantity(1);
    } catch (error) {
      console.error(error);

      alert(
        "Error agregando producto"
      );
    }
  };

  // 🔹 total
  const total =
    order?.items.reduce(
      (sum: number, item: any) => {
        return (
          sum +
          item.unitPrice * item.quantity
        );
      },
      0
    ) || 0;

  // 🔹 loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando pedido...
        </div>
      </div>
    );
  }

  // 🔹 pedido no encontrado
  if (!order) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Pedido no encontrado
        </h2>

        <p className="text-slate-500">
          El pedido solicitado no
          existe.
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
              Editando Pedido
            </span>

            <span className="text-slate-400">
              #{order.id}
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            Editar Pedido
          </h1>

          <p className="text-slate-500 text-lg mt-3 max-w-2xl">
            Administra productos,
            cantidades y estado del
            pedido en tiempo real.
          </p>
        </div>

        {/* 🔹 TARJETA TOTAL */}
        <div
          className="
            rounded-3xl
            bg-gradient-to-r
            from-emerald-500
            to-green-600
            px-8
            py-6
            text-white
            shadow-xl
            min-w-[260px]
          "
        >
          <p className="text-emerald-100 text-sm uppercase tracking-widest mb-2">
            Total del Pedido
          </p>

          <h2 className="text-4xl font-bold">
            ${total.toFixed(2)}
          </h2>
        </div>
      </div>

      {/* 🔹 GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* 🔹 IZQUIERDA */}
        <div className="xl:col-span-2 space-y-6">
          {/* ESTADO */}
          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              shadow-sm
              overflow-hidden
            "
          >
            <div className="px-8 py-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Estado del Pedido
              </h2>

              <p className="text-slate-500 mt-1">
                Actualiza el estado
                actual del pedido.
              </p>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-4">
              <input
                className="
                  flex-1
                  border
                  border-slate-300
                  rounded-2xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                  transition-all
                "
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
                }
                placeholder="Estado del pedido"
              />

              <button
                onClick={
                  handleUpdateStatus
                }
                className="
                  px-6
                  py-3
                  rounded-2xl
                  bg-blue-600
                  text-white
                  font-semibold
                  hover:bg-blue-700
                  transition-all
                  shadow-lg
                "
              >
                Actualizar
              </button>
            </div>
          </div>

          {/* PRODUCTOS */}
          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              shadow-sm
              overflow-hidden
            "
          >
            <div className="px-8 py-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Productos del Pedido
              </h2>

              <p className="text-slate-500 mt-1">
                Modifica cantidades o
                elimina productos.
              </p>
            </div>

            <div className="p-6 space-y-4">
              {order.items.map(
                (item: any) => (
                  <div
                    key={item.id}
                    className="
                      border
                      border-slate-200
                      rounded-2xl
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
                          Precio Unitario:
                          <span className="font-semibold text-slate-800 ml-2">
                            $
                            {
                              item.unitPrice
                            }
                          </span>
                        </p>
                      </div>

                      {/* ACCIONES */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <input
                          type="number"
                          className="
                            border
                            border-slate-300
                            rounded-xl
                            px-4
                            py-2
                            w-28
                            outline-none
                            focus:ring-4
                            focus:ring-blue-100
                            focus:border-blue-500
                          "
                          value={item.quantity}
                          min={1}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              Number(
                                e.target.value
                              )
                            )
                          }
                        />

                        <button
                          onClick={() =>
                            handleDeleteItem(
                              item.id
                            )
                          }
                          className="
                            px-4
                            py-2
                            rounded-xl
                            bg-red-500
                            text-white
                            font-medium
                            hover:bg-red-600
                            transition-all
                          "
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* 🔹 DERECHA */}
        <div className="space-y-6">
          {/* AGREGAR PRODUCTO */}
          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-3xl
              shadow-sm
              overflow-hidden
            "
          >
            <div className="px-6 py-5 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">
                Agregar Producto
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Añade nuevos productos
                al pedido.
              </p>
            </div>

            <div className="p-6 space-y-4">
              <select
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-2xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                "
                value={newProductId ?? ""}
                onChange={(e) =>
                  setNewProductId(
                    e.target.value
                      ? Number(
                          e.target.value
                        )
                      : null
                  )
                }
              >
                <option value="">
                  Seleccionar producto
                </option>

                {products.map((p) => (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {p.productName}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="
                  w-full
                  border
                  border-slate-300
                  rounded-2xl
                  px-4
                  py-3
                  outline-none
                  focus:ring-4
                  focus:ring-blue-100
                  focus:border-blue-500
                "
                value={newQuantity}
                min={1}
                onChange={(e) =>
                  setNewQuantity(
                    Number(e.target.value)
                  )
                }
              />

              <button
                onClick={handleAddItem}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  bg-emerald-500
                  text-white
                  font-semibold
                  hover:bg-emerald-600
                  transition-all
                  shadow-lg
                "
              >
                Agregar Producto
              </button>
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
              {
                order.items.length
              }
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Productos agregados
              actualmente a este
              pedido.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm mb-2">
                Total Actual
              </p>

              <h4 className="text-3xl font-bold text-emerald-400">
                ${total.toFixed(2)}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}