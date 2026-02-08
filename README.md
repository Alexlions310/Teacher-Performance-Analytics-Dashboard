# EduInsight – Teacher Performance Analytics Dashboard

A production-ready mini dashboard built with React, TypeScript, and a strict feature-based architecture.

## Tech stack

- **React 18** + **TypeScript**
- **Vite**
- **Zustand** (auth state only)
- **Axios** (custom reusable instance with interceptors)
- **@tanstack/react-query**
- **React Router**
- **shadcn/ui**-style components + **TailwindCSS**

## Architecture

Feature-based structure:

| Layer      | Role |
|-----------|------|
| `shared/`  | Reusable infrastructure: API client, query client, hooks, UI primitives, utils |
| `entities/` | Domain types and API layer (teachers) |
| `features/` | Business logic: auth, performance filter (controlled state + filter/sort logic) |
| `widgets/` | Composed UI: stat cards, performance table |
| `pages/`  | Route-level composition: Login, Dashboard |
| `app/`    | App shell: providers, layout, routing, mock API setup |

## Auth

- **Fake login**: mock API; any email/password signs in.
- **Zustand** stores token and user; persisted to `localStorage`.
- **Refresh**: simulated in axios interceptor via `onRefresh` (mock refresh token).
- **ProtectedRoute**: redirects unauthenticated users to `/login`.
- **Logout**: clears Zustand state and **react-query cache**.
- **Axios**: request interceptor attaches token; response interceptor on **401** runs refresh or triggers logout (via injectable `setAxiosAuthConfig` in `main.tsx`).

## Data layer

- **`shared/api/axios.ts`**: Axios instance; auth config injected from app.
- **`shared/api/queryClient.ts`**: React Query client with `staleTime`, `gcTime`, `refetchOnWindowFocus: false`.
- **`shared/hooks/useFetch.ts`**: Wraps react-query; generics, loading/error, query key + endpoint, optional config overrides.

## Dashboard

1. **Statistic cards**: total teachers, active teachers, average rating, completed trainings % (no extra memoization; data from API).
2. **Performance table**: search, filter by rating (min/max), filter by status, sort by column, status badges (shadcn-style).
3. **Performance filter**: controlled inputs, independent Zustand state, reusable filter/sort logic in `features/performance-filter`.

## React Query

- `staleTime` and `gcTime` set in `queryClient`.
- `refetchOnWindowFocus: false`.
- **Optimistic update**: `useUpdateTeacherMutation` (entity) uses `onMutate` / `onError` rollback / `onSettled` invalidate (mutation is available; UI can be wired when edit is needed).

## Run

```bash
npm install
npm run dev
```

Then open the app, sign in with any credentials, and use the dashboard.

## Build

```bash
npm run build
npm run preview
```
