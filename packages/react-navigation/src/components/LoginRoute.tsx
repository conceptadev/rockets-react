import { Navigate } from "react-router";
import { useAuth } from "@concepta/react-auth-provider";
import { AuthModule } from "@concepta/react-material-ui/";

const LoginRoute = () => {
  const { accessToken: authAccessToken } = useAuth();

  const accessToken = authAccessToken ?? localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/dealers" replace />;
  }

  return <AuthModule route="signIn" />;
};

export default LoginRoute;
