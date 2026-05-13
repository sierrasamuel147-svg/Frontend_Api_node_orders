
"use client";

import { useState } from "react";

import {
  IgrCard,
  IgrButton,
  IgrInput,
} from "igniteui-react";

export default function ReportIssuePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    module: "",
    priority: "Media",
    description: "",
    steps: "",
  });

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const handleChange = (
    field: string,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    try {
      // 🔥 AQUÍ CONECTAS TU API
      console.log("Reporte enviado:", form);

      await new Promise((r) =>
        setTimeout(r, 1200)
      );

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        module: "",
        priority: "Media",
        description: "",
        steps: "",
      });

    } catch (error) {
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 lg:p-10">

      <div className="max-w-6xl mx-auto space-y-8">

        {/* ========================= */}
        {/* HERO */}
        {/* ========================= */}
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-red-600
            to-orange-500
            p-10
            text-white
            shadow-2xl
          "
        >
          <div className="relative z-10">

            <p className="uppercase tracking-widest text-red-100 text-sm mb-3">
              Support Center
            </p>

            <h1 className="text-5xl font-bold mb-4">
              Reportar Error
            </h1>

            <p className="max-w-3xl text-red-100 text-lg leading-relaxed">
              Registra problemas técnicos, errores del sistema o comportamientos inesperados.
              Mientras más preciso sea el reporte, más rápido podrá resolverse.
            </p>

          </div>

          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10" />

          <div className="absolute bottom-0 right-10 w-40 h-40 rounded-full bg-white/5" />
        </div>

        {/* ========================= */}
        {/* CONTENT */}
        {/* ========================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ========================= */}
          {/* FORM */}
          {/* ========================= */}
          <div className="xl:col-span-2">

            <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="p-8">

                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-slate-900">
                    Formulario de Incidencia
                  </h2>

                  <p className="text-slate-500 mt-2">
                    Completa toda la información necesaria para identificar el problema.
                  </p>
                </div>

                {success && (
                  <div
                    className="
                      mb-6
                      rounded-2xl
                      border
                      border-green-200
                      bg-green-50
                      p-4
                      text-green-700
                    "
                  >
                    El reporte fue enviado correctamente.
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* NAME + EMAIL */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Nombre
                      </label>

                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          handleChange(
                            "name",
                            e.target.value
                          )
                        }
                        placeholder="Tu nombre"
                        required
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-300
                          px-4
                          py-3
                          outline-none
                          focus:ring-2
                          focus:ring-red-500
                        "
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Correo
                      </label>

                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          handleChange(
                            "email",
                            e.target.value
                          )
                        }
                        placeholder="correo@ejemplo.com"
                        required
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-300
                          px-4
                          py-3
                          outline-none
                          focus:ring-2
                          focus:ring-red-500
                        "
                      />
                    </div>
                  </div>

                  {/* MODULE + PRIORITY */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Módulo afectado
                      </label>

                      <input
                        type="text"
                        value={form.module}
                        onChange={(e) =>
                          handleChange(
                            "module",
                            e.target.value
                          )
                        }
                        placeholder="Orders, Dashboard, Login..."
                        required
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-slate-300
                          px-4
                          py-3
                          outline-none
                          focus:ring-2
                          focus:ring-red-500
                        "
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Prioridad
                      </label>

                      <select
                        value={form.priority}
                        onChange={(e) =>
                          handleChange(
                            "priority",
                            e.target.value
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
                          focus:ring-2
                          focus:ring-red-500
                        "
                      >
                        <option>Baja</option>
                        <option>Media</option>
                        <option>Alta</option>
                        <option>Crítica</option>
                      </select>
                    </div>
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Descripción del error
                    </label>

                    <textarea
                      rows={5}
                      value={form.description}
                      onChange={(e) =>
                        handleChange(
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Explica claramente qué ocurrió..."
                      required
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        resize-none
                        focus:ring-2
                        focus:ring-red-500
                      "
                    />
                  </div>

                  {/* STEPS */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Pasos para reproducir el problema
                    </label>

                    <textarea
                      rows={5}
                      value={form.steps}
                      onChange={(e) =>
                        handleChange(
                          "steps",
                          e.target.value
                        )
                      }
                      placeholder="1. Entrar al dashboard..."
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-300
                        px-4
                        py-3
                        outline-none
                        resize-none
                        focus:ring-2
                        focus:ring-red-500
                      "
                    />
                  </div>

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      w-full
                      rounded-2xl
                      bg-red-600
                      px-6
                      py-4
                      text-lg
                      font-semibold
                      text-white
                      transition
                      hover:bg-red-700
                      disabled:opacity-50
                    "
                  >
                    {loading
                      ? "Enviando reporte..."
                      : "Enviar Reporte"}
                  </button>

                </form>
              </div>
            </IgrCard>
          </div>

          {/* ========================= */}
          {/* SIDE PANEL */}
          {/* ========================= */}
          <div className="space-y-6">

            {/* INFO */}
            <IgrCard className="rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="p-7">

                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Recomendaciones
                </h3>

                <div className="space-y-5 text-slate-600 leading-relaxed">

                  <div>
                    <p className="font-semibold text-slate-800 mb-1">
                      Describe el problema
                    </p>

                    <p>
                      Evita reportes vagos. “No funciona” no ayuda a identificar nada.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 mb-1">
                      Explica el contexto
                    </p>

                    <p>
                      Indica qué estabas haciendo antes del error y qué resultado esperabas.
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-slate-800 mb-1">
                      Prioriza correctamente
                    </p>

                    <p>
                      No marques todo como crítico. Eso degrada el proceso de soporte.
                    </p>
                  </div>

                </div>
              </div>
            </IgrCard>

            {/* STATUS */}
            <IgrCard className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-xl overflow-hidden">

              <div className="p-7 relative z-10">

                <p className="uppercase tracking-widest text-slate-400 text-sm mb-3">
                  System Health
                </p>

                <h3 className="text-3xl font-bold mb-4">
                  Estado Operativo
                </h3>

                <p className="text-slate-300 leading-relaxed mb-8">
                  La API principal y los servicios de autenticación están funcionando correctamente.
                </p>

                <div className="space-y-4">

                  <a
                    href="https://ordersapi-epg9cfe7gfh4dxa5.chilecentral-01.azurewebsites.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block
                      rounded-2xl
                      bg-white
                      px-5
                      py-4
                      text-center
                      font-semibold
                      text-slate-900
                      transition
                      hover:bg-slate-200
                    "
                  >
                    Ver API
                  </a>

                  <a
                    href="https://ordersapi-epg9cfe7gfh4dxa5.chilecentral-01.azurewebsites.net/swagger"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      block
                      rounded-2xl
                      border
                      border-white/20
                      bg-white/10
                      px-5
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

              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-white/5" />
            </IgrCard>
          </div>
        </div>
      </div>
    </div>
  );
}

