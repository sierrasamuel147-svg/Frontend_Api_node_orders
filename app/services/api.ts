import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ⏱ evita requests colgados
});

// 🔹 Interceptor de request
api.interceptors.request.use(
  (config) => {
    // aquí podrías agregar auth token en el futuro
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 Interceptor de response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 🔴 Manejo centralizado de errores
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url,
      });

      // puedes personalizar mensajes
      if (error.response.status === 404) {
        console.warn("Recurso no encontrado");
      }

      if (error.response.status >= 500) {
        console.error("Error del servidor");
      }
    } else if (error.request) {
      console.error("No hay respuesta del servidor");
    } else {
      console.error("Error configurando request", error.message);
    }

    return Promise.reject(error);
  }
);