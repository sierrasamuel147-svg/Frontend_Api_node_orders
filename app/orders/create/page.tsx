"use client";

import { useEffect, useState } from "react";
import { createOrder } from "@/app/services/orders";
import { getProducts } from "@/app/services/products";

type Product = {
  id: number;
  productName: string;
};

type Item = {
  productId: number;
  quantity: number;
};

export default function CreateOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [orderId, setOrderId] =
    useState<number | null>(null);

  const [loading, setLoading] =
    useState(false);

  // 🔹 CLIENTE
  const [customerId, setCustomerId] =
    useState<number>(1);

  // 🔹 PRODUCTOS
  const [productId, setProductId] =
    useState<number | null>(null);

  const [quantity, setQuantity] =
    useState(1);

  const [items, setItems] = useState<Item[]>(
    []
  );

  // 🔹 CARGAR PRODUCTOS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        console.error(
          "Error cargando productos",
          error
        );
      }
    };

    loadProducts();
  }, []);

  // 🔹 AGREGAR ITEM
  const handleAddItem = () => {
    if (!productId) {
      alert("Selecciona un producto");

      return;
    }

    setItems((prev) => [
      ...prev,
      {
        productId,
        quantity,
      },
    ]);

    setProductId(null);

    setQuantity(1);
  };

  // 🔹 ELIMINAR ITEM
  const handleRemoveItem = (
    index: number
  ) => {
    setItems((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // 🔹 CREAR PEDIDO
  const handleCreateOrder = async () => {
    if (items.length === 0) {
      alert(
        "Agrega al menos un producto"
      );

      return;
    }

    try {
      setLoading(true);

      const order = await createOrder({
        customerId,
        items,
      });

      setOrderId(order.id);

      alert("Pedido creado correctamente");

      // RESET
      setItems([]);

      setQuantity(1);

      setProductId(null);
    } catch (error) {
      console.error(error);

      alert("Error creando pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* 🔹 HEADER */}
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Crear Pedido
        </h1>

        <p className="text-slate-500 text-lg mt-2">
          Crea un nuevo pedido y agrega
          productos fácilmente.
        </p>
      </div>

      {/* 🔹 HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-emerald-600
          to-teal-700
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="uppercase tracking-widest text-emerald-200 text-sm mb-3">
            Nuevo Pedido
          </p>

          <h2 className="text-5xl font-bold mb-4">
            Gestiona tu próxima venta
          </h2>

          <p className="text-emerald-100 text-lg max-w-2xl leading-relaxed">
            Agrega productos, define
            cantidades y crea pedidos en
            un flujo moderno y rápido.
          </p>
        </div>

        {/* DECORACIÓN */}
        <div
          className="
            absolute
            -top-16
            -right-16
            w-72
            h-72
            rounded-full
            bg-white/10
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-12
            w-40
            h-40
            rounded-full
            bg-white/5
          "
        />
      </div>

      {/* 🔹 FORMULARIO */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* 🔹 IZQUIERDA */}
        <div className="xl:col-span-2">
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
                Configura los detalles del
                pedido.
              </p>
            </div>

            {/* CONTENIDO */}
            <div className="p-8 space-y-6">
              {/* CLIENTE */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  ID del Cliente
                </label>

                <input
                  type="number"
                  value={customerId}
                  onChange={(e) =>
                    setCustomerId(
                      Number(e.target.value)
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:ring-4
                    focus:ring-emerald-100
                    focus:border-emerald-500
                  "
                />
              </div>

              {/* PRODUCTO */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Producto
                </label>

                <select
                  value={productId ?? ""}
                  onChange={(e) => {
                    const value =
                      e.target.value;

                    setProductId(
                      value
                        ? Number(value)
                        : null
                    );
                  }}
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:ring-4
                    focus:ring-emerald-100
                    focus:border-emerald-500
                  "
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
              </div>

              {/* CANTIDAD */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Cantidad
                </label>

                <input
                  type="number"
                  value={quantity}
                  min={1}
                  onChange={(e) =>
                    setQuantity(
                      Number(e.target.value)
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:ring-4
                    focus:ring-emerald-100
                    focus:border-emerald-500
                  "
                />
              </div>

              {/* BOTÓN */}
              <button
                onClick={handleAddItem}
                className="
                  w-full
                  rounded-2xl
                  bg-slate-900
                  px-6
                  py-4
                  text-white
                  font-medium
                  shadow-lg
                  hover:bg-slate-800
                  transition-all
                "
              >
                Agregar Producto
              </button>
            </div>
          </div>
        </div>

        {/* 🔹 DERECHA */}
        <div>
          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
              overflow-hidden
              sticky
              top-24
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
                Productos del Pedido
              </h2>

              <p className="text-slate-500 text-sm mt-1">
                Productos agregados al
                pedido.
              </p>
            </div>

            {/* ITEMS */}
            <div className="p-6 space-y-4">
              {items.length === 0 ? (
                <div
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-300
                    p-8
                    text-center
                  "
                >
                  <p className="text-slate-500">
                    Aún no hay productos
                    agregados.
                  </p>
                </div>
              ) : (
                items.map((item, index) => {
                  const product =
                    products.find(
                      (p) =>
                        p.id ===
                        item.productId
                    );

                  return (
                    <div
                      key={index}
                      className="
                        rounded-2xl
                        border
                        border-slate-200
                        p-4
                        flex
                        items-center
                        justify-between
                        gap-4
                      "
                    >
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {
                            product?.productName
                          }
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                          Cantidad:{" "}
                          {item.quantity}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleRemoveItem(
                            index
                          )
                        }
                        className="
                          px-3
                          py-2
                          rounded-xl
                          bg-red-100
                          text-red-700
                          hover:bg-red-200
                          transition-all
                        "
                      >
                        Eliminar
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* FOOTER */}
            <div
              className="
                border-t
                border-slate-200
                p-6
              "
            >
              <button
                onClick={
                  handleCreateOrder
                }
                disabled={loading}
                className="
                  w-full
                  rounded-2xl
                  bg-emerald-600
                  px-6
                  py-4
                  text-white
                  font-semibold
                  shadow-lg
                  hover:bg-emerald-700
                  transition-all
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Creando..."
                  : "Crear Pedido"}
              </button>

              {orderId && (
                <div
                  className="
                    mt-4
                    rounded-2xl
                    bg-emerald-50
                    border
                    border-emerald-200
                    p-4
                  "
                >
                  <p className="text-emerald-700 font-medium">
                    Pedido creado con ID:
                    #{orderId}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}