import { BrowserRouter } from "react-router";
import { useGetUserByTokenQuery } from "./redux/api/authApi";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { data: user } = useGetUserByTokenQuery({}, { refetchOnMountOrArgChange: true });
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
