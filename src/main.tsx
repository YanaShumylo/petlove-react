import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "modern-normalize";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from "./context/AuthProvider";
import './index.css';
import App from './App';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      <ReactQueryDevtools initialIsOpen={false} />
      </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
)