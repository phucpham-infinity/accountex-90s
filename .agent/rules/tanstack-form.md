---
trigger: manual
---

### Project Development Commands

Source: https://tanstack.com/form/latest/docs/framework/react/examples/tanstack-start

Instructions for setting up and running the TanStack project locally. It requires Node.js and pnpm package manager. After installation, the project can be started using the `pnpm dev` command.

```sh
pnpm install
pnpm dev
```

---

### Install Dependencies for TanStack Form React Simple

Source: https://tanstack.com/form/latest/docs/framework/react/examples/simple

This snippet shows the dependencies required to run the simple React example of TanStack Form. It includes React, TanStack Form, and related devtools, along with Vite for development.

```json
{
  "name": "@tanstack/form-example-react-simple",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite --port=3001",
    "build": "vite build",
    "preview": "vite preview",
    "test:types": "tsc"
  },
  "dependencies": {
    "@tanstack/react-devtools": "^0.7.8",
    "@tanstack/react-form": "^1.28.3",
    "@tanstack/react-form-devtools": "^0.2.16",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.7",
    "@types/react-dom": "^19.0.3",
    "@vitejs/plugin-react": "^5.1.1",
    "vite": "^7.2.2"
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

---

### React Form Setup with TanStack Devtools and React Query

Source: https://tanstack.com/form/latest/docs/framework/react/examples/query-integration

This snippet demonstrates the basic setup for a React application using TanStack Form. It includes importing necessary components from React, ReactDOM, TanStack libraries for form handling, devtools, and query management. It also initializes a QueryClient for React Query.

```typescript
import * as React from "react";
import { createRoot } from "react-dom/client";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { useForm } from "@tanstack/react-form";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import type { AnyFieldApi } from "@tanstack/react-form";

// Component to display field information (example)
function FieldInfo({ field }: { field: AnyFieldApi }) {
  // ... component implementation
  return null; // Placeholder
}

// Example usage of useForm hook (assuming it's defined elsewhere or within this scope)
// const form = useForm({
//   defaultValues: {
//     name: '',
//   },
//   onSubmit: async ({ value }) => {
//     console.log('Form submitted with:', value)
//   },
// })

// Initialize QueryClient
const queryClient = new QueryClient();

// Root component setup (example)
// const rootElement = document.getElementById('root')
// if (!rootElement) throw new Error('Failed to find the root element')
// const root = createRoot(rootElement)

// root.render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <App />
//       <TanStackDevtools />
//     </QueryClientProvider>
//   </React.StrictMode>
// )
```

---

### Initialize TanStack Form with Devtools

Source: https://tanstack.com/form/latest/docs/framework/react/examples/devtools

This snippet shows how to initialize the React application and integrate TanStack Devtools with a form plugin. It requires React and TanStack Devtools to be installed.

```jsx
import {
  createRoot
} from 'react-dom/client';
import {
  StrictMode
} from 'react';
import {
  TanStackDevtools
} from '@tanstack/react-devtools';
import {
  formDevtoolsPlugin
} from '@tanstack/form-devtools';
import App from './App';

const root = createRoot(document.getElementById('root')!); // Non-null assertion
root.render(
  <StrictMode>
    <App />
    <TanStackDevtools
      plugins={[
        formDevtoolsPlugin()
      ]}
      eventBusConfig={{
        debug: true
      }}
    />
  </StrictMode>
);
```

---

### React Application Setup with TanStack Devtools

Source: https://tanstack.com/form/latest/docs/framework/react/examples/large-form

Sets up the main React application entry point (`index.tsx`) for development. It uses `createRoot` from `react-dom/client` to render the `App` component and integrates `TanStackDevtools` for debugging form states.

```typescript
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import App from './App.tsx'

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
    <TanStackDevtools
      config={{
        hideUntilHover: true,
      }}
      plugins={[formDevtoolsPlugin()]}/>
  </React.StrictMode>,
)
```

---

### React Form Setup with TanStack Form and Query

Source: https://tanstack.com/form/latest/docs/framework/react/examples/query-integration

Sets up the root of a React application, integrating TanStack Form, TanStack Query, and TanStack Devtools. It initializes the QueryClient and renders the main App component within the QueryClientProvider.

```jsx
import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { formDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { useForm } from '@tanstack/react-form'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

import type { AnyFieldApi } from '@tanstack/react-form'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.join(',')}
        </em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...'
      : null}
    </>
  )
}

class DB {
  private data: { firstName: string; lastName: string }

  constructor() {
    this.data = { firstName: 'FirstName', lastName: 'LastName' }
  }

  getData(): { firstName: string; lastName: string } {
    return { ...this.data }
  }

  async saveUser(value: { firstName: string; lastName: string }) {
    this.data = value
    return value
  }
}

// Dummy Database to emulate server-side actions
const db = new DB()

export default function App() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return db.getData()
    },
  })

  const saveUserMutation = useMutation({
    mutationFn: async (value: { firstName: string; lastName: string }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      db.saveUser(value)
    },
  })

  const form = useForm({
    defaultValues: {
      firstName: data?.firstName ?? '',
      lastName: data?.lastName ?? '',
    },
    onSubmit: async ({ formApi, value }) => {
      // Do something with form data
      await saveUserMutation.mutateAsync(value)

      // Invalidating query to recheck fresh data
      await refetch()

      // Reset the form to start-over with a clean state
      formApi.reset()
    },
  })

  if (isLoading) return <p>Loading..</p>

  return (
    <div>
      <h1>Simple Form Example</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}>
        <div>
          {/* A type-safe field component*/}
          <form.Field
            name="firstName"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? 'A first name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000))
                return (
                  value.includes('error') && 'No "error" allowed in first name'
                )
              },
            }}
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>First Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
              )
            }}
          />
        </div>
        <div>
          <form.Field
            name="lastName"
            children={(field) => (
              <>
                <label htmlFor={field.name}>Last Name:</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <FieldInfo field={field} />
              </>
            )}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <>
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button type="reset" onClick={() => form.reset()}>
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  )
}

const rootElement = document.getElementById('root')!

const queryClient = new QueryClient()

createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

    <TanStackDevtools
      config={{
        hideUntilHover: true,
      }}
      plugins={[formDevtoolsPlugin()]}
    />
  </React.StrictMode>,
)
```

---

### Install TanStack Devtools and Form Plugin (npm)

Source: https://tanstack.com/form/latest/docs/framework/react/guides/devtools

Installs the necessary TanStack Devtools and the specific plugin for TanStack Form using npm. These are essential for enabling the devtools functionality.

```bash
npm i @tanstack/react-devtools
npm i @tanstack/react-form-devtools
```

---

### Initialize React App with TanStack Form Devtools

Source: https://tanstack.com/form/latest/docs/framework/react/examples/devtools

This snippet shows the basic setup for a React application using createRoot. It imports necessary components from '@tanstack/react-devtools' and '@tanstack/react-form-devtools', and integrates the form devtools plugin into TanStackDevtools. The devtools are rendered alongside the main App component.

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />

    <TanStackDevtools
      plugins={[formDevtoolsPlugin()]}
      eventBusConfig={{ debug: true }}
    />
  </StrictMode>,
);
```

---
