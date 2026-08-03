import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type loginT } from "../schemas/login.schema";
import { useLogin } from "@/application/auth/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import { AxiosError } from "axios";
import { toast } from "sonner";

const LoginPage = () => {
  const login = useLogin();
  const navigate = useNavigate();
  const { registerUser, registerCredentials } = useAuthStore();

  const { register, handleSubmit, reset } = useForm<loginT>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      dni: "",
      password: "",
    },
  });

  const onSubmit = (values: loginT) => {
    login.mutate(values, {
      onSuccess: (data) => {
        reset();
        registerUser(data.data.user);
        registerCredentials({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        });
        navigate("/");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.warning(error.response?.data.message);
        } else {
          toast.error("Error inesperador al inciar sesion");
        }
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" {...register("dni")} />
        <input type="password" {...register("password")} />
        <button type="submit" disabled={login.isPending}>
          {login.isPending ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
export default LoginPage;
