import AuthLayout from "@/presentation/components/layout/AuthLayout";
import { createBrowserRouter } from "react-router-dom";
import { ChatPage, LoginPage } from "./lazy-routes";
import MainLayout from "@/presentation/components/layout/MainLayout";
import { Suspense } from "react";
import AuthGuard from "@/presentation/components/guards/AuthGuard";
import GuestGuard from "@/presentation/components/guards/GuestGuard";

export const routes = createBrowserRouter([
  {
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<h1>Cargando...</h1>}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>Cargando...</h1>}>
            <ChatPage />
          </Suspense>
        ),
      },
    ],
  },
]);
