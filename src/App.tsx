import { RouterProvider } from "react-router-dom";
import { routes } from "./router/routes";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./infrastructure/config/tanstack-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster richColors closeButton />
    </QueryClientProvider>
  );
};
export default App;
