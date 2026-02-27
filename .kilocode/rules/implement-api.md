# API Implementation Rules

This rule defines the standardized architecture and best practices for implementing API calls across the project. It strictly enforces the separation of concerns by mandating that all data transformations, mutation logic, and REST orchestration be encapsulated within dedicated custom hooks (utilizing `axiosInstance` and `@tanstack/react-query`). By complying with these patterns, developers ensure the UI components remain clean, agnostic, type-safe, and focused entirely on view rendering.

## Guidelines

- **Separation of Concerns**: Never write API calls (like `fetch` or `axios.post`) directly inside a UI Component. Always extract API interaction logic into separate custom React hooks.
- **Hook Naming & Structure**: 
  - Create a new file for each significant API action inside the `src/hooks/` directory (e.g., `src/hooks/useCreateCourse.ts`, `src/hooks/useUploadImage.ts`).
  - Name the hook matching the action: `use[Action][Resource]` (e.g., `useLogin`, `useCreateCourse`) or `use[Resource]` for data fetching queries (e.g., `useCourses`).
  - Export relevant TypeScripts interfaces (like request payloads and error structures) from the same hook file to maintain strong type safety. Do not use `any`.
- **Library for Data Fetching & Mutations**:
  - Always use `@tanstack/react-query` (`useMutation` or `useQuery`) to manage async server state, caching, pending states, and error handling.
  - Return the exact result from `useMutation` back to the component so that the component can access `mutation.mutate()`, `mutation.isPending`, etc.
- **Query Invalidation (SPA Best Practice)**:
  - Following a successful mutation (create, update, delete), prefer using `queryClient.invalidateQueries({ queryKey: ['YOUR-KEY'] })` to refresh data rather than `window.location.reload()`. This ensures a seamless Single Page Application experience.
- **HTTP Client Setup**:
  - Always import and use the custom `axiosInstance` from `src/lib/axios.ts` to ensure headers (like Authorization tokens sent via Zustand store) are automatically attached.
  - Do NOT use the native `fetch` API.
- **Form Data & File Uploads**:
  - If the API requires uploading assets, encapsulate the conversion from simple `File` objects to `FormData` within the hook's `mutationFn` so the component doesn't have to construct `FormData`. Let Axios handle the `multipart/form-data` boundaries dynamically.
- **Delegation of UI Callbacks**:
  - Provide optional fallback arguments to the hooks (like `onSuccessCallback?: () => void`) so components can inject UI-specific behaviors post-mutation (e.g., closing a modal `handleCloseModal()`, navigating to another page, or resetting form states).
- **Error Handling & Notifications**:
  - Centralize popup messages using `react-hot-toast` inside the hook's `onSuccess` and `onError` blocks so the UI component focuses purely on rendering.
  - Handle errors inside `catch` block and throw standard JavaScript/TypeScript error messages capturing data from API responses: `throw new Error(error.response?.data?.message || "Fallback error message");`.
- **UI Components (Consumer side)**:
  - Inside UI components (e.g., `CreateCourseModal.tsx`), strictly initialize the hook (e.g., `const uploadImageMutation = useUploadImage();`) and use it in form submit handlers.
  - Keep the component code clean without mixing HTTP orchestration. Ensure that UI loading states depend entirely on hook properties like `isPending` (e.g., `disabled={mutation.isPending}`).
  - Continue to use form libraries (`@tanstack/react-form`) inside the UI component to manage form fields, but once `onSubmit` fires, pass the `value` directly to the `mutate` function.

