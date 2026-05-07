"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/app/services/products";
import type { Product } from "@/app/types/order";

export default function ProductDetailPage() {
  const params = useParams();

  const id = Number(params.id);

  const [product, setProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState<
    string | null
  >(null);

  const loadProduct = async () => {
    try {
      setLoading(true);

      const data = await getProduct(id);

      setProduct(data);
    } catch (err) {
      console.error(err);

      setError("Error cargando producto");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-slate-500 text-lg animate-pulse">
          Cargando producto...
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

  if (!product) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Producto no encontrado
        </h2>

        <p className="text-slate-500">
          El producto solicitado no existe.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`
                px-4 py-1 rounded-full text-sm font-medium
                ${
                  product.isDiscontinued
                    ? "bg-red-100 text-red-700"
                    : "bg-emerald-100 text-emerald-700"
                }
              `}
            >
              {product.isDiscontinued
                ? "Descontinuado"
                : "Activo"}
            </span>

            <span className="text-slate-400">
              Producto #{product.id}
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-slate-900">
            {product.productName}
          </h1>

          <p className="text-slate-500 text-lg mt-3 max-w-2xl">
            Información del producto,
            detalles de precio y datos
            del proveedor.
          </p>
        </div>

        {/* ACCIONES */}
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href={`/products/${product.id}/edit`}
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
            Editar Producto
          </Link>

          <Link
            href="/products"
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
            Volver
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div
        className="
          relative
          overflow-hidden
          rounded-3xl
          bg-gradient-to-r
          from-indigo-600
          to-violet-700
          p-10
          text-white
          shadow-2xl
        "
      >
        <div className="relative z-10">
          <p className="uppercase tracking-widest text-indigo-200 text-sm mb-3">
            Resumen del Producto
          </p>

          <h2 className="text-5xl font-bold mb-4">
            ${product.unitPrice}
          </h2>

          <p className="text-indigo-100 text-lg max-w-2xl leading-relaxed">
            Empaque: {product.package}
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

      {/* GRID */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        {/* INFORMACIÓN */}
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
                Detalles del Producto
              </h2>

              <p className="text-slate-500 mt-1">
                Información detallada sobre
                este producto.
              </p>
            </div>

            {/* CONTENIDO */}
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
                    ID del Producto
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900">
                    #{product.id}
                  </h3>
                </div>

                {/* PRECIO */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Precio Unitario
                  </p>

                  <h3 className="text-2xl font-bold text-emerald-600">
                    $
                    {product.unitPrice?.toFixed(
                      2
                    )}
                  </h3>
                </div>

                {/* EMPAQUE */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Empaque
                  </p>

                  <h3 className="text-xl font-semibold text-slate-900">
                    {product.package}
                  </h3>
                </div>

                {/* ESTADO */}
                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    p-5
                  "
                >
                  <p className="text-sm text-slate-500 mb-2">
                    Estado
                  </p>

                  <div>
                    {product.isDiscontinued ? (
                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-red-100
                          text-red-700
                          font-medium
                        "
                      >
                        Descontinuado
                      </span>
                    ) : (
                      <span
                        className="
                          px-4
                          py-2
                          rounded-full
                          bg-emerald-100
                          text-emerald-700
                          font-medium
                        "
                      >
                        Activo
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-6">
          {/* PROVEEDOR */}
          {product.supplier && (
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
                  Proveedor
                </h2>

                <p className="text-slate-500 text-sm mt-1">
                  Información y datos de
                  contacto del proveedor.
                </p>
              </div>

              {/* CONTENIDO */}
              <div className="p-6 space-y-5">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Empresa
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {
                      product.supplier
                        .companyName
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Contacto
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {
                      product.supplier
                        .contactName
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Ubicación
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {
                      product.supplier
                        .city
                    }
                    ,{" "}
                    {
                      product.supplier
                        .country
                    }
                  </h3>
                </div>

                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Teléfono
                  </p>

                  <h3 className="font-semibold text-slate-900">
                    {
                      product.supplier
                        .phone
                    }
                  </h3>
                </div>
              </div>
            </div>
          )}

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
              Estado del Inventario
            </p>

            <h3 className="text-3xl font-bold mb-4">
              {product.isDiscontinued
                ? "No Disponible"
                : "Disponible"}
            </h3>

            <p className="text-slate-300 leading-relaxed">
              Este producto actualmente{" "}
              {product.isDiscontinued
                ? "no está disponible para nuevos pedidos."
                : "está activo y disponible en inventario."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}