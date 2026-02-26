---
trigger: manual
---

### Install TanStack Qwik Table adapter using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/qwik-table` package to integrate TanStack Table with Qwik 1 projects. Note that this adapter currently only supports Client-Side Rendering (CSR).

```bash
npm install @tanstack/qwik-table
```

---

### Install Node.js Dependencies and Run Development Server

Source: https://tanstack.com/table/latest/docs/framework/react/examples/bootstrap

This shell command sequence is commonly used in Node.js projects to prepare the development environment. `npm install` downloads and installs all project dependencies defined in `package.json`, while `npm run dev` executes the 'dev' script, typically starting a local development server or build process.

```shell
npm install && npm run dev
```

---

### Install TanStack Solid Table adapter using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/solid-table` package to integrate TanStack Table with Solid-JS 1 projects. This adapter is designed for Solid's reactive paradigm.

```bash
npm install @tanstack/solid-table
```

---

### Define Project Dependencies and Scripts in package.json

Source: https://tanstack.com/table/latest/docs/framework/solid/examples/column-groups

This `package.json` snippet outlines the project's metadata, development scripts for starting, building, and serving the application, and lists the required dependencies. Key dependencies include `@tanstack/solid-table` for table functionality, `solid-js` for the UI framework, and `vite` for the build tool.

```json
{
  "name": "tanstack-table-example-solid-column-groups",
  "private": true,
  "scripts": {
    "start": "vite",
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview"
  },
  "license": "MIT",
  "devDependencies": {
    "typescript": "5.4.5",
    "vite": "^5.3.2",
    "vite-plugin-solid": "^2.10.2"
  },
  "dependencies": {
    "@tanstack/solid-table": "^8.21.3",
    "solid-js": "^1.8.18"
  }
}
```

---

### Install TanStack Lit Table adapter using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/lit-table` package to integrate TanStack Table with Lit 3 projects. This adapter provides compatibility for Lit-based web components.

```bash
npm install @tanstack/lit-table
```

---

### Initialize Svelte Application in main.ts

Source: https://tanstack.com/table/latest/docs/framework/svelte/examples/basic

This TypeScript snippet from `main.ts` demonstrates the entry point for a Svelte application. It imports the root `App.svelte` component, instantiates it, and mounts it to a specific DOM element with the ID 'root'. This is a standard setup for Svelte applications using Vite.

```typescript
// @ts-ignore import App from './App.svelte' const app = new App({ target: document.getElementById('root')!, }) export default app
```

---

### Configure Vite Development Server and Build for React

Source: https://tanstack.com/table/latest/docs/framework/react/examples/sorting

This Vite configuration file defines how the project is built and served. It integrates the `@vitejs/plugin-react` for React Fast Refresh and includes `@rollup/plugin-replace` to inject development-specific environment variables, ensuring proper setup for a React application.

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import rollupReplace from "@rollup/plugin-replace";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
  ],
});
```

---

### Example Deeply Nested User Data in JSON

Source: https://tanstack.com/table/latest/docs/guide/data

Presents a sample JSON array with deeply nested `name` and `info` objects, demonstrating how TanStack Table can handle more complex data structures. This example shows data where properties like 'first name' or 'age' are not at the top level of the user object.

```json
[
  {
    "name": {
      "first": "Tanner",
      "last": "Linsley"
    },
    "info": {
      "age": 33,
      "visits": 100
    }
  },
  {
    "name": {
      "first": "Kevin",
      "last": "Vandy"
    },
    "info": {
      "age": 27,
      "visits": 200
    }
  }
]
```

---

### Setup TanStack Libraries and Initialize React App

Source: https://tanstack.com/table/latest/docs/framework/react/examples/virtualized-infinite-scrolling

Imports and initializes the three core TanStack libraries: React Table for table logic, React Query for data fetching with infinite query support, and React Virtual for virtualization. Sets up the main App component with refs and state management for sorting and table container.

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'

import { fetchData, Person, PersonApiResponse } from './makeData'

const fetchSize = 50

function App() {
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
```

---

### Project Dependencies and Scripts Configuration (JSON)

Source: https://tanstack.com/table/latest/docs/framework/react/examples/pagination

This `package.json` file defines the project's metadata, including its name and private status. It specifies essential scripts for development (`dev`, `build`, `serve`, `start`) and lists both production dependencies (e.g., `@tanstack/react-table`, `react`) and development dependencies (e.g., `typescript`, `vite`) required for building and running the application.

```json
{
  "name": "tanstack-table-example-pagination",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview",
    "start": "vite"
  },
  "dependencies": {
    "@faker-js/faker": "^8.4.1",
    "@tanstack/react-table": "^8.21.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@rollup/plugin-replace": "^5.0.7",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "5.4.5",
    "vite": "^5.3.2"
  }
}
```

---

### Basic Row Model Setup with useReactTable

Source: https://tanstack.com/table/latest/docs/guide/row-models

Demonstrates the fundamental setup of TanStack Table with the getCoreRowModel row model. This is the minimal configuration needed to create a table instance with core row functionality. The getCoreRowModel is imported and passed to useReactTable to enable basic row generation.

```typescript
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";

function Component() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(), //row model
  });
}
```

---

### Install TanStack Table Core package using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/table-core` package when a specific framework adapter is not available or for building custom framework integrations. This package provides the core logic without framework-specific bindings.

```bash
npm install @tanstack/table-core
```

---

### Define Vue.js Component Setup and Initial Data for TanStack Table

Source: https://tanstack.com/table/latest/docs/framework/vue/examples/basic

This TypeScript snippet sets up a Vue.js component using the `<script setup>` syntax. It imports necessary functions from `@tanstack/vue-table` and `vue`, defines a `Person` interface for table row data, and initializes a `defaultData` array with sample `Person` objects. This forms the basic structure for a TanStack Table in a Vue application, preparing the data and core utilities for table rendering.

```typescript
<script setup lang="ts">
import {
FlexRender,
getCoreRowModel,
useVueTable,
createColumnHelper,
} from '@tanstack/vue-table'
import { ref } from 'vue'
type Person = {
firstName: string
lastName: string
age: number
visits: number
status: string
progress: number
}
const defaultData: Person[] = [
{
firstName: 'tanner',
lastName: 'linsley',
```

---

### Install TanStack Angular Table adapter using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/angular-table` package to integrate TanStack Table with Angular 17 projects. This adapter leverages Angular's new Signal implementation for reactivity.

```bash
npm install @tanstack/angular-table
```

---

### Package Configuration for TanStack Table with DnD

Source: https://tanstack.com/table/latest/docs/framework/react/examples/column-dnd

NPM package.json configuration for a TanStack Table example with drag-and-drop functionality. Includes dependencies for @dnd-kit libraries, React, TanStack Table, and Faker for data generation. Development dependencies include TypeScript, Vite, and React type definitions for a modern development setup.

```json
{
  "name": "tanstack-table-example-column-dnd",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "serve": "vite preview --port 3000",
    "start": "vite"
  },
  "dependencies": {
    "@dnd-kit/core": "^6.1.0",
    "@dnd-kit/modifiers": "^7.0.0",
    "@dnd-kit/sortable": "^8.0.0",
    "@dnd-kit/utilities": "^3.2.2",
    "@faker-js/faker": "^8.4.1",
    "@tanstack/react-table": "^8.21.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@rollup/plugin-replace": "^5.0.7",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "5.4.5",
    "vite": "^5.3.2"
  }
}
```

---

### Install TanStack React Table adapter using npm

Source: https://tanstack.com/table/latest/docs/installation

Install the `@tanstack/react-table` package to integrate TanStack Table with React projects. This adapter is compatible with React versions 16.8, 17, 18, and 19.

```bash
npm install @tanstack/react-table
```

---

### React Application Setup with Root Element

Source: https://tanstack.com/table/latest/docs/framework/react/examples/sorting

Initializes React application by importing TanStack React Table utilities, creating sample data, managing sorting state, and rendering the App component to the DOM root element with React StrictMode.

```TypeScript
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---
