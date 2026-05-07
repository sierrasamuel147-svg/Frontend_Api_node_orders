# Sistema de Gestión de Órdenes

Aplicación web moderna para la gestión de órdenes y productos, desarrollada con Next.js y una interfaz profesional basada en Ignite UI.

---

# Tecnologías Utilizadas

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Ignite UI React Grids

## Backend API

- Node.js
- API REST
- Desplegada en Microsoft Azure

---

# Funcionalidades Principales

- Gestión de órdenes
- Gestión de productos
- Visualización de detalles de productos
- Visualización de detalles de órdenes
- Dashboard moderno
- Diseño responsive
- Tablas dinámicas con Ignite UI
- Operaciones CRUD
- Integración con API REST
- Navegación moderna

---

# Arquitectura del Proyecto

```plaintext
app/
 ├── dashboard/
 ├── orders/
 ├── products/
 ├── services/
 ├── types/
```

---

# Librería UI Principal

La principal librería utilizada para el manejo de tablas y grids fue:

- Ignite UI for React

Características utilizadas:

- Grids dinámicos
- Templates personalizados
- Renderizado de datos
- Tablas responsivas
- Estilos modernos

---

# Integración con API

El frontend consume una API REST desarrollada en Node.js y desplegada en Azure.

Principales endpoints utilizados:

- Orders
- Products
- Customers

---

# Instalación del Proyecto

## Clonar repositorio

```bash
git clone URL_DEL_REPOSITORIO
```

---

## Instalar dependencias

```bash
npm install
```

---

## Ejecutar en desarrollo

```bash
npm run dev
```

---

# Compilar Proyecto

```bash
npm run build
```

---

# Ejecutar en Producción

```bash
npm start
```

---

# Variables de Entorno

Crear un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=URL_DE_LA_API
```

---

# Flujo de Trabajo Git

Este proyecto utiliza:

- Git Flow
- Commits semánticos

Ejemplos:

```bash
feat: agregar módulo de productos
fix: corregir renderizado del grid
style: mejorar interfaz del dashboard
```

---

# Despliegue

## Frontend

- Vercel
- Compatible con despliegue Next.js

## Backend

- Microsoft Azure

---

# Autor

Proyecto desarrollado por Sergio Gomez y Samuel Sierra como plataforma moderna de gestión de órdenes utilizando Next.js, Azure e Ignite UI.
