import { BrowserRouter } from "react-router";
import { useGetUserByTokenQuery } from "./redux/api/authApi";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
