"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  getProducts,
  deleteProduct,
} from "@/app/services/products";
import type { Product } from "@/app/types/order";

// IMPORTACIÓN DINÁMICA
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

// REGISTRO
if (typeof window !== "undefined") {
  import("igniteui-react-grids").then((m) => {
    m.IgrGridModule.register();
  });
}

export default function ProductsPage() {
  const [products, setProducts] = useState<
    Product[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data);
    } catch (err) {
      console.error(err);

      setError(
        "Error cargando productos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ELIMINAR
  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete = confirm(
      "¿Eliminar producto?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (err) {
      console.error(err);

      alert(
        "Error eliminando producto"
      );
    }
  };

  // MÉTRICAS
  const totalProducts =
    products.length;

  const activeProducts =
    products.filter(
      (p) => !p.isDiscontinued
    ).length;

  const discontinuedProducts =
    products.filter(
      (p) => p.isDiscontinued
    ).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando productos...
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
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Productos
          </h1>

          <p className="text-slate-500 text-lg mt-2">
            Administra tu inventario y
            monitorea todos los productos
            disponibles.
          </p>
        </div>

        {/* BOTÓN */}
        <Link
          href="/products/create"
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
          Crear Producto
        </Link>
      </div>

      {/* HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-violet-600
          to-purple-700
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="uppercase tracking-widest text-violet-200 text-sm mb-3">
            Resumen de Inventario
          </p>

          <h2 className="text-5xl font-bold mb-4">
            {totalProducts} Productos
          </h2>

          <p className="text-violet-100 text-lg max-w-2xl leading-relaxed">
            Organiza productos, administra
            precios y monitorea el estado
            del inventario desde una
            interfaz moderna.
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

      {/* ESTADÍSTICAS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {/* TOTAL */}
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
          <p className="text-slate-500 text-sm mb-2">
            Total de Productos
          </p>

          <h3 className="text-4xl font-bold text-slate-900">
            {totalProducts}
          </h3>
        </div>

        {/* ACTIVOS */}
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
          <p className="text-slate-500 text-sm mb-2">
            Productos Activos
          </p>

          <h3 className="text-4xl font-bold text-slate-900">
            {activeProducts}
          </h3>
        </div>

        {/* DESCONTINUADOS */}
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
            Descontinuados
          </p>

          <h3 className="text-4xl font-bold mb-3">
            {discontinuedProducts}
          </h3>

          <p className="text-slate-300 leading-relaxed">
            Productos que ya no están
            disponibles en inventario.
          </p>
        </div>
      </div>

      {/* TABLA */}
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
              Tabla de Productos
            </h2>

            <p className="text-slate-500 mt-1">
              Lista de todos los productos
              registrados.
            </p>
          </div>
        </div>

        {/* GRID */}
        <div className="p-6">
          <IgrGrid
            data={products}
            autoGenerate={false}
            height="700px"
            rowHeight="60"
          >
            {/* ID */}
            <IgrColumn
              field="id"
              header="ID"
            />

            {/* NOMBRE */}
            <IgrColumn
              field="productName"
              header="Producto"
            />

            {/* PRECIO */}
            <IgrColumn
              header="Precio"
              bodyTemplate={(ctx: any) => {
                const product =
                  ctx.cell.row.data;

                return (
                  <span className="font-semibold text-emerald-600">
                    $
                    {(
                      product.unitPrice ??
                      0
                    ).toFixed(2)}
                  </span>
                );
              }}
            />

            {/* PAQUETE */}
            <IgrColumn
              field="package"
              header="Paquete"
            />

            {/* ESTADO */}
            <IgrColumn
              header="Estado"
              bodyTemplate={(ctx: any) => {
                const product =
                  ctx.cell.row.data;

                return product.isDiscontinued ? (
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-red-100
                      text-red-700
                      text-sm
                      font-medium
                    "
                  >
                    Descontinuado
                  </span>
                ) : (
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-emerald-100
                      text-emerald-700
                      text-sm
                      font-medium
                    "
                  >
                    Activo
                  </span>
                );
              }}
            />

            {/* ACCIONES */}
            <IgrColumn
              header="Acciones"
              bodyTemplate={(ctx: any) => {
                const product =
                  ctx.cell.row.data;

                return (
                  <div className="flex gap-2 items-center">
                    {/* VER */}
                    <Link
                      href={`/products/${product.id}`}
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
                      href={`/products/${product.id}/edit`}
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
                        handleDelete(product.id)
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