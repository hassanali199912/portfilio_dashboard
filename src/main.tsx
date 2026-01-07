import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router';

import App from './app';
import { routesSection } from './routes/sections';
import { ErrorBoundary } from './routes/components';

import { Provider } from "react-redux"
import { store } from "./stores/index"
import { ToastProvider } from './context/toast';

// ----------------------------------------------------------------------

const router = createBrowserRouter([
  {
    Component: () => (
      <ToastProvider
        defaultDuration={6000}
        maxToasts={10}
        defaultPosition={{ vertical: 'top', horizontal: 'right' }}
      >

        <Provider store={store}>
          <App>
            <Outlet />
          </App>
        </Provider>
      </ToastProvider>
    ),
    errorElement: <ErrorBoundary />,
    children: routesSection,
  },
]);

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>

    <RouterProvider router={router} />
  </StrictMode>
);
