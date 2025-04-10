import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
