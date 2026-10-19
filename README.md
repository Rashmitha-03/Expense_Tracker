# Expense Tracker

A React frontend for tracking personal expenses. Users can create an account, sign in, review expense summaries and recent transactions, and add or update expense records.

## Features

- User registration and login
- Dashboard with expense summaries and recent transactions
- Add, view, update, and delete expenses
- Weekly and monthly expense data
- Bearer-token authentication for API requests

## Tech Stack

- React 19
- Vite 7
- React Router
- Material UI
- Axios
- Recharts

## Getting Started

### Prerequisites

- Node.js (compatible with Vite 7)
- npm
- The Expense Tracker backend running locally

### Install and run

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal, usually `http://localhost:5173`.

### Backend configuration

The API client currently uses `http://localhost:8080` as its backend base URL. If your backend runs elsewhere, update `baseURL` in `src/services/api.js`. The frontend calls the `/api/users` and `/api/expenses` endpoints.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Application Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/login` | Sign in |
| `/register` | Create an account |
| `/dashboard` | Expense dashboard |
| `/add-expense` | Add an expense |
| `/add-expense/:id` | Edit an expense |

## Project Structure

```text
src/
	components/  Reusable dashboard and navigation components
	layout/      Shared page layout
	pages/       Home, authentication, dashboard, and expense pages
	services/    API client and authentication/expense requests
```

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
