import { lazy } from "react";

export const LoginPage = lazy(
  () => import("@/presentation/features/auth/pages/LoginPage"),
);

export const ChatPage = lazy(
  () => import("@/presentation/features/chat/pages/ChatPage"),
);
